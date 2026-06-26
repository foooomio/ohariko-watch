import { queryOptions } from "@tanstack/react-query";
import type {
  StatsJson,
  StatsJsonName,
  StatsValueMap,
} from "~/shared/types/json";

const BASE_URL = import.meta.env.VITE_ASSETS_BASE_URL;

async function fetchStatsJson<T extends StatsJsonName>(
  name: T,
): Promise<StatsJson<StatsValueMap[T]>> {
  const url = BASE_URL + `/stats/${name}.json`;

  const res = await fetch(url, {
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

function initialData() {
  return {
    payload: [],
    generatedAt: 0,
  };
}

export const statsJson = {
  records: queryOptions({
    queryKey: ["stats", "records"] as const,
    queryFn: () => fetchStatsJson("records"),
    initialData: initialData(),
  }),
  streaks: queryOptions({
    queryKey: ["stats", "streaks"] as const,
    queryFn: () => fetchStatsJson("streaks"),
    initialData: initialData(),
  }),
};
