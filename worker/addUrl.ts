import { timestampToDateString } from "./lib/date";
import { snowflakeIdToTimestamp } from "./lib/snowflake";

export interface PostInfo {
  timestamp: number;
  date: string;
  url: string;
}

export function extractPostInfo(text: string): PostInfo | null {
  const regexp = /https:\/\/x\.com\/(?:Shigariko_|i)\/status\/(\d+)/;

  const [match, snowflakeId] = text.match(regexp) ?? [];

  if (!match) {
    return null;
  }

  const url = match.replace("x.com/i", "x.com/Shigariko_");

  const timestamp = snowflakeIdToTimestamp(BigInt(snowflakeId));

  const date = timestampToDateString(timestamp, "Asia/Tokyo");

  return { timestamp, date, url };
}

export function insertPost(DB: D1Database, info: PostInfo) {
  return DB.prepare(
    `
    REPLACE INTO posts (timestamp, date, url)
    VALUES (?, ?, ?)
    `,
  )
    .bind(info.timestamp, info.date, info.url)
    .run();
}
