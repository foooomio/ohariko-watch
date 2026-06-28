import type { Post } from "~/shared/types/stats";

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

export function buildMonthlyStats(posts: readonly Post[]): YearMonthStats[] {
  const map = new Map<string, Accumulator>();

  for (const { date, datetime, elapsed } of posts) {
    if (!elapsed) {
      continue;
    }

    const yearMonth = date.toPlainYearMonth().toString();

    const acc = map.get(yearMonth) ?? {
      successCount: 0,
      totalCount: 0,
      totalTime: 0,
    };

    acc.totalCount++;

    if (datetime.hour < 12) {
      acc.successCount++;
    }

    acc.totalTime += elapsed.total("millisecond");

    map.set(yearMonth, acc);
  }

  return [...map.entries()]
    .toSorted(([a], [b]) => a.localeCompare(b))
    .map(([yearMonth, { successCount, totalCount, totalTime }]) => ({
      yearMonth,
      successRate: successCount / totalCount,
      averageTime: totalTime / totalCount,
    }));
}
