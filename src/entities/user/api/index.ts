const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function getProfile(id: number) {
  const res = await fetch(`${BASE_URL}/auth/profile/${id}`)
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
