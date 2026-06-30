import { dateRange } from "~/shared/lib/date";
import type { SortedBy } from "~/shared/types/sortedBy";
import type { EmptyPost, FilledPost, Post } from "~/shared/types/stats";
import type { PostRow } from "../db/posts";

export function buildPostsData(
  postRows: SortedBy<PostRow, "date", "asc">,
): SortedBy<Post, "date", "asc"> {
  const start = postRows.at(0);
  const end = postRows.at(-1);

  if (!start || !end) {
    throw new Error("No posts");
  }

  const posts: Post[] = [];

  let postRowIndex = 0;

  for (const currentDate of dateRange(
    Temporal.PlainDate.from(start.date),
    Temporal.PlainDate.from(end.date),
  )) {
    const postRow = postRows.at(postRowIndex);

    if (!postRow) {
      throw new Error("Invalid post row index");
    }

    if (postRow.date === currentDate.toString()) {
      const datetime = Temporal.Instant.fromEpochMilliseconds(
        postRow.timestamp,
      ).toZonedDateTimeISO("Asia/Tokyo");

      const elapsed = datetime.toPlainTime().since({ hour: 0 });

      posts.push({
        date: currentDate,
        datetime,
        elapsed,
        url: postRow.url,
      } satisfies FilledPost);

      postRowIndex++;
    } else {
      posts.push({
        date: currentDate,
        datetime: null,
        elapsed: null,
        url: null,
      } satisfies EmptyPost);
    }
  }

  return posts as any;
}
