import type { StatsJson, StatsJsonName, StatsValueMap } from "~/shared/types/json";

const { VITE_ASSETS_BASE_URL } = import.meta.env;

export async function fetchStatsJson<T extends StatsJsonName>(
  name: T,
  reviver: (key: string, value: any) => any,
): Promise<StatsJson<StatsValueMap[T]>> {
  const url = `${VITE_ASSETS_BASE_URL}/stats/${name}.json`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const text = await res.text();

  return JSON.parse(text, reviver);
}
