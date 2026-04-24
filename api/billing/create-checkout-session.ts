import type { VercelRequest, VercelResponse } from '@vercel/node'
import { supabaseAdmin } from '../../src/backend/lib/db/supabaseAdmin'
import { stripeRequest } from '../../src/backend/lib/billing/stripeRest'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ error: 'unauthorized' })

  const { data: user } = await supabaseAdmin.auth.getUser(token)
  if (!user?.user) return res.status(401).json({ error: 'invalid session' })

  const { data: org } = await supabaseAdmin
    .from('organizations')
    .select('id,stripe_customer_id')
    .eq('owner_user_id', user.user.id)
    .maybeSingle()

  if (!org) return res.status(400).json({ error: 'no organization' })

  let customerId = org.stripe_customer_id

  if (!customerId) {
    const customer = await stripeRequest<{ id: string }>('/customers', new URLSearchParams({
      email: user.user.email || '',
    }))

    customerId = customer.id

    await supabaseAdmin
      .from('organizations')
      .update({ stripe_customer_id: customerId })
      .eq('id', org.id)
  }

  const session = await stripeRequest<{ url: string }>('/checkout/sessions', new URLSearchParams({
    mode: 'subscription',
    customer: customerId,
    success_url: `${process.env.APP_URL}/dashboard/billing`,
    cancel_url: `${process.env.APP_URL}/dashboard/billing`,
    'line_items[0][price]': process.env.STRIPE_GROWTH_PRICE_ID || '',
    'line_items[0][quantity]': '1',
  }))

  res.json({ url: session.url })
}
