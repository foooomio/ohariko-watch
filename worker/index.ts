import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { extractPost } from "./services/extractPost";
import { buildStatsData } from "./services/buildStatsData";
import { insertPost, listPosts } from "./db/posts";
import { putStatsJson } from "./storage/stats";

const app = new Hono<{ Bindings: Env }>();

app.use("/api/*", async (c, next) => {
  const validTokens = c.env.API_TOKEN_LIST.split(",");
  const bearer = bearerAuth<{ Bindings: Env }>({ token: validTokens });
  return bearer(c, next);
});

app.post("/api/add-url", async (c) => {
  const { url } = await c.req.json();

  const post = extractPost(url);

  if (!post) {
    return c.text("Invalid input", 400);
  }

  await insertPost(c.env.DB, post);

  return c.text("OK");
});

app.post("/api/rebuild-json", async (c) => {
  const posts = await listPosts(c.env.DB);

  const { records, streaks } = buildStatsData(posts);

  await Promise.all([
    putStatsJson(c.env.BUCKET, "records", records),
    putStatsJson(c.env.BUCKET, "streaks", streaks),
  ]);

  return c.text("OK");
});

app.get("/assets/*", async (c) => {
  const key = c.req.path.replace("/assets/", "");
  const object = await c.env.BUCKET.get(key);
  if (!object) {
    return c.notFound();
  }
  return c.body(object.body, 200, {
    "Content-Type":
      object.httpMetadata?.contentType ?? "application/octet-stream",
  });
});

export default app;
