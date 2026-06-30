import type { SortedBy } from "~/shared/types/sortedBy";

export interface PostRow {
  date: string;
  timestamp: number;
  url: string;
}

export async function listPosts(
  db: D1Database,
): Promise<SortedBy<PostRow, "date", "asc">> {
  const { results } = await db
    .prepare(
      `
      SELECT date, timestamp, url
      FROM posts
      ORDER BY date ASC
    `,
    )
    .all<PostRow>();

  return results as any;
}

export async function insertPost(db: D1Database, post: PostRow) {
  await db
    .prepare(
      `
    REPLACE INTO posts (date, timestamp, url)
    VALUES (?, ?, ?)
    `,
    )
    .bind(post.date, post.timestamp, post.url)
    .run();
}
