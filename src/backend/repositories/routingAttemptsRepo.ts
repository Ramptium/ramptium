import { supabaseAdmin } from '@/backend/lib/db/supabaseAdmin'
import type { RoutingAttempt } from '@/backend/contracts/routing'

export async function insertRoutingAttempts(requestEventId: string, attempts: RoutingAttempt[]) {
  if (attempts.length === 0) return

  const rows = attempts.map((attempt) => ({
    request_event_id: requestEventId,
    attempt_number: attempt.attemptNumber,
    endpoint_id: attempt.endpointId,
    provider_name: attempt.providerName,
    latency_ms: attempt.latencyMs ?? null,
    outcome: attempt.outcome,
    error_class: attempt.errorClass ?? null,
  }))

  const { error } = await supabaseAdmin.from('routing_attempts').insert(rows)
  if (error) {
    throw new Error('Failed to write routing attempts')
  }
}
