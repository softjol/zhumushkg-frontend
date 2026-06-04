const BASE_URL = process.env.NEXT_PUBLIC_API_URL

async function extractErrorMessage(res: Response): Promise<string> {
  const text = await res.text()
  try {
    const json = JSON.parse(text)
    return json.message ?? text
  } catch {
    return text
  }
}

export async function registerUser(firstName: string, phoneNumber: string, role: 'JOB_SEEKER' | 'EMPLOYER') {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, phoneNumber, role }),
  })
  if (!res.ok) throw new Error(await extractErrorMessage(res))
  return res.json()
}

export async function confirmPhone(phoneNumber: string, code: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/auth/confirm-phone`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber, code }),
  })
  if (!res.ok) throw new Error(await extractErrorMessage(res))
  const data = await res.json()
  return data.access_token
}

export async function loginUser(phoneNumber: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber }),
  })
  if (!res.ok) throw new Error(await extractErrorMessage(res))
  return res.json()
}
