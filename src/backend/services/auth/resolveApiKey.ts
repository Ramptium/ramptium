import { extractKeyPrefix, safeCompareHash } from '@/backend/lib/crypto/apiKeys'
import { findApiKeyByPrefix, updateLastUsed } from '@/backend/repositories/apiKeysRepo'
import type { AuthResolutionResult } from '@/backend/contracts/auth'

export async function resolveApiKey(rawKey: string | null | undefined): Promise<AuthResolutionResult> {
  if (!rawKey) {
    return { ok: false, reason: 'missing_api_key' }
  }

  let prefix: string
  try {
    prefix = extractKeyPrefix(rawKey)
  } catch {
    return { ok: false, reason: 'malformed_api_key' }
  }

  const record = await findApiKeyByPrefix(prefix)
  if (!record) {
    return { ok: false, reason: 'invalid_api_key' }
  }

  const valid = await safeCompareHash(rawKey, record.key_hash)
  if (!valid) {
    return { ok: false, reason: 'invalid_api_key' }
  }

  if (record.status !== 'active') {
    return { ok: false, reason: record.status === 'revoked' ? 'revoked_api_key' : 'expired_api_key' }
  }

  await updateLastUsed(record.id)

  return {
    ok: true,
    context: {
      apiKeyId: record.id,
      projectId: record.project_id,
      organizationId: '',
      environment: record.environment,
      scopes: record.scopes ?? [],
      allowedChains: record.allowed_chains ?? [],
      rateLimitProfileId: record.rate_limit_profile_id ?? null,
      status: record.status,
    },
  }
}
