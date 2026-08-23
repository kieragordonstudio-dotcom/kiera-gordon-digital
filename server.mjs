import { createReadStream } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const distDir = resolve(root, 'dist');
const indexFile = join(distDir, 'index.html');
const port = Number(process.env.PORT || 3000);
const siteOrigin = 'https://kiera-gordon-digital.onrender.com';

const routeMeta = {
  '/': {
    title: 'Kiera Gordon Digital | Websites for independent beauty businesses',
    description:
      'Graphic, booking-ready websites for salons and independent beauty businesses. Introductory launch price £149.',
  },
  '/work': {
    title: 'Selected work | Kiera Gordon Digital',
    description:
      'Selected concept work from Kiera Gordon Digital, including the live Atelier Union nail salon website.',
  },
  '/work/atelier-union': {
    title: 'Atelier Union case study | Kiera Gordon Digital',
    description:
      'An honest self-initiated concept showing how brand, treatments, proof and booking can work together for a beauty business.',
  },
  '/pricing': {
    title: '£149 launch offer | Kiera Gordon Digital',
    description:
      'A focused launch offer for independent beauty business websites: one clear £149 price, no lock-in and no mandatory monthly contract.',
  },
  '/process': {
    title: 'Process | Kiera Gordon Digital',
    description:
      'A simple concept-first website process for salons and appointment-led beauty businesses.',
  },
  '/about': {
    title: 'About | Kiera Gordon Digital',
    description:
      'Kiera Gordon Digital is a small independent web-design studio focused on beauty businesses.',
  },
  '/concept': {
    title: 'Get your free concept | Kiera Gordon Digital',
    description:
      'Send your current website, booking page or Instagram and see a personalised homepage direction before paying anything.',
  },
  '/faq': {
    title: 'FAQ | Kiera Gordon Digital',
    description:
      'Answers about the £149 launch offer, ownership, booking systems, revisions, timings and launch support.',
  },
  '/privacy': {
    title: 'Privacy | Kiera Gordon Digital',
    description: 'Privacy information for Kiera Gordon Digital.',
  },
  '/terms': {
    title: 'Terms | Kiera Gordon Digital',
    description: 'Starter project terms for Kiera Gordon Digital.',
  },
};

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0] || '/');
  const clean = normalize(decoded)
    .replace(/^[/\\]+/, '')
    .replace(/^(\.\.[/\\])+/, '');
  return join(distDir, clean);
}

async function sendFile(response, filePath) {
  const fileStat = await stat(filePath);

  if (!fileStat.isFile()) {
    throw new Error('Not a file');
  }

  response.writeHead(200, {
    'Content-Length': fileStat.size,
    'Content-Type': mimeTypes[extname(filePath)] || 'application/octet-stream',
  });
  createReadStream(filePath).pipe(response);
}

function routePath(urlPath) {
  return (urlPath.split('?')[0] || '/').replace(/\/$/, '') || '/';
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

async function sendIndex(response, requestPath) {
  const path = routePath(requestPath);
  const meta = routeMeta[path] || routeMeta['/'];
  const canonical = `${siteOrigin}${path === '/' ? '/' : path}`;
  const html = (await readFile(indexFile, 'utf8'))
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${canonical}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    );

  response.writeHead(200, {
    'Content-Length': Buffer.byteLength(html),
    'Content-Type': 'text/html; charset=utf-8',
  });
  response.end(html);
}

createServer(async (request, response) => {
  try {
    const requestedPath = safePath(request.url || '/');
    const isAssetRequest = extname(requestedPath) !== '';
    if (isAssetRequest) {
      await sendFile(response, requestedPath);
      return;
    }
    await sendIndex(response, request.url || '/');
  } catch {
    try {
      await sendIndex(response, request.url || '/');
    } catch {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not found');
    }
  }
}).listen(port, '0.0.0.0', () => {
  console.log(`Static server running at http://0.0.0.0:${port}`);
});
