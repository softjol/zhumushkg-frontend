const BASE_URL = '/api-proxy'

export async function getUserById(id: number, token?: string | null) {
  const res = await fetch(`${BASE_URL}/user/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function getProfile(token?: string | null) {
  const res = await fetch(`${BASE_URL}/auth/profile`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function switchRoleApi(role: 'JOB_SEEKER' | 'EMPLOYER', token: string) {
  const res = await fetch(`${BASE_URL}/auth/switch-role`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role }),
  })
  if (!res.ok) throw new Error(await res.text())
  const data = await res.json()
  return data.access_token
}
