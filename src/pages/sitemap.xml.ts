import { getCollection } from 'astro:content';

const SITE = 'https://cosmicrafts.com';

export async function GET() {
  const docs = await getCollection('docs');
  const urls = [
    '/',
    '/claim/',
    '/governance/',
    '/profile/',
    '/privacy/',
    '/terms/',
    ...docs.map((d) => `/docs/${d.id}/`),
  ].map((p) => `${SITE}${p}`);
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u}</loc></url>`)
    .join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
