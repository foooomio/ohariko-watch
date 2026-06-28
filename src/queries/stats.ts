import { queryOptions } from "@tanstack/react-query";
import type {
  StatsJson,
  StatsJsonName,
  StatsValueMap,
} from "~/shared/types/json";
import type { SortedBy } from "~/shared/types/sortedBy";
import type { Post, Streak } from "~/shared/types/stats";

function reviver(name: StatsJsonName): (key: string, value: any) => any {
  switch (name) {
    case "posts":
      return (key, value) => {
        if (value === null) {
          return value;
        }
        switch (key) {
          case "date":
            return Temporal.PlainDate.from(value);
          case "datetime":
          case "generatedAt":
            return Temporal.ZonedDateTime.from(value);
          case "elapsed":
            return Temporal.Duration.from(value);
          default:
            return value;
        }
      };
    case "streaks":
      return (key, value) => {
        switch (key) {
          case "startDate":
          case "endDate":
            return Temporal.PlainDate.from(value);
          case "generatedAt":
            return Temporal.ZonedDateTime.from(value);
          default:
            return value;
        }
      };
  }
}

async function fetchStatsJson<T extends StatsJsonName>(
  name: T,
): Promise<StatsJson<StatsValueMap[T]>> {
  const url = `${import.meta.env.VITE_ASSETS_BASE_URL}/stats/${name}.json`;

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

  return JSON.parse(text, reviver(name));
}

export function postsOptions() {
  return queryOptions({
    queryKey: ["stats", "posts"] as const,
    queryFn: () => fetchStatsJson("posts"),
    initialData: {
      payload: [] as unknown as SortedBy<Post, "date", "asc">,
      generatedAt: "",
    },
    initialDataUpdatedAt: 0,
    staleTime: Temporal.Duration.from({ hours: 1 }).total("millisecond"),
  });
}

export function streaksOptions() {
  return queryOptions({
    queryKey: ["stats", "streaks"] as const,
    queryFn: () => fetchStatsJson("streaks"),
    initialData: {
      payload: [] as unknown as SortedBy<Streak, "startDate", "asc">,
      generatedAt: "",
    },
    initialDataUpdatedAt: 0,
    staleTime: Temporal.Duration.from({ hours: 1 }).total("millisecond"),
  });
}
