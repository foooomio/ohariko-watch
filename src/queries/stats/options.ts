import { queryOptions } from "@tanstack/react-query";
import { fetchStatsJson } from "./fetchStatsJson";

export function postsOptions() {
  return queryOptions({
    queryKey: ["stats", "posts"] as const,
    queryFn: () => fetchStatsJson("posts"),
    staleTime: Temporal.Duration.from({ hours: 1 }).total("millisecond"),
  });
}

export function streaksOptions() {
  return queryOptions({
    queryKey: ["stats", "streaks"] as const,
    queryFn: () => fetchStatsJson("streaks"),
    staleTime: Temporal.Duration.from({ hours: 1 }).total("millisecond"),
  });
}
