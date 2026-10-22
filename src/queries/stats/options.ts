import { queryOptions } from "@tanstack/react-query";

import { fetchStatsJson } from "./fetchStatsJson";
import { postsReviver, streaksReviver } from "./reviver";

export const postsOptions = queryOptions({
  queryKey: ["stats", "posts"],
  queryFn: () => fetchStatsJson("posts", postsReviver),
});

export const streaksOptions = queryOptions({
  queryKey: ["stats", "streaks"],
  queryFn: () => fetchStatsJson("streaks", streaksReviver),
});
