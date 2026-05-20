import type { DailyRecord, Streak, Summary } from "../../shared/types/stats";
import type { PostRow } from "../db/posts";
import { dateRange, isBeforeNoon, JST_OFFSET } from "../lib/date";

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
      records.push(post);

      summary.postDays++;

      if (isBeforeNoon(post.timestamp, JST_OFFSET)) {
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
      records.push({ date: dateString, timestamp: null, url: null });

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
