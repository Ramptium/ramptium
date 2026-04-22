import { supabaseAdmin } from '@/backend/lib/db/supabaseAdmin'

export async function createBillingLedgerEntry(params: {
  projectId: string
  billableUnits: number
}) {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  const { error } = await supabaseAdmin.from('billing_usage_ledger').insert({
    project_id: params.projectId,
    billing_period_start: start.toISOString().slice(0, 10),
    billing_period_end: end.toISOString().slice(0, 10),
    usage_type: 'rpc_requests',
    quantity: params.billableUnits,
    source_reference: 'request_event',
  })

  if (error) {
    throw new Error('Failed to write billing ledger entry')
  }
}
