// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import fs from "node:fs";
import path from "node:path";

const site = process.env.PUBLIC_SITE_URL || "https://jeddahdecore.site";
const root = process.cwd();

function loadSeoSettings() {
  try {
    const file = path.join(root, "src/content/seo-settings/settings.json");
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return {
      noindexTagPages: false,
      noindexCategoryPages: false,
    };
  }
}

function collectNoindexContentPaths() {
  const entries = [
    ["src/content/blog", "/blog/"],
    ["src/content/services", "/services/"],
    ["src/content/projects", "/projects/"],
  ];
  const excluded = new Set();

  for (const [relativeDir, routeBase] of entries) {
    const directory = path.join(root, relativeDir);
    if (!fs.existsSync(directory)) continue;

    for (const fileName of fs.readdirSync(directory)) {
      if (!/\.(md|mdx)$/iu.test(fileName)) continue;
      const source = fs.readFileSync(path.join(directory, fileName), "utf8");
      if (!/^noindex:\s*true\s*$/imu.test(source)) continue;
      const id = fileName.replace(/\.(md|mdx)$/iu, "");
      excluded.add(`${routeBase}${id}/`);
    }
  }

  return excluded;
}

const seoSettings = loadSeoSettings();
const noindexContentPaths = collectNoindexContentPaths();

export default defineConfig({
  site,
  trailingSlash: "always",
  compressHTML: true,
  build: {
    format: "directory",
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const url = new URL(page);
        const pathname = url.pathname;
        if (pathname.startsWith("/admin/") || pathname.startsWith("/seo-admin/") || pathname.startsWith("/seo-api/")) return false;
        if (seoSettings.noindexTagPages && pathname.startsWith("/blog/tag/")) return false;
        if (seoSettings.noindexCategoryPages && pathname.startsWith("/blog/category/")) return false;
        if (noindexContentPaths.has(pathname)) return false;
        return true;
      },
    }),
  ],
});
