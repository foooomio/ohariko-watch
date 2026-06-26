import type { SortedBy } from "~/shared/types/sortedBy";
import type { DailyRecord } from "~/shared/types/stats";

export function buildMovingAverageData(
  records: SortedBy<DailyRecord, "date", "asc">,
  windowSize: number,
): [number, number | null][] {
  let sum = 0;
  let count = 0;

  return records.map((added, index) => {
    if (added.timeOfDay) {
      sum += added.timeOfDay;
      count++;
    }

    const removed = records[index - windowSize];

    if (removed?.timeOfDay) {
      sum -= removed.timeOfDay;
      count--;
    }

    return [Date.parse(added.date), count > 0 ? sum / count : null];
  });
}
