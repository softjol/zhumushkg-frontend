const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function registerUser(firstName: string, phoneNumber: string, role: 'JOB_SEEKER' | 'EMPLOYER') {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, phoneNumber, role }),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function confirmPhone(phoneNumber: string, code: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/auth/confirm-phone`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber, code }),
  })
  if (!res.ok) throw new Error(await res.text())
  const data = await res.json()
console.log('confirmPhone response:', data)
  return data.access_token // <-- именно access_token, не accessToken
}

export async function loginUser(phoneNumber: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber }),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json() // { message, smsCode }
}
