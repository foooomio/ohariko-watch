import { color } from "@/lib/color";
import { HOUR } from "~/shared/lib/date";
import type { DailyRecord } from "~/shared/types/stats";

export interface HistogramData {
  value: number;
  itemStyle: {
    color: string;
  };
}

export function buildHistogramData(records: DailyRecord[]): HistogramData[] {
  const histogram: HistogramData[] = Array.from({ length: 24 }, (_, hour) => ({
    value: 0,
    itemStyle: {
      color: hour < 12 ? color.success : color.failure,
    },
  }));

  for (const { timeOfDay } of records) {
    if (!timeOfDay) {
      continue;
    }

    const hour = Math.floor(timeOfDay / HOUR);

    histogram[hour].value++;
  }

  return histogram;
}
