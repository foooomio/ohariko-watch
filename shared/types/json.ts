import type { SortedBy } from "./sortedBy";
import type { DailyRecord, Streak } from "./stats";

export interface StatsJson<T> {
  generatedAt: number;
  payload: T;
}

export interface StatsValueMap {
  records: SortedBy<DailyRecord, "date", "asc">;
  streaks: SortedBy<Streak, "startDate", "asc">;
}

export type StatsJsonName = keyof StatsValueMap;
