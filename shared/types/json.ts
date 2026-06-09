import type { DailyRecord, Streak } from "./stats";

export interface StatsJson<T> {
  generatedAt: number;
  payload: T;
}

export interface StatsValueMap {
  records: DailyRecord[];
  streaks: Streak[];
}

export type StatsJsonName = keyof StatsValueMap;
