import { queryOptions } from "@tanstack/react-query";
import { fetchStatsJson } from "./fetchStatsJson";
import { toStreaksByDaysDesc } from "~/shared/lib/streak";

export const staleTime = 60 * 60 * 1000;

export const postsOptions = queryOptions({
  queryKey: ["stats", "posts"],
  queryFn: () => fetchStatsJson("posts"),
  staleTime,
});

export const streaksOptions = queryOptions({
  queryKey: ["stats", "streaks"],
  queryFn: () => fetchStatsJson("streaks"),
  staleTime,
});

export const sortedStreaksOptions = queryOptions({
  queryKey: streaksOptions.queryKey.concat("sortedByDaysDesc"),
  queryFn: async ({ client }) => {
    const data = await client.ensureQueryData(streaksOptions);
    return {
      ...data,
      payload: toStreaksByDaysDesc(data.payload),
    };
  },
});
