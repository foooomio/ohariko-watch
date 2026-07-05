import type { SortedBy } from "../types/sortedBy";
import type { Streak } from "../types/stats";

export function toStreaksByDaysDesc(
  streaks: readonly Streak[],
): SortedBy<Streak, "days", "desc"> {
  return streaks.toSorted((a, b) =>
    b.days === a.days
      ? Temporal.PlainDate.compare(b.startDate, a.startDate)
      : b.days - a.days,
  ) as any;
}
