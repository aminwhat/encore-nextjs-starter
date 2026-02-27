import { api } from "encore.dev/api";
import { appMeta } from "encore.dev";
import next from "next";

const isDev = appMeta().environment.cloud === "local";

const app = next({
  dev: isDev,
  dir: "./frontend",
});
const handle = app.getRequestHandler();
const prepared = app.prepare().catch((err) => {
  console.error("Next.js prepare failed", err);
  throw err;
});

export const nextjs = api.raw(
  { expose: true, path: "/!rest", method: "*" },
  async (req, resp) => {
    await prepared; // Wait for Next.js to start up.
    return handle(req, resp);
  },
);
