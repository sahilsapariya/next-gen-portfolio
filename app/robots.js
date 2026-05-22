import { SITE_URL } from "@/lib/seo";

/* Next.js App Router robots convention — exports a function that
   returns the robots config. Compiled into /robots.txt at build time. */
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
