/**
 * Arranca `next dev` con limpieza preventiva para evitar 404 en CSS/JS
 * (caché corrupta al mezclar build + dev, o tras hot-reload en Windows).
 */
import { spawn } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const nextDir = join(root, ".next");

function remove(path) {
  if (existsSync(path)) {
    rmSync(path, { recursive: true, force: true });
  }
}

function needsFullClean() {
  if (!existsSync(nextDir)) return false;

  // Artefactos de `next build` — incompatibles con `next dev`
  const productionMarkers = [
    "prerender-manifest.json",
    "export-marker.json",
    "required-server-files.json",
  ];

  if (productionMarkers.some((file) => existsSync(join(nextDir, file)))) {
    return true;
  }

  // BUILD_ID de producción suele ser distinto; si hay server/app y fallan chunks, limpiar
  const appBuildManifest = join(nextDir, "app-build-manifest.json");
  const staticChunks = join(nextDir, "static", "chunks");

  if (existsSync(appBuildManifest) && !existsSync(staticChunks)) {
    return true;
  }

  return false;
}

if (needsFullClean()) {
  console.log("[dev] Detectada caché de producción o incompleta. Limpiando .next...");
  remove(nextDir);
} else if (existsSync(nextDir)) {
  remove(join(nextDir, "cache"));
}

const child = spawn("npx", ["next", "dev"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});

process.on("SIGINT", () => child.kill("SIGINT"));
process.on("SIGTERM", () => child.kill("SIGTERM"));
