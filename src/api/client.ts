const BASE_URL = import.meta.env.VITE_ASSETS_BASE_URL;

export async function fetchJson<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(BASE_URL + path, init);

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return await res.json();
}
