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
    .select('stripe_customer_id')
    .eq('owner_user_id', user.user.id)
    .maybeSingle()

  if (!org?.stripe_customer_id) {
    return res.status(400).json({ error: 'no stripe customer' })
  }

  const portal = await stripeRequest<{ url: string }>('/billing_portal/sessions', new URLSearchParams({
    customer: org.stripe_customer_id,
    return_url: `${process.env.APP_URL}/dashboard/billing`,
  }))

  res.json({ url: portal.url })
}
