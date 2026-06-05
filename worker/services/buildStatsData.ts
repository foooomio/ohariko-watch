import type {
  DailyRecord,
  EmptyDailyRecord,
  FilledDailyRecord,
  Streak,
  Summary,
} from "~/shared/types/stats";
import type { PostRow } from "../db/posts";
import { dateRange, DAY, isBeforeNoon, JST_OFFSET } from "~/shared/lib/date";

export interface Stats {
  records: DailyRecord[];
  summary: Summary;
  streaks: Streak[];
}

export function buildStatsData(sortedPosts: PostRow[]): Stats {
  const start = sortedPosts.at(0);
  const end = sortedPosts.at(-1);

  if (!start || !end) {
    throw new Error("No posts");
  }

  const records: DailyRecord[] = [];

  const summary: Summary = {
    totalDays: 0,
    postDays: 0,
    noPostDays: 0,
    successDays: 0,
    failureDays: 0,
  };

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

    summary.totalDays++;

    if (post.date === dateString) {
      const timeOfDay = (post.timestamp + JST_OFFSET) % DAY;

      records.push({
        ...post,
        timeOfDay,
      } satisfies FilledDailyRecord);

      summary.postDays++;

      if (isBeforeNoon(timeOfDay)) {
        summary.successDays++;

        streak.days++;
        streak.startDate ||= dateString;
        streak.endDate = dateString;
      } else {
        summary.failureDays++;

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

      summary.noPostDays++;

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

  return { records, summary, streaks };
}
