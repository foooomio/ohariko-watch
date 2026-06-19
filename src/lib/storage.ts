const BASE_URL = import.meta.env.VITE_ASSETS_BASE_URL;

export async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(BASE_URL + path, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return await res.json();
}
