export const BASE_URL = 'https://zhumushkg-backend-git-dev-amirbeks-projects-b11ee92a.vercel.app';

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = (() => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem('user-storage');
      return raw ? (JSON.parse(raw)?.state?.token ?? null) : null;
    } catch {
      return null;
    }
  })();

  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string; detail?: string })?.message ??
        (err as { detail?: string })?.detail ??
        `HTTP ${res.status}`,
    );
  }

  if (res.status === 204) return undefined as T;
  return res.json();
  
}