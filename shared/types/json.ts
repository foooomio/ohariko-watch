import type { SortedBy } from "./sortedBy";
import type { Post, Streak } from "./stats";

export interface StatsJson<T> {
  generatedAt: Temporal.ZonedDateTime;
  payload: T;
}

export interface StatsValueMap {
  posts: SortedBy<Post, "date", "asc">;
  streaks: SortedBy<Streak, "days", "desc">;
}

export type StatsJsonName = keyof StatsValueMap;
