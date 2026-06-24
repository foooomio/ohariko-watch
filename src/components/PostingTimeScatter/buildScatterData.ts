import { isBeforeNoon } from "~/shared/lib/date";
import type { DailyRecord } from "~/shared/types/stats";

export interface ScatterData {
  value: number[];
  extra: { url: string };
}

export function buildScatterData(records: DailyRecord[]): {
  successData: ScatterData[];
  failureData: ScatterData[];
} {
  const successData: ScatterData[] = [];
  const failureData: ScatterData[] = [];

  for (const { date, timeOfDay, url } of records) {
    if (!timeOfDay) {
      continue;
    }

    const data = {
      value: [Date.parse(date), timeOfDay],
      extra: { url },
    };

    if (isBeforeNoon(timeOfDay)) {
      successData.push(data);
    } else {
      failureData.push(data);
    }
  }

  return { successData, failureData };
}
