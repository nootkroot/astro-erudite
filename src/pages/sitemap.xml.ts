import { getPosts } from "@/lib/content"
import type { APIContext } from "astro"

export async function GET(context: APIContext) {
  const pages = [
    "",
    "blog",
    "authors",
    "projects",
    ...(await getPosts()).map((post) => `blog/${post.id}`),
  ]
  const urls = pages
    .map((page) => new URL(page && `${page}/`, context.site!).href)
    .map((href) => `  <url><loc>${href}</loc></url>`)
    .join("\n")
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml" } },
  )
}
