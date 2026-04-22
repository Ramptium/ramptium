import { supabaseAdmin } from '@/backend/lib/db/supabaseAdmin'

export type EndpointHealthRecord = {
  endpoint_id: string
  health_status: 'healthy' | 'degraded' | 'unhealthy'
  circuit_state: 'closed' | 'open' | 'half_open'
  rolling_latency_ms: number | null
  success_rate_1m: number | null
}

export async function getHealthForEndpoints(endpointIds: string[]) {
  if (endpointIds.length === 0) return [] as EndpointHealthRecord[]

  const { data, error } = await supabaseAdmin
    .from('endpoint_health')
    .select('*')
    .in('endpoint_id', endpointIds)

  if (error || !data) {
    return [] as EndpointHealthRecord[]
  }

  return data as EndpointHealthRecord[]
}
