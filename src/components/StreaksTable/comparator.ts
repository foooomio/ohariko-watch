import {
  byDaysAsc,
  byDaysDesc,
  byStartDateAsc,
  byStartDateDesc,
} from "~/shared/lib/comparators/streaks";
import type { SortOption } from "~/shared/types/sortedBy";
import type { Streak } from "~/shared/types/stats";

export function comparator({ key, order }: SortOption<Streak>): (a: Streak, b: Streak) => number {
  switch (key) {
    case "days":
      return order === "asc" ? byDaysAsc : byDaysDesc;
    default:
      return order === "asc" ? byStartDateAsc : byStartDateDesc;
  }
}
