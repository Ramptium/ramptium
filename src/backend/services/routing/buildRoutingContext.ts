import type { RoutingContext } from '@/backend/contracts/routing'

export function buildRoutingContext(params: {
  requestId: string
  projectId: string
  apiKeyId: string
  chain: string
  method: string
}): RoutingContext {
  return {
    requestId: params.requestId,
    projectId: params.projectId,
    apiKeyId: params.apiKeyId,
    chain: params.chain,
    network: 'mainnet',
    method: params.method,
    timeoutMs: 8000,
    maxAttempts: 3,
    preferredProviders: [],
    blockedProviders: [],
  }
}
