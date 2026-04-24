const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  throw new Error('Missing STRIPE_SECRET_KEY')
}

export async function stripeRequest<T>(path: string, body: URLSearchParams): Promise<T> {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${stripeSecretKey}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(json?.error?.message ?? 'Stripe request failed')
  }

  return json as T
}

export async function stripeGet<T>(path: string): Promise<T> {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    headers: { authorization: `Bearer ${stripeSecretKey}` },
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(json?.error?.message ?? 'Stripe request failed')
  }

  return json as T
}
