import type { Post } from "~/shared/types/stats";

export function buildHistogramData(posts: readonly Post[]): number[] {
  const histogram: number[] = Array(24).fill(0);

  for (const { datetime } of posts) {
    if (!datetime) {
      continue;
    }

    histogram[datetime.hour]++;
  }

  return histogram;
}
