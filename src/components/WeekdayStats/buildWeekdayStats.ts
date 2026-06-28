import type { Post } from "~/shared/types/stats";

export interface WeekdayStats {
  successRate: number;
  averageTime: number;
}

export function buildWeekdayStats(posts: readonly Post[]): WeekdayStats[] {
  const stats = Array.from({ length: 7 }, () => ({
    successCount: 0,
    totalCount: 0,
    totalTime: 0,
  }));

  for (const { date, datetime, elapsed } of posts) {
    if (!elapsed) {
      continue;
    }

    const weekday = date.dayOfWeek % 7;

    stats[weekday].totalCount++;

    if (datetime.hour < 12) {
      stats[weekday].successCount++;
    }

    stats[weekday].totalTime += elapsed.total("millisecond");
  }

  return stats.map(({ successCount, totalCount, totalTime }) => ({
    successRate: successCount / totalCount,
    averageTime: totalTime / totalCount,
  }));
}
