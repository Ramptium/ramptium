export type RoutingContext = {
  requestId: string
  projectId: string
  apiKeyId: string
  chain: string
  network: string
  method: string
  timeoutMs: number
  maxAttempts: number
  preferredProviders: string[]
  blockedProviders: string[]
}

export type RoutingAttempt = {
  attemptNumber: number
  endpointId: string
  providerName: string
  latencyMs?: number
  outcome: 'success' | 'timeout' | 'upstream_429' | 'upstream_5xx' | 'network_error' | 'invalid_response'
  errorClass?: string
}

export type RoutingResult = {
  finalStatusCode: number
  upstreamStatusCode?: number
  providerName?: string
  endpointId?: string
  latencyMs: number
  retryCount: number
  responseBody?: unknown
  errorClass?: string
  attempts: RoutingAttempt[]
}
