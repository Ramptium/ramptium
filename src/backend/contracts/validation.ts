export type ValidationErrorCode =
  | 'invalid_json'
  | 'invalid_rpc_format'
  | 'unsupported_chain'
  | 'unsupported_method'
  | 'payload_too_large'
  | 'method_blocked'

export type ValidationResult = {
  isValid: boolean
  normalizedMethod?: string
  errorCode?: ValidationErrorCode
  errorMessage?: string
}

export type RpcRequest = {
  jsonrpc: string
  method: string
  params?: unknown
  id?: string | number | null
}
