import {
  byDaysAsc,
  byDaysDesc,
  byStartDateAsc,
  byStartDateDesc,
} from "~/shared/lib/comparators/streaks";
import type { Streak } from "~/shared/types/stats";
import type { SortOption } from "~/shared/types/sortedBy";

export function comparator({
  key,
  order,
}: SortOption<Streak>): (a: Streak, b: Streak) => number {
  switch (key) {
    case "days":
      return order === "asc" ? byDaysAsc : byDaysDesc;
    default:
      return order === "asc" ? byStartDateAsc : byStartDateDesc;
  }
}
