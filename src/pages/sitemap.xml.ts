import type { APIRoute } from 'astro';
import cities from '../data/cities.json';

export const GET: APIRoute = () => {
  const base = 'https://perkd.com.au';
  const today = new Date().toISOString().split('T')[0];

  const urls = [
    { loc: `${base}/vending-locations`, priority: '0.8', freq: 'weekly' },
    ...cities.map((city) => ({
      loc: `${base}/vending-machine-${city.slug}`,
      priority: '0.9',
      freq: 'monthly',
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}/</loc>
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
