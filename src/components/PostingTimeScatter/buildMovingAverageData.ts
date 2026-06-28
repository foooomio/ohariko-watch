import type { SortedBy } from "~/shared/types/sortedBy";
import type { Post } from "~/shared/types/stats";

export function buildMovingAverageData(
  posts: SortedBy<Post, "date", "asc">,
  windowSize: number,
): [number, number | null][] {
  let sum = 0;
  let count = 0;

  return posts.map((added, index) => {
    if (added.elapsed) {
      sum += added.elapsed.total("millisecond");
      count++;
    }

    const removed = posts[index - windowSize];

    if (removed?.elapsed) {
      sum -= removed.elapsed.total("millisecond");
      count--;
    }

    return [
      added.date.toZonedDateTime("UTC").epochMilliseconds,
      count > 0 ? sum / count : null,
    ];
  });
}
