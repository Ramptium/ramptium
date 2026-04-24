import type { VercelRequest, VercelResponse } from '@vercel/node'
import { supabaseAdmin } from '../../src/backend/lib/db/supabaseAdmin'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const event = req.body

  if (!event?.type) return res.status(400).end()

  try {
    if (event.type === 'customer.subscription.created' || event.type === 'customer.subscription.updated') {
      const sub = event.data.object

      await supabaseAdmin
        .from('subscriptions_v2')
        .upsert({
          organization_id: sub.metadata.organization_id,
          stripe_subscription_id: sub.id,
          plan: sub.items.data[0].price.nickname || 'growth',
          status: sub.status,
          monthly_request_limit: sub.metadata.monthly_request_limit || 1000000,
        })
    }

    if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object

      await supabaseAdmin
        .from('subscriptions_v2')
        .update({ status: 'canceled' })
        .eq('stripe_subscription_id', sub.id)
    }

    res.json({ received: true })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}
