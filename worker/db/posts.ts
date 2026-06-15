export interface PostRow {
  date: string;
  timestamp: number;
  url: string;
}

export async function listPosts(db: D1Database): Promise<PostRow[]> {
  const { results } = await db
    .prepare(
      `
      SELECT date, timestamp, url
      FROM posts
      ORDER BY date ASC
    `,
    )
    .all<PostRow>();

  return results;
}

export async function insertPost(db: D1Database, post: PostRow): Promise<void> {
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
