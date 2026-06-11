import { isBeforeNoon } from "~/shared/lib/date";
import type { DailyRecord } from "~/shared/types/stats";

export interface YearMonthStats {
  yearMonth: string;
  successRate: number;
  averageTime: number;
}

interface Accumulator {
  successCount: number;
  totalCount: number;
  totalTime: number;
}

export function buildMonthlyStats(records: DailyRecord[]): YearMonthStats[] {
  const map = new Map<string, Accumulator>();

  for (const { date, timeOfDay } of records) {
    if (!timeOfDay) {
      continue;
    }

    const yearMonth = date.slice(0, 7);

    const acc = map.get(yearMonth) ?? {
      successCount: 0,
      totalCount: 0,
      totalTime: 0,
    };

    acc.totalCount++;

    if (isBeforeNoon(timeOfDay)) {
      acc.successCount++;
    }

    acc.totalTime += timeOfDay;

    map.set(yearMonth, acc);
  }

  return [...map.entries()].map(
    ([yearMonth, { successCount, totalCount, totalTime }]) => ({
      yearMonth,
      successRate: successCount / totalCount,
      averageTime: totalTime / totalCount,
    }),
  );
}
