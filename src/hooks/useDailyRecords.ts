import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "@/lib/storage";
import type { StatsJson } from "~/shared/types/json";
import type { DailyRecord } from "~/shared/types/stats";

export function useDailyRecords() {
  return useQuery({
    queryKey: ["stats/dailyRecords"],
    queryFn: () => fetchJson<StatsJson<DailyRecord[]>>("/stats/records.json"),
  });
}
