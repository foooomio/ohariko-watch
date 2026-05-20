import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { extractPost } from "./services/extractPost";
import { buildStatsData } from "./services/buildStatsData";
import { insertPost, listPosts } from "./db/posts";

const app = new Hono<{ Bindings: Env }>();

app.use("/api/*", async (c, next) => {
  const validTokens = [c.env.API_TOKEN_GOOGLE_FORM];
  const bearer = bearerAuth<{ Bindings: Env }>({ token: validTokens });
  return bearer(c, next);
});

app.post("/api/add-url", async (c) => {
  const body = await c.req.text();

  const post = extractPost(body);

  if (!post) {
    return c.text("Invalid input", 400);
  }

  await insertPost(c.env.DB, post);

  return c.text("OK");
});

app.post("/api/rebuild-json", async (c) => {
  const posts = await listPosts(c.env.DB);

  const stats = buildStatsData(posts);

  console.log(stats);

  return c.text("OK");
});

export default app;
