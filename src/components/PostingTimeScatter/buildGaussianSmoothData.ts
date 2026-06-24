import type { DailyRecord } from "~/shared/types/stats";

export function buildGaussianSmoothData(
  records: DailyRecord[],
  sigma: number,
): [number, number | null][] {
  const radius = Math.ceil(sigma * 3);
  const denominatorFactor = 2 * sigma * sigma;

  return records.map((target, targetIndex) => {
    let weightedSum = 0;
    let weightTotal = 0;

    for (
      let sourceIndex = Math.max(0, targetIndex - radius);
      sourceIndex <= Math.min(records.length - 1, targetIndex + radius);
      sourceIndex++
    ) {
      const value = records[sourceIndex].timeOfDay;

      if (!value) {
        continue;
      }

      const distance = sourceIndex - targetIndex;

      const weight = Math.exp(-(distance * distance) / denominatorFactor);

      weightedSum += value * weight;
      weightTotal += weight;
    }

    return [
      Date.parse(target.date),
      weightTotal > 0 ? weightedSum / weightTotal : null,
    ];
  });
}
