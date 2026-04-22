type CircuitState = 'closed' | 'open' | 'half_open'

type EndpointRuntimeState = {
  failureCount: number
  successCount: number
  avgLatencyMs: number
  circuitState: CircuitState
  lastFailureAt?: number
  lastSuccessAt?: number
  openedAt?: number
}

const state = new Map<string, EndpointRuntimeState>()

const FAILURE_THRESHOLD = 3
const RECOVERY_WINDOW_MS = 30_000

export function getEndpointRuntimeState(endpointId: string): EndpointRuntimeState {
  const existing = state.get(endpointId)
  if (existing) {
    if (existing.circuitState === 'open' && existing.openedAt && Date.now() - existing.openedAt > RECOVERY_WINDOW_MS) {
      existing.circuitState = 'half_open'
      state.set(endpointId, existing)
    }
    return existing
  }

  const initial: EndpointRuntimeState = {
    failureCount: 0,
    successCount: 0,
    avgLatencyMs: 0,
    circuitState: 'closed',
  }
  state.set(endpointId, initial)
  return initial
}

export function recordEndpointSuccess(endpointId: string, latencyMs: number) {
  const current = getEndpointRuntimeState(endpointId)
  const nextSuccessCount = current.successCount + 1
  const nextAvgLatency = current.avgLatencyMs === 0
    ? latencyMs
    : Math.round((current.avgLatencyMs * current.successCount + latencyMs) / nextSuccessCount)

  state.set(endpointId, {
    ...current,
    successCount: nextSuccessCount,
    failureCount: 0,
    avgLatencyMs: nextAvgLatency,
    circuitState: 'closed',
    lastSuccessAt: Date.now(),
  })
}

export function recordEndpointFailure(endpointId: string) {
  const current = getEndpointRuntimeState(endpointId)
  const nextFailureCount = current.failureCount + 1
  const shouldOpen = nextFailureCount >= FAILURE_THRESHOLD

  state.set(endpointId, {
    ...current,
    failureCount: nextFailureCount,
    circuitState: shouldOpen ? 'open' : current.circuitState,
    lastFailureAt: Date.now(),
    openedAt: shouldOpen ? Date.now() : current.openedAt,
  })
}
