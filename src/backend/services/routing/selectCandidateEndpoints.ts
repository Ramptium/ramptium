import type { RpcEndpointRecord } from '@/backend/repositories/rpcEndpointsRepo'
import type { EndpointHealthRecord } from '@/backend/repositories/endpointHealthRepo'
import { scoreEndpoints } from './scoreEndpoints'

export function selectCandidateEndpoints(
  endpoints: RpcEndpointRecord[],
  health: EndpointHealthRecord[],
) {
  const healthyEndpoints = endpoints.filter((endpoint) => {
    const h = health.find((x) => x.endpoint_id === endpoint.id)
    return !h || h.circuit_state !== 'open'
  })

  return scoreEndpoints(healthyEndpoints, health).map((e) => e.endpoint)
}
