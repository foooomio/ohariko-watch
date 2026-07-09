import {
  byDateAsc,
  byDateDesc,
  byElapsedAsc,
  byElapsedDesc,
} from "~/shared/lib/comparators/posts";
import type { Post } from "~/shared/types/stats";
import type { SortOption } from "~/shared/types/sortedBy";

export function comparator({
  key,
  order,
}: SortOption<Post>): (a: Post, b: Post) => number {
  switch (key) {
    case "elapsed":
      return order === "asc" ? byElapsedAsc : byElapsedDesc;
    default:
      return order === "asc" ? byDateAsc : byDateDesc;
  }
}
