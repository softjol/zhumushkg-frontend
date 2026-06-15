export const BASE_URL = '/api-proxy';

const STORAGE_KEY = 'user-storage';

function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw)?.state?.token ?? null) : null;
  } catch {
    return null;
  }
}

function updateStoredToken(token: string) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed?.state) {
      parsed.state.token = token;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
  } catch {}
}

// Один промис на все параллельные запросы чтобы не рефрешить дважды
let refreshPromise: Promise<string> | null = null;

async function callRefresh(): Promise<string> {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Refresh failed');
  const data = await res.json();
  return data.access_token;
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getStoredToken();
  const isFormData = options.body instanceof FormData;

  const buildHeaders = (authToken: string | null) => ({
    ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...(options.headers ?? {}),
  });

  let res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: buildHeaders(token),
  });

  if (res.status === 401) {
    try {
      if (!refreshPromise) {
        refreshPromise = callRefresh().finally(() => { refreshPromise = null; });
      }
      const newToken = await refreshPromise;
      updateStoredToken(newToken);

      res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        credentials: 'include',
        headers: buildHeaders(newToken),
      });
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      if (typeof window !== 'undefined') window.location.href = '/login';
      throw new Error('Session expired');
    }
  }

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
