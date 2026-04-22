import type { RpcEndpointRecord } from '@/backend/repositories/rpcEndpointsRepo'
import type { EndpointHealthRecord } from '@/backend/repositories/endpointHealthRepo'

export function scoreEndpoints(
  endpoints: RpcEndpointRecord[],
  health: EndpointHealthRecord[],
) {
  return endpoints
    .map((endpoint) => {
      const healthRecord = health.find((h) => h.endpoint_id === endpoint.id)

      const successRate = healthRecord?.success_rate_1m ?? 1
      const latency = healthRecord?.rolling_latency_ms ?? 100
      const latencyScore = 1 / latency
      const healthWeight = healthRecord?.health_status === 'healthy' ? 1 : 0.5

      const score =
        successRate * 0.4 +
        latencyScore * 0.3 +
        healthWeight * 0.2 +
        (endpoint.priority_weight ?? 100) * 0.1

      return { endpoint, score }
    })
    .sort((a, b) => b.score - a.score)
}
