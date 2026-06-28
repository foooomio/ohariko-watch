import type { SortedBy } from "./sortedBy";
import type { Post, Streak } from "./stats";

export interface StatsJson<T> {
  generatedAt: Temporal.ZonedDateTime | string;
  payload: T;
}

export interface StatsValueMap {
  posts: SortedBy<Post, "date", "asc">;
  streaks: SortedBy<Streak, "startDate", "asc">;
}

export type StatsJsonName = keyof StatsValueMap;
