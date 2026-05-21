import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "@/api/client";
import type { StatsJson } from "~/shared/types/json";
import type { Streak } from "~/shared/types/stats";

export function useDailyRecords() {
  return useQuery({
    queryKey: ["stats/streaks"],
    queryFn: () => fetchJson<StatsJson<Streak[]>>("stats/streaks.json"),
  });
}
