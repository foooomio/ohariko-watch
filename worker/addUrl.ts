import { timestampToDateJST } from "./lib/date";
import { snowflakeIdToTimestamp } from "./lib/snowflake";

export interface PostInfo {
  timestamp: number;
  date: string;
  url: string;
}

export function extractPostInfo(text: string): PostInfo | null {
  const regexp = /https:\/\/x\.com\/([0-9a-zA-Z_]+)\/status\/(\d+)/;

  const [match, username, snowflakeId] = text.match(regexp) ?? [];

  if (!match || !snowflakeId) {
    return null;
  }

  let url: string;

  if (username === "Shigariko_") {
    url = match;
  } else if (username === "i") {
    url = match.replace("x.com/i", "x.com/Shigariko_");
  } else {
    return null;
  }

  const timestamp = snowflakeIdToTimestamp(BigInt(snowflakeId));

  const date = timestampToDateJST(timestamp);

  return { timestamp, date, url };
}

export function insertPost(DB: D1Database, info: PostInfo) {
  return DB.prepare(
    `
    INSERT INTO posts (timestamp, date, url)
    VALUES (?, ?, ?)
    ON CONFLICT DO NOTHING
    `,
  )
    .bind(info.timestamp, info.date, info.url)
    .run();
}
