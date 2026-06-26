import { isBeforeNoon } from "~/shared/lib/date";
import type { DailyRecord } from "~/shared/types/stats";

export interface SummaryData {
  successRate: number;
  averageTime: number;
}

export function buildSummaryData(records: readonly DailyRecord[]): SummaryData {
  let successCount = 0;
  let failureCount = 0;
  let totalTime = 0;

  for (const { timeOfDay } of records) {
    if (!timeOfDay) {
      continue;
    }

    if (isBeforeNoon(timeOfDay)) {
      successCount++;
    } else {
      failureCount++;
    }

    totalTime += timeOfDay;
  }

  const postCount = successCount + failureCount;

  return {
    successRate: postCount > 0 ? successCount / postCount : 0,
    averageTime: postCount > 0 ? totalTime / postCount : 0,
  };
}
