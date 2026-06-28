import type { PostRow } from "../db/posts";
import { snowflakeIdToTimestamp } from "~/shared/lib/snowflake";

export function extractPost(text: string): PostRow | null {
  const regexp = /https:\/\/x\.com\/(?:Shigariko_|i)\/status\/(\d+)/i;

  const [match, snowflakeId] = text.match(regexp) ?? [];

  if (!match) {
    return null;
  }

  const url = "https://x.com/Shigariko_/status/" + snowflakeId;

  const timestamp = snowflakeIdToTimestamp(BigInt(snowflakeId));

  const date = Temporal.Instant.fromEpochMilliseconds(timestamp)
    .toZonedDateTimeISO("Asia/Tokyo")
    .toPlainDate()
    .toString();

  return { date, timestamp, url };
}
