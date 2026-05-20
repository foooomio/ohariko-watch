export interface DailyRecord {
  date: string;
  timestamp: number | null;
  url: string | null;
}

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
