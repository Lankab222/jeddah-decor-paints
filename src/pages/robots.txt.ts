import type { APIContext } from "astro";

export const prerender = true;

export function GET(context: APIContext) {
  const site = (context.site ?? new URL("https://jeddahdecore.site")).toString().replace(/\/+$/, "");
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin/",
    "Disallow: /seo-admin/",
    "",
    `Sitemap: ${site}/sitemap-index.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
