#!/usr/bin/env node
/**
 * Sanity check that hits Jobber's GraphQL endpoint with our stored refresh
 * token. Uses the shared lib so refresh-token rotation is handled correctly
 * (the new value is persisted back to .env.local automatically).
 *
 * Run with:  node scripts/jobber-verify.mjs
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ENV  = resolve(HERE, "..", ".env.local");

for (const line of readFileSync(ENV, "utf8").split(/\r?\n/)) {
  const t = line.trim();
  if (!t || t.startsWith("#")) continue;
  const eq = t.indexOf("=");
  if (eq < 0) continue;
  process.env[t.slice(0, eq).trim()] = t.slice(eq + 1).trim();
}

const { refreshAccessToken, jobberGraphql } = await import("../api/jobber/_lib.js");

(async () => {
  console.log("[1/2] refreshing access token...");
  const tok = await refreshAccessToken();
  console.log(`      ✓ access token expires in ${tok.expires_in}s`);

  console.log("[2/2] querying Jobber for account info...");
  const data = await jobberGraphql(
    `query { account { id name industry } }`,
    {},
    tok.access_token,
  );
  console.log("      ✓ account:", data.account);

  console.log("\nALL GREEN — submit a test estimate from the website to verify the full flow.");
})().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
