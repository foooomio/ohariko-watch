import { queryOptions } from "@tanstack/react-query";
import { fetchStatsJson } from "./fetchStatsJson";
import { toStreaksByDaysDesc } from "~/shared/lib/streak";

export const postsOptions = queryOptions({
  queryKey: ["stats", "posts"],
  queryFn: () => fetchStatsJson("posts"),
});

export const streaksOptions = queryOptions({
  queryKey: ["stats", "streaks"],
  queryFn: () => fetchStatsJson("streaks"),
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
