import { queryOptions } from "@tanstack/react-query";
import type {
  StatsJson,
  StatsJsonName,
  StatsValueMap,
} from "~/shared/types/json";
import type { SortedBy } from "~/shared/types/sortedBy";
import type { DailyRecord, Streak } from "~/shared/types/stats";

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

export const statsQueries = {
  records: queryOptions({
    queryKey: ["stats", "records"] as const,
    queryFn: () => fetchStatsJson("records"),
    initialData: {
      payload: [] as unknown as SortedBy<DailyRecord, "date", "asc">,
      generatedAt: 0,
    },
  }),
  streaks: queryOptions({
    queryKey: ["stats", "streaks"] as const,
    queryFn: () => fetchStatsJson("streaks"),
    initialData: {
      payload: [] as unknown as SortedBy<Streak, "startDate", "asc">,
      generatedAt: 0,
    },
  }),
};
