import { DAY, isBeforeNoon, JST_OFFSET } from "~/shared/lib/date";
import type { DailyRecord } from "~/shared/types/stats";

export interface WeekdayStats {
  successRate: number;
  averageTime: number;
}

export function buildWeekdayStats(records: DailyRecord[]): WeekdayStats[] {
  const stats = Array.from({ length: 7 }, () => ({
    successCount: 0,
    totalCount: 0,
    totalTime: 0,
  }));

  for (const { timestamp, timeOfDay } of records) {
    if (!timeOfDay) {
      continue;
    }

    const weekday = Math.floor((timestamp + JST_OFFSET) / DAY + 4) % 7;

    stats[weekday].totalCount++;

    if (isBeforeNoon(timeOfDay)) {
      stats[weekday].successCount++;
    }

    stats[weekday].totalTime += timeOfDay;
  }

  return stats.map(({ successCount, totalCount, totalTime }) => ({
    successRate: successCount / totalCount,
    averageTime: totalTime / totalCount,
  }));
}
