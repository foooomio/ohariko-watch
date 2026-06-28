import type { SortedBy } from "~/shared/types/sortedBy";
import type { Post } from "~/shared/types/stats";

export function buildGaussianSmoothData(
  posts: SortedBy<Post, "date", "asc">,
  sigma: number,
): [number, number | null][] {
  const radius = Math.ceil(sigma * 3);
  const denominatorFactor = 2 * sigma * sigma;

  return posts.map((target, targetIndex) => {
    let weightedSum = 0;
    let weightTotal = 0;

    for (
      let sourceIndex = Math.max(0, targetIndex - radius);
      sourceIndex <= Math.min(posts.length - 1, targetIndex + radius);
      sourceIndex++
    ) {
      const elapsed = posts[sourceIndex].elapsed;

      if (!elapsed) {
        continue;
      }

      const distance = sourceIndex - targetIndex;

      const weight = Math.exp(-(distance * distance) / denominatorFactor);

      weightedSum += elapsed.total("millisecond") * weight;
      weightTotal += weight;
    }

    return [
      target.date.toZonedDateTime("UTC").epochMilliseconds,
      weightTotal > 0 ? weightedSum / weightTotal : null,
    ];
  });
}
