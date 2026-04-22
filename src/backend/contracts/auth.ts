export type ApiKeyStatus = 'active' | 'revoked' | 'expired'

export type EnvironmentMode = 'test' | 'live'

export type AuthContext = {
  apiKeyId: string
  projectId: string
  organizationId: string
  environment: EnvironmentMode
  scopes: string[]
  allowedChains: string[]
  rateLimitProfileId: string | null
  status: ApiKeyStatus
}

export type AuthFailureReason =
  | 'missing_api_key'
  | 'malformed_api_key'
  | 'invalid_api_key'
  | 'revoked_api_key'
  | 'expired_api_key'
  | 'project_suspended'
  | 'organization_suspended'
  | 'environment_mismatch'

export type AuthSuccess = {
  ok: true
  context: AuthContext
}

export type AuthFailure = {
  ok: false
  reason: AuthFailureReason
}

export type AuthResolutionResult = AuthSuccess | AuthFailure
