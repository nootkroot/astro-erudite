import { NAVIGATION } from "@/consts"
import { getPosts } from "@/lib/content"
import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts()
  const urls = ["/", ...NAVIGATION.map(({ href }) => href)]
    .concat(posts.map((post) => `/blog/${post.id}`))
    .map((path) => new URL(path.replace(/\/?$/, "/"), site))
    .map((url) => `  <url><loc>${url}</loc></url>`)
    .join("\n")
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
    { headers: { "Content-Type": "application/xml" } },
  )
}
