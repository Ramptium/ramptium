import type { RpcEndpointRecord } from '@/backend/repositories/rpcEndpointsRepo'
import type { EndpointHealthRecord } from '@/backend/repositories/endpointHealthRepo'
import { scoreEndpoints } from './scoreEndpoints'
import { getEndpointRuntimeState } from './routingState'

export function selectCandidateEndpoints(
  endpoints: RpcEndpointRecord[],
  health: EndpointHealthRecord[],
) {
  const filtered = endpoints.filter((endpoint) => {
    const dbHealth = health.find((x) => x.endpoint_id === endpoint.id)
    const runtime = getEndpointRuntimeState(endpoint.id)

    if (runtime.circuitState === 'open') return false
    if (dbHealth?.circuit_state === 'open') return false
    if (dbHealth?.health_status === 'unhealthy') return false

    return true
  })

  return scoreEndpoints(filtered, health).map((e) => e.endpoint)
}
