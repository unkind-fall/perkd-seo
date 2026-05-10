import type { APIRoute } from 'astro';
import cities from '../data/cities.json';

export const GET: APIRoute = ({ site }) => {
  // Uses PUBLIC_SITE_URL env var when set (e.g. https://city.perkd.com.au), else falls back to astro.config site
  const base = (import.meta.env.PUBLIC_SITE_URL || site?.toString() || 'https://perkd.com.au').replace(/\/$/, '');
  const today = new Date().toISOString().split('T')[0];

  const urls = cities.map((city) => ({
    loc: `${base}/vending-machine-${city.slug}/`,
    priority: '0.9',
    freq: 'monthly',
  }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
