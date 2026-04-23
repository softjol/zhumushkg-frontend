const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function registerUser(firstName: string, phoneNumber: string) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, phoneNumber }),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json() // { id, firstName, phoneNumber, smsCode, phoneConfirmed, role }
}

export async function confirmPhone(phoneNumber: string, code: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/auth/confirm-phone`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber, code }),
  })
  if (!res.ok) throw new Error(await res.text())
  const data = await res.json()
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
export async function getProfile(id: number, token: string) {
  const res = await fetch(`${BASE_URL}/auth/profile/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
