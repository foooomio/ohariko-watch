import { HOUR } from "~/shared/lib/date";
import type { DailyRecord } from "~/shared/types/stats";

export function buildHistogramData(records: readonly DailyRecord[]): number[] {
  const histogram: number[] = Array(24).fill(0);

  for (const { timeOfDay } of records) {
    if (!timeOfDay) {
      continue;
    }

    const hour = Math.floor(timeOfDay / HOUR);

    histogram[hour]++;
  }

  return histogram;
}
