import { isBeforeNoon } from "~/shared/lib/date";
import type { DailyRecord } from "~/shared/types/stats";

export function buildSummaryData(records: DailyRecord[]) {
  let successCount = 0;
  let failureCount = 0;
  let totalTime = 0;

  for (const { timeOfDay } of records.slice(-30)) {
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
    successRate: successCount / postCount,
    averageTime: totalTime / postCount,
  };
}
