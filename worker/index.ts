import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { extractPostInfo, insertPost } from "./addUrl";

const app = new Hono<{ Bindings: Env }>();

app.use("/api/*", async (c, next) => {
  const validTokens = [c.env.API_TOKEN_GOOGLE_FORM];
  const bearer = bearerAuth<{ Bindings: Env }>({ token: validTokens });
  return bearer(c, next);
});

app.post("/api/add-url", async (c) => {
  const body = await c.req.text();

  const postInfo = extractPostInfo(body);

  if (!postInfo) {
    return c.json({ message: "Invalid input" }, 400);
  }

  await insertPost(c.env.DB, postInfo);

  return c.json({ message: "OK" });
});

export default app;
