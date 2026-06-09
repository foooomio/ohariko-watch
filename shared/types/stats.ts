export interface FilledDailyRecord {
  date: string;
  timestamp: number;
  url: string;
  timeOfDay: number;
}

export interface EmptyDailyRecord {
  date: string;
  timestamp: null;
  url: null;
  timeOfDay: null;
}

export type DailyRecord = FilledDailyRecord | EmptyDailyRecord;

export interface Streak {
  days: number;
  startDate: string;
  endDate: string;
}
