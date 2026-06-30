import { useMemo } from "react";
import type { SortedBy } from "~/shared/types/sortedBy";
import type { Streak } from "~/shared/types/stats";

export function useSortedStreaks(
  streaks: readonly Streak[],
): SortedBy<Streak, "days", "desc"> {
  return useMemo(
    () =>
      streaks.toSorted((a, b) =>
        b.days === a.days
          ? Temporal.PlainDate.compare(b.startDate, a.startDate)
          : b.days - a.days,
      ) as any,
    [streaks],
  );
}
