import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function scrapeAndDownloadImages() {
  console.log("Fetching https://shastriyavidhan.com/ ...");
  const res = await fetch("https://shastriyavidhan.com/", {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  });

  const html = await res.text();
  
  // Extract all wp-content/uploads image URLs
  const regex = /https:\/\/shastriyavidhan\.com\/wp-content\/uploads\/[^\s"'<>)]+\.(?:png|jpe?g|webp|svg)/gi;
  const matches = Array.from(new Set(html.match(regex) || []));

  console.log(`Found ${matches.length} image URLs on live site:`);
  matches.forEach((url) => console.log(" - " + url));

  const outputDir = path.join(root, "public", "images");
  await fs.mkdir(outputDir, { recursive: true });

  for (const url of matches) {
    try {
      const filename = path.basename(new URL(url).pathname);
      const dest = path.join(outputDir, filename);
      console.log(`Downloading ${filename} ...`);
      const imgRes = await fetch(url);
      if (imgRes.ok) {
        const buffer = Buffer.from(await imgRes.arrayBuffer());
        await fs.writeFile(dest, buffer);
        console.log(`Saved -> ${dest}`);
      } else {
        console.error(`Failed ${url}: ${imgRes.status}`);
      }
    } catch (err) {
      console.error(`Error downloading ${url}: ${err.message}`);
    }
  }

  // Also download the official site logo specifically
  const logoUrl = "https://shastriyavidhan.com/wp-content/uploads/2025/12/cropped-WhatsApp_Image_2025-12-02_at_2.19.34_PM-removebg-preview.png";
  try {
    const logoRes = await fetch(logoUrl);
    if (logoRes.ok) {
      const buffer = Buffer.from(await logoRes.arrayBuffer());
      await fs.writeFile(path.join(outputDir, "shastriya-vidhan-logo.png"), buffer);
      console.log("Saved official logo -> public/images/shastriya-vidhan-logo.png");
    }
  } catch (err) {
    console.error("Error downloading logo:", err.message);
  }
}

scrapeAndDownloadImages();
