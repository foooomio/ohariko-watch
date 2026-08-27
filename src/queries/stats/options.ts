import { queryOptions } from "@tanstack/react-query";

import { fetchStatsJson } from "./fetchStatsJson";

export const postsOptions = queryOptions({
  queryKey: ["stats", "posts"],
  queryFn: () => fetchStatsJson("posts"),
});

export const streaksOptions = queryOptions({
  queryKey: ["stats", "streaks"],
  queryFn: () => fetchStatsJson("streaks"),
});
