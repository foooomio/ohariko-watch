import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "@/api/client";
import type { StatsJson } from "~/shared/types/json";
import type { Summary } from "~/shared/types/stats";

export function useSummary() {
  return useQuery({
    queryKey: ["stats/summary"],
    queryFn: () => fetchJson<StatsJson<Summary>>("/stats/summary.json"),
  });
}
