/**
 * Arranca `next dev` con limpieza preventiva para evitar 404 en CSS/JS
 * (caché corrupta al mezclar build + dev, o tras hot-reload en Windows).
 */
import { spawn } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const nextDir = join(root, ".next");
const useTurbo = process.argv.includes("--turbo");

function remove(path) {
  if (existsSync(path)) {
    rmSync(path, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
  }
}

function needsFullClean() {
  if (!existsSync(nextDir)) return false;

  const productionMarkers = [
    "prerender-manifest.json",
    "export-marker.json",
    "required-server-files.json",
    "BUILD_ID",
  ];

  if (productionMarkers.some((file) => existsSync(join(nextDir, file)))) {
    return true;
  }

  const appBuildManifest = join(nextDir, "app-build-manifest.json");
  const staticChunks = join(nextDir, "static", "chunks");

  if (existsSync(appBuildManifest) && !existsSync(staticChunks)) {
    return true;
  }

  return false;
}

function cleanDevArtifacts() {
  const partialPaths = [
    join(nextDir, "cache"),
    join(nextDir, "static", "webpack"),
    join(nextDir, "server", "vendor-chunks"),
  ];

  for (const path of partialPaths) {
    remove(path);
  }
}

if (needsFullClean()) {
  console.log("[dev] Caché de producción o incompleta detectada. Limpiando .next...");
  remove(nextDir);
} else if (existsSync(nextDir)) {
  cleanDevArtifacts();
  console.log("[dev] Caché de desarrollo limpiada (webpack/HMR).");
}

const nextArgs = ["next", "dev"];
if (useTurbo) {
  nextArgs.push("--turbo");
  console.log("[dev] Usando Turbopack (--turbo).");
}

const child = spawn("npx", nextArgs, {
  cwd: root,
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    WATCHPACK_POLLING: process.platform === "win32" ? "true" : process.env.WATCHPACK_POLLING,
  },
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});

process.on("SIGINT", () => child.kill("SIGINT"));
process.on("SIGTERM", () => child.kill("SIGTERM"));
