import type { Post } from "~/shared/types/stats";

export interface ScatterData {
  value: number[];
  extra: { url: string };
}

export function buildScatterData(posts: readonly Post[]): {
  successData: ScatterData[];
  failureData: ScatterData[];
} {
  const successData: ScatterData[] = [];
  const failureData: ScatterData[] = [];

  for (const { date, datetime, elapsed, url } of posts) {
    if (!elapsed) {
      continue;
    }

    const data = {
      value: [
        date.toZonedDateTime("UTC").epochMilliseconds,
        elapsed.total("millisecond"),
      ],
      extra: { url },
    };

    if (datetime.hour < 12) {
      successData.push(data);
    } else {
      failureData.push(data);
    }
  }

  return { successData, failureData };
}
