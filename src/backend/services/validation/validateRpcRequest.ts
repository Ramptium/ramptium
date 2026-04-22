import type { RpcRequest, ValidationResult } from '@/backend/contracts/validation'
import type { AuthContext } from '@/backend/contracts/auth'

const SUPPORTED_CHAINS = ['ethereum', 'polygon', 'solana']
const BLOCKED_METHODS = new Set(['admin_reset', 'debug_traceTransaction'])
const MAX_PAYLOAD_SIZE_BYTES = 128 * 1024

export function validateRpcRequest(
  chain: string,
  payload: unknown,
  authContext: AuthContext,
): ValidationResult {
  const normalizedChain = chain.toLowerCase()

  if (!SUPPORTED_CHAINS.includes(normalizedChain)) {
    return {
      isValid: false,
      errorCode: 'unsupported_chain',
      errorMessage: `Unsupported chain: ${chain}`,
    }
  }

  if (authContext.allowedChains.length > 0 && !authContext.allowedChains.includes(normalizedChain)) {
    return {
      isValid: false,
      errorCode: 'unsupported_chain',
      errorMessage: `API key is not allowed to access chain: ${chain}`,
    }
  }

  let request: RpcRequest
  try {
    request = payload as RpcRequest
  } catch {
    return {
      isValid: false,
      errorCode: 'invalid_json',
      errorMessage: 'Payload is not valid JSON',
    }
  }

  if (!request || request.jsonrpc !== '2.0' || typeof request.method !== 'string') {
    return {
      isValid: false,
      errorCode: 'invalid_rpc_format',
      errorMessage: 'Invalid JSON-RPC 2.0 payload',
    }
  }

  const payloadSize = new TextEncoder().encode(JSON.stringify(payload)).byteLength
  if (payloadSize > MAX_PAYLOAD_SIZE_BYTES) {
    return {
      isValid: false,
      errorCode: 'payload_too_large',
      errorMessage: 'Payload exceeds maximum allowed size',
    }
  }

  if (BLOCKED_METHODS.has(request.method)) {
    return {
      isValid: false,
      errorCode: 'method_blocked',
      errorMessage: `RPC method is blocked: ${request.method}`,
    }
  }

  return {
    isValid: true,
    normalizedMethod: request.method,
  }
}
