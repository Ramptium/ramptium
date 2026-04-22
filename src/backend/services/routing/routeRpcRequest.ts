import { listActiveEndpointsByChainNetwork } from '@/backend/repositories/rpcEndpointsRepo'
import { getHealthForEndpoints } from '@/backend/repositories/endpointHealthRepo'
import { selectCandidateEndpoints } from './selectCandidateEndpoints'
import type { RoutingContext, RoutingResult } from '@/backend/contracts/routing'

export async function routeRpcRequest(ctx: RoutingContext): Promise<RoutingResult> {
  const endpoints = await listActiveEndpointsByChainNetwork(ctx.chain, ctx.network)

  const endpointIds = endpoints.map((e) => e.id)
  const health = await getHealthForEndpoints(endpointIds)

  const candidates = selectCandidateEndpoints(endpoints, health)

  if (candidates.length === 0) {
    return {
      finalStatusCode: 503,
      latencyMs: 0,
      retryCount: 0,
      attempts: [],
      errorClass: 'no_available_endpoints',
    }
  }

  const attempts = []

  for (let i = 0; i < Math.min(ctx.maxAttempts, candidates.length); i++) {
    const endpoint = candidates[i]

    const start = Date.now()

    try {
      const res = await fetch(endpoint.endpoint_url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', method: ctx.method, params: [], id: 1 }),
      })

      const latency = Date.now() - start

      attempts.push({
        attemptNumber: i + 1,
        endpointId: endpoint.id,
        providerName: endpoint.provider_name,
        latencyMs: latency,
        outcome: res.ok ? 'success' : 'upstream_5xx',
      })

      if (res.ok) {
        const body = await res.json()

        return {
          finalStatusCode: 200,
          upstreamStatusCode: res.status,
          providerName: endpoint.provider_name,
          endpointId: endpoint.id,
          latencyMs: latency,
          retryCount: i,
          responseBody: body,
          attempts,
        }
      }
    } catch (e) {
      attempts.push({
        attemptNumber: i + 1,
        endpointId: endpoint.id,
        providerName: endpoint.provider_name,
        outcome: 'network_error',
      })
    }
  }

  return {
    finalStatusCode: 502,
    latencyMs: 0,
    retryCount: attempts.length,
    attempts,
    errorClass: 'all_endpoints_failed',
  }
}
