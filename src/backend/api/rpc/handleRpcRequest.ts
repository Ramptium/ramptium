import { generateRequestId } from '@/backend/lib/ids/requestId'
import { extractClientIp } from '@/backend/lib/network/ip'
import { resolveApiKey } from '@/backend/services/auth/resolveApiKey'
import { validateRpcRequest } from '@/backend/services/validation/validateRpcRequest'
import { evaluateRateLimit } from '@/backend/services/rateLimit/evaluateRateLimit'
import { buildRoutingContext } from '@/backend/services/routing/buildRoutingContext'
import { routeRpcRequest } from '@/backend/services/routing/routeRpcRequest'
import { writeRequestEvent } from '@/backend/services/requestEvents/writeRequestEvent'
import { updateUsageAggregates } from '@/backend/services/usage/updateUsageAggregates'
import { insertRoutingAttempts } from '@/backend/repositories/routingAttemptsRepo'

export async function handleRpcRequest(req: Request, chain: string) {
  const requestId = generateRequestId()
  const ip = extractClientIp(req.headers)

  const authHeader = req.headers.get('authorization')
  const rawKey = authHeader?.replace('Bearer ', '')

  const auth = await resolveApiKey(rawKey)
  if (!auth.ok) {
    return new Response(JSON.stringify({ error: auth.reason, requestId }), { status: 401 })
  }

  const body = await req.json()

  const validation = validateRpcRequest(chain, body, auth.context)
  if (!validation.isValid) {
    return new Response(JSON.stringify({ error: validation.errorCode, requestId }), { status: 400 })
  }

  const rate = await evaluateRateLimit({
    projectId: auth.context.projectId,
    apiKeyId: auth.context.apiKeyId,
    clientIp: ip,
    chain,
    method: validation.normalizedMethod!,
    profileId: auth.context.rateLimitProfileId,
  })

  if (!rate.allowed) {
    return new Response(JSON.stringify({ error: rate.reason, requestId }), { status: 429 })
  }

  const routingContext = buildRoutingContext({
    requestId,
    projectId: auth.context.projectId,
    apiKeyId: auth.context.apiKeyId,
    chain,
    method: validation.normalizedMethod!,
  })

  const routingResult = await routeRpcRequest(routingContext, body)

  const event = await writeRequestEvent({
    requestId,
    projectId: auth.context.projectId,
    apiKeyId: auth.context.apiKeyId,
    chain,
    network: routingContext.network,
    method: routingContext.method,
    responseStatus: routingResult.finalStatusCode,
    upstreamStatus: routingResult.upstreamStatusCode,
    providerName: routingResult.providerName,
    endpointId: routingResult.endpointId,
    latencyMs: routingResult.latencyMs,
    retryCount: routingResult.retryCount,
    errorClass: routingResult.errorClass,
    billableUnits: rate.costUnits,
    billable: routingResult.finalStatusCode === 200,
  })

  await insertRoutingAttempts(event.requestEventId, routingResult.attempts)

  await updateUsageAggregates({
    projectId: auth.context.projectId,
    apiKeyId: auth.context.apiKeyId,
    chain,
    requestCount: 1,
    successCount: routingResult.finalStatusCode === 200 ? 1 : 0,
    errorCount: routingResult.finalStatusCode !== 200 ? 1 : 0,
    billableUnits: event.billableUnits,
  })

  return new Response(JSON.stringify(routingResult.responseBody ?? { error: 'upstream failure', requestId }), {
    status: routingResult.finalStatusCode,
  })
}
