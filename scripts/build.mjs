/**
 * `next build` con limpieza previa para no mezclar artefactos con un dev activo.
 */
import { spawn } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const nextDir = join(root, ".next");

if (existsSync(nextDir)) {
  console.log("[build] Limpiando .next antes del build de producción...");
  rmSync(nextDir, { recursive: true, force: true });
}

const child = spawn("npx", ["next", "build"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
