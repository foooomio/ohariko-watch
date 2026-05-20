import type { DailyRecord, Summary, Streak } from "./stats";

export interface StatsJson<T> {
  generatedAt: number;
  payload: T;
}

export interface StatsValueMap {
  records: DailyRecord[];
  summary: Summary;
  streaks: Streak[];
}

export type StatsJsonName = keyof StatsValueMap;
