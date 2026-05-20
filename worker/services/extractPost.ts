import type { PostRow } from "../db/posts";
import { timestampToDateString } from "../lib/date";
import { snowflakeIdToTimestamp } from "../lib/snowflake";

export function extractPost(text: string): PostRow | null {
  const regexp = /https:\/\/x\.com\/(?:Shigariko_|i)\/status\/(\d+)/;

  const [match, snowflakeId] = text.match(regexp) ?? [];

  if (!match) {
    return null;
  }

  const url = match.replace("x.com/i", "x.com/Shigariko_");

  const timestamp = snowflakeIdToTimestamp(BigInt(snowflakeId));

  const date = timestampToDateString(timestamp, "Asia/Tokyo");

  return { date, timestamp, url };
}
