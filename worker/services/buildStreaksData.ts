import type { SortedBy } from "~/shared/types/sortedBy";
import type { Post, Streak } from "~/shared/types/stats";

export function buildStreaksData(
  posts: SortedBy<Post, "date", "asc">,
): SortedBy<Streak, "startDate", "asc"> {
  const streaks: Streak[] = [];

  let days = 0;
  let startDate: Temporal.PlainDate | null = null;
  let endDate: Temporal.PlainDate | null = null;

  function closeStreak() {
    if (startDate && endDate && days > 1) {
      streaks.push({ days, startDate, endDate });
    }
    days = 0;
    startDate = null;
    endDate = null;
  }

  for (const post of posts) {
    if (post.datetime && post.datetime.hour < 12) {
      days++;
      startDate ??= post.date;
      endDate = post.date;
    } else {
      closeStreak();
    }
  }

  closeStreak();

  return streaks as any;
}
