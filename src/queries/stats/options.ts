import { queryOptions } from "@tanstack/react-query";
import { fetchStatsJson } from "./fetchStatsJson";

export const postsOptions = queryOptions({
  queryKey: ["stats", "posts"],
  queryFn: () => fetchStatsJson("posts"),
  select: (data) => data.payload,
  initialData: {
    payload: [] as any,
    generatedAt: "",
  },
  initialDataUpdatedAt: 0,
});

export const streaksOptions = queryOptions({
  queryKey: ["stats", "streaks"],
  queryFn: () => fetchStatsJson("streaks"),
  select: (data) => data.payload,
  initialData: {
    payload: [] as any,
    generatedAt: "",
  },
  initialDataUpdatedAt: 0,
});
