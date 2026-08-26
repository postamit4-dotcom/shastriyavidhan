import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { localImageSources } from "../lib/site-data.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function downloadAsset({ local, remote }) {
  const outputPath = path.join(root, "public", local.replace(/^\//, ""));
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const response = await fetch(remote, {
    headers: {
      "User-Agent": "ShastriyaVidhanNodeMigration/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${remote}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(outputPath, buffer);
  return outputPath;
}

const results = [];

for (const asset of localImageSources()) {
  try {
    const outputPath = await downloadAsset(asset);
    results.push({ ok: true, outputPath });
  } catch (error) {
    results.push({ ok: false, remote: asset.remote, error: error.message });
  }
}

for (const result of results) {
  if (result.ok) {
    console.log(`saved ${path.relative(root, result.outputPath)}`);
  } else {
    console.error(`failed ${result.remote}: ${result.error}`);
  }
}

const failed = results.filter((result) => !result.ok);
if (failed.length) {
  process.exitCode = 1;
}
