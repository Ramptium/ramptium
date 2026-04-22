import { supabaseAdmin } from '@/backend/lib/db/supabaseAdmin'

export async function updateCircuitBreaker(endpointId: string, failed: boolean) {
  if (!failed) return

  await supabaseAdmin
    .from('endpoint_health')
    .update({
      circuit_state: 'open',
      updated_at: new Date().toISOString(),
    })
    .eq('endpoint_id', endpointId)
}
