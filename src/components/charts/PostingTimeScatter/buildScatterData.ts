import { DAY, HOUR, JST_OFFSET } from "~/shared/lib/date";
import type { DailyRecord } from "~/shared/types/stats";

export interface ScatterData {
  value: number[];
  extra: { url: string };
}

export function buildScatterData(
  records: DailyRecord[],
  periodDays: number,
): {
  successData: ScatterData[];
  failureData: ScatterData[];
  startValue: number;
} {
  const successData: ScatterData[] = [];
  const failureData: ScatterData[] = [];

  let startValue = 0;

  for (const { timestamp, timeOfDay, url } of records) {
    if (!timeOfDay) {
      continue;
    }

    const dayStartUTC = timestamp - timeOfDay + JST_OFFSET;

    const data = {
      value: [dayStartUTC, timeOfDay],
      extra: { url },
    };

    if (timeOfDay / HOUR < 12) {
      successData.push(data);
    } else {
      failureData.push(data);
    }

    startValue = dayStartUTC - periodDays * DAY;
  }

  return { successData, failureData, startValue };
}
