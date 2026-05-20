import type { DailyRecord, Streak, Summary } from "./stats";

export interface StatsJson {
  generatedAt: number;
}

export interface RecordsJson extends StatsJson {
  records: DailyRecord[];
}

export interface SummaryJson extends StatsJson {
  summary: Summary;
}

export interface StreakJson extends StatsJson {
  current: Streak;
  longest: Streak;
}
