import { byDateAsc, byDateDesc, byElapsedAsc, byElapsedDesc } from "~/shared/lib/comparators/posts";
import type { SortOption } from "~/shared/types/sortedBy";
import type { Post } from "~/shared/types/stats";

export function comparator({ key, order }: SortOption<Post>): (a: Post, b: Post) => number {
  switch (key) {
    case "elapsed":
      return order === "asc" ? byElapsedAsc : byElapsedDesc;
    default:
      return order === "asc" ? byDateAsc : byDateDesc;
  }
}
