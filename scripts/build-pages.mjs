import { spawnSync } from "node:child_process";
import { rename, access } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const apiDir = path.resolve("src/app/api");
const apiBackup = path.resolve("src/app/_api.pages-backup");

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const hadApi = await exists(apiDir);
  if (hadApi) await rename(apiDir, apiBackup);

  const env = {
    ...process.env,
    GITHUB_PAGES: "true",
    NEXT_PUBLIC_STATIC_EXPORT: "true",
  };

  const result = spawnSync("npx", ["next", "build"], {
    stdio: "inherit",
    env,
    shell: process.platform === "win32",
  });

  if (hadApi && (await exists(apiBackup))) {
    await rename(apiBackup, apiDir);
  }

  process.exit(result.status ?? 1);
}

main().catch(async (err) => {
  console.error(err);
  if (await exists(apiBackup)) {
    try {
      await rename(apiBackup, apiDir);
    } catch {
      /* ignore */
    }
  }
  process.exit(1);
});
