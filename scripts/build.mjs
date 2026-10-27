import { spawnSync } from 'node:child_process';
import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
const temporary = path.resolve('.seo-build');
const run = args => { const result = spawnSync(process.execPath, ['node_modules/vite/bin/vite.js', ...args], { stdio: 'inherit' }); if (result.status !== 0) throw new Error('SEO build failed'); };
try {
 run(['build']);
 run(['build', '--ssr', 'src/entry-server.tsx', '--outDir', '.seo-build']);
 const { render } = await import(pathToFileURL(path.join(temporary, 'entry-server.js')).href);
 let html = await readFile('dist/index.html', 'utf8');
 html = html.replace('<div id="root"></div>', () => '<div id="root">' + render() + '</div>');
 let site = process.env.SITE_URL || 'https://www.sukhshantitravels.co.in/';
 if (!site && process.env.GITHUB_ACTIONS === 'true') site = 'https://ajay-code9.github.io/sukhshantitravels/';
 let robots = 'User-agent: *\nAllow: /\n';
 if (site) {
  const url = new URL(site);
  if (url.protocol !== 'https:' || url.search || url.hash || url.username || url.password) throw new Error('SITE_URL must be a public HTTPS website URL without query or hash');
  site = url.href.replace(/\/?$/, '/');
  const escaped = site.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  html = html.replace('</head>', `<link rel="canonical" href="${escaped}" /><meta property="og:url" content="${escaped}" /></head>`);
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escaped}</loc></url></urlset>`);
  robots += `Sitemap: ${site}sitemap.xml\n`;
 } else console.warn('Set SITE_URL to the final public HTTPS URL to generate canonical URL and sitemap.');
 await writeFile('dist/index.html', html);
 await writeFile('dist/robots.txt', robots);
 console.log('SEO: full page HTML prerendered; crawl directives generated.');
} finally { await rm(temporary, { recursive: true, force: true }); }

