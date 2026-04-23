import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleRpcRequest } from '../../src/backend/api/rpc/handleRpcRequest'

function toWebRequest(req: VercelRequest): Request {
  const protocol = (req.headers['x-forwarded-proto'] as string | undefined) ?? 'https'
  const host = req.headers.host ?? 'localhost'
  const url = `${protocol}://${host}${req.url ?? '/'}`

  const headers = new Headers()

  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v)
    } else if (typeof value === 'string') {
      headers.set(key, value)
    }
  }

  const method = req.method ?? 'GET'
  const body = method === 'GET' || method === 'HEAD'
    ? undefined
    : JSON.stringify(req.body ?? {})

  return new Request(url, {
    method,
    headers,
    body,
  })
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { chain } = req.query

  if (!chain || typeof chain !== 'string') {
    return res.status(400).json({ error: 'Missing chain parameter' })
  }

  try {
    const webRequest = toWebRequest(req)
    const response = await handleRpcRequest(webRequest, chain)
    const text = await response.text()

    res.status(response.status).send(text)
  } catch (error) {
    console.error('RPC handler failed:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
