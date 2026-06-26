import { dateRange, DAY, isBeforeNoon, JST_OFFSET } from "~/shared/lib/date";
import type { SortedBy } from "~/shared/types/sortedBy";
import type {
  DailyRecord,
  EmptyDailyRecord,
  FilledDailyRecord,
  Streak,
} from "~/shared/types/stats";
import type { PostRow } from "../db/posts";

export interface Stats {
  records: SortedBy<DailyRecord, "date", "asc">;
  streaks: SortedBy<Streak, "startDate", "asc">;
}

export function buildStatsData(
  sortedPosts: SortedBy<PostRow, "date", "asc">,
): Stats {
  const start = sortedPosts.at(0);
  const end = sortedPosts.at(-1);

  if (!start || !end) {
    throw new Error("No posts");
  }

  const records: DailyRecord[] = [];

  const streaks: Streak[] = [];
  let streak: Streak = {
    days: 0,
    startDate: "",
    endDate: "",
  };
  let isStreakOngoing = true;

  let postIndex = 0;

  for (const dateString of dateRange(start.date, end.date)) {
    const post = sortedPosts.at(postIndex);

    if (!post) {
      throw new Error("Invalid post index");
    }

    if (post.date === dateString) {
      const timeOfDay = (post.timestamp + JST_OFFSET) % DAY;

      records.push({
        ...post,
        timeOfDay,
      } satisfies FilledDailyRecord);

      if (isBeforeNoon(timeOfDay)) {
        streak.days++;
        streak.startDate ||= dateString;
        streak.endDate = dateString;
      } else {
        isStreakOngoing = false;
      }

      postIndex++;
    } else {
      records.push({
        date: dateString,
        timestamp: null,
        url: null,
        timeOfDay: null,
      } satisfies EmptyDailyRecord);

      isStreakOngoing = false;
    }

    if (!isStreakOngoing && streak.days > 1) {
      streaks.push(streak);
      streak = {
        days: 0,
        startDate: "",
        endDate: "",
      };
      isStreakOngoing = true;
    }
  }

  streaks.push(streak);

  return { records, streaks } as unknown as Stats;
}
