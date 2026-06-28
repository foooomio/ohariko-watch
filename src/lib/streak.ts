import type { SortedBy } from "~/shared/types/sortedBy";
import type { Streak } from "~/shared/types/stats";

export function sortedStreaksByDaysDesc(streaks: readonly Streak[]) {
  return streaks.toSorted((a, b) =>
    b.days === a.days
      ? Temporal.PlainDate.compare(b.startDate, a.startDate)
      : b.days - a.days,
  ) as unknown as SortedBy<Streak, "days", "desc">;
}
