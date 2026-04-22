import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleRpcRequest } from '@/backend/api/rpc/handleRpcRequest'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { chain } = req.query

  if (!chain || typeof chain !== 'string') {
    return res.status(400).json({ error: 'Missing chain parameter' })
  }

  try {
    const response = await handleRpcRequest(req as unknown as Request, chain)

    const text = await response.text()

    res.status(response.status).send(text)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}
