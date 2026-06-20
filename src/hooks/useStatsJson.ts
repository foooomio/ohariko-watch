import { useQuery } from "@tanstack/react-query";
import type {
  StatsJson,
  StatsJsonName,
  StatsValueMap,
} from "~/shared/types/json";

const BASE_URL = import.meta.env.VITE_ASSETS_BASE_URL;

export function useStatsJson<T extends StatsJsonName>(name: T) {
  return useQuery({
    queryKey: [`/stats/${name}.json`],
    queryFn: async ({ queryKey }) => {
      const url = BASE_URL + queryKey[0];

      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      });

      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }

      const json: StatsJson<StatsValueMap[T]> = await res.json();

      return json;
    },
  });
}
