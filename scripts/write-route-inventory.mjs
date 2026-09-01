import fs from "node:fs/promises";
import path from "node:path";
import { routeInventory, siteNodes } from "../lib/site-registry.js";
import { site } from "../lib/site-data.js";

const docsDir = path.join(process.cwd(), "docs");
const outputPath = path.join(docsDir, "route-inventory.json");

await fs.mkdir(docsDir, { recursive: true });
await fs.writeFile(
  outputPath,
  `${JSON.stringify(
    {
      site: site.name,
      canonicalHost: site.productionUrl,
      generatedAt: new Date().toISOString(),
      source: "repository_inventory_without_live_status_checks",
      routeCount: siteNodes.length,
      routes: routeInventory(),
    },
    null,
    2,
  )}\n`,
  "utf8",
);

console.log(`Wrote ${outputPath}`);
