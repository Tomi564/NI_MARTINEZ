/**
 * `next build` con limpieza previa para no mezclar artefactos con un dev activo.
 */
import { execSync, spawn } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const nextDir = join(root, ".next");
const force = process.argv.includes("--force");

function isDevServerRunning() {
  try {
    if (process.platform === "win32") {
      const out = execSync("netstat -ano | findstr :3000", { encoding: "utf8" });
      return out.includes("LISTENING");
    }

    execSync("lsof -i :3000 -sTCP:LISTEN", { encoding: "utf8", stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

if (!force && isDevServerRunning()) {
  console.error(
    "[build] El servidor de desarrollo está corriendo en el puerto 3000.\n" +
      "        Paralo antes de hacer build para evitar caché corrupta.\n" +
      "        (Ctrl+C en la terminal del dev, o usá: npm run build -- --force)",
  );
  process.exit(1);
}

if (existsSync(nextDir)) {
  console.log("[build] Limpiando .next antes del build de producción...");
  rmSync(nextDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
}

const child = spawn("npx", ["next", "build"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
