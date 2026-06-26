import type { SortedBy } from "~/shared/types/sortedBy";

export interface PostRow {
  date: string;
  timestamp: number;
  url: string;
}

export async function listPosts(db: D1Database) {
  const { results } = await db
    .prepare(
      `
      SELECT date, timestamp, url
      FROM posts
      ORDER BY date ASC
    `,
    )
    .all<PostRow>();

  return results as unknown as SortedBy<PostRow, "date", "asc">;
}

export async function insertPost(db: D1Database, post: PostRow) {
  await db
    .prepare(
      `
    REPLACE INTO posts (timestamp, date, url)
    VALUES (?, ?, ?)
    `,
    )
    .bind(post.timestamp, post.date, post.url)
    .run();
}
