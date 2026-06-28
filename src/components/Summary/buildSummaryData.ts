import type { Post } from "~/shared/types/stats";

export interface SummaryData {
  successRate: number;
  averageTime: number;
}

export function buildSummaryData(posts: readonly Post[]): SummaryData {
  let successCount = 0;
  let failureCount = 0;
  let totalTime = 0;

  for (const { datetime, elapsed } of posts) {
    if (!elapsed) {
      continue;
    }

    if (datetime.hour < 12) {
      successCount++;
    } else {
      failureCount++;
    }

    totalTime += elapsed.total("millisecond");
  }

  const postCount = successCount + failureCount;

  return {
    successRate: postCount > 0 ? successCount / postCount : 0,
    averageTime: postCount > 0 ? totalTime / postCount : 0,
  };
}
