import { dateRange } from "~/shared/lib/date";
import type { SortedBy } from "~/shared/types/sortedBy";
import type { EmptyPost, FilledPost, Post, Streak } from "~/shared/types/stats";
import type { PostRow } from "../db/posts";

export interface Stats {
  posts: SortedBy<Post, "date", "asc">;
  streaks: SortedBy<Streak, "startDate", "asc">;
}

export function buildStatsData(
  postRows: SortedBy<PostRow, "date", "asc">,
): Stats {
  const start = postRows.at(0);
  const end = postRows.at(-1);

  if (!start || !end) {
    throw new Error("No posts");
  }

  const posts: Post[] = [];

  const streaks: Partial<Streak>[] = [];

  let currentStreak: Partial<Streak> & { days: number } = { days: 0 };

  let isStreakOngoing = true;

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

      if (datetime.hour < 12) {
        currentStreak.days++;
        currentStreak.startDate ??= currentDate;
        currentStreak.endDate = currentDate;
      } else {
        isStreakOngoing = false;
      }

      postRowIndex++;
    } else {
      posts.push({
        date: currentDate,
        datetime: null,
        elapsed: null,
        url: null,
      } satisfies EmptyPost);

      isStreakOngoing = false;
    }

    if (!isStreakOngoing && currentStreak.days > 1) {
      streaks.push(currentStreak);
      currentStreak = { days: 0 };
      isStreakOngoing = true;
    }
  }

  streaks.push(currentStreak);

  return { posts, streaks } as unknown as Stats;
}
