import { byDaysDesc } from "~/shared/lib/comparators/streaks";
import type { SortedBy } from "~/shared/types/sortedBy";
import type { Post, Streak } from "~/shared/types/stats";

export function buildStreaksData(
  posts: SortedBy<Post, "date", "asc">,
): SortedBy<Streak, "days", "desc"> {
  const streaks: Streak[] = [];

  let days = 0;
  let startDate: Temporal.PlainDate | null = null;
  let endDate: Temporal.PlainDate | null = null;

  function closeStreak() {
    if (startDate && endDate && days > 1) {
      streaks.push({ rank: 0, days, startDate, endDate });
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

  let rank = 0;
  let prevDays = 0;

  const sorted = streaks.toSorted(byDaysDesc).map((streak, index) => {
    if (streak.days !== prevDays) {
      rank = index + 1;
      prevDays = streak.days;
    }
    return { ...streak, rank };
  });

  return sorted as any;
}
