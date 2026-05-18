import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const nextDir = join(root, ".next");
const cacheOnly = process.argv.includes("--cache-only");

function remove(path) {
  if (existsSync(path)) {
    rmSync(path, { recursive: true, force: true });
  }
}

if (!existsSync(nextDir)) {
  process.exit(0);
}

if (cacheOnly) {
  remove(join(nextDir, "cache"));
  console.log("[clean] Caché de Next.js eliminada (.next/cache)");
} else {
  remove(nextDir);
  console.log("[clean] Carpeta .next eliminada");
}
