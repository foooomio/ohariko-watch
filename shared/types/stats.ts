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

/**
 * totalDays = postDays + noPostDays
 *
 * postDays = successDays + failureDays
 */
export interface Summary {
  totalDays: number;
  postDays: number;
  noPostDays: number;
  successDays: number;
  failureDays: number;
}

export interface Streak {
  days: number;
  startDate: string;
  endDate: string;
}
