/**
 * Vite plugin: mounts api/jobber/* as middleware on the dev server, so the
 * exact same handlers that run on Vercel in production also handle local
 * /api/jobber/* requests during `npm run dev`.
 *
 * Reads .env.local explicitly because Vite's `loadEnv` doesn't expose vars
 * that lack the VITE_ prefix to import.meta.env, but they ARE present on
 * process.env when Vite starts. We re-load .env.local on every request so
 * editing the file (e.g. pasting in a fresh JOBBER_REFRESH_TOKEN) takes
 * effect without needing a server restart.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROUTES = ["/api/jobber/auth", "/api/jobber/callback", "/api/jobber/request", "/api/jobber/whoami", "/api/jobber/diagnose"];

function loadEnvLocal(root) {
  try {
    const path = resolve(root, ".env.local");
    const txt = readFileSync(path, "utf8");
    for (const line of txt.split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const eq = t.indexOf("=");
      if (eq < 0) continue;
      const key = t.slice(0, eq).trim();
      const val = t.slice(eq + 1).trim();
      // Don't override values explicitly set in the parent process env.
      if (process.env[key] === undefined || process.env[key] === "") {
        process.env[key] = val;
      } else if (key.startsWith("JOBBER_")) {
        // Always refresh JOBBER_* from .env.local so a newly pasted refresh
        // token takes effect immediately without a dev-server restart.
        process.env[key] = val;
      }
    }
  } catch { /* missing .env.local is fine */ }
}

export default function jobberDevApi() {
  return {
    name: "jobber-dev-api",
    configureServer(server) {
      const root = server.config.root;
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || "";
        const route = ROUTES.find((r) => url === r || url.startsWith(r + "?"));
        if (!route) return next();

        // Re-load env every request so token paste takes effect live.
        loadEnvLocal(root);

        try {
          // Resolve the handler against the project root using a file URL so
          // dynamic import works regardless of where Vite cached this plugin.
          // Functions live at the repo-root /api (Vercel serves functions from
          // there); the Vite dev root is web/, so step up one level.
          const filePath = resolve(root, `../api/jobber/${route.split("/").pop()}.js`);
          const fileUrl = pathToFileURL(filePath).href + `?t=${Date.now()}`;
          const handler = await import(fileUrl);
          await handler.default(req, res);
        } catch (e) {
          console.error(`[jobber-dev-api] handler error for ${route}:`, e);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify({ ok: false, error: e.message }));
          }
        }
      });
    },
  };
}
