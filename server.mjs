import { createReadStream } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const distDir = resolve(root, 'dist');
const indexFile = join(distDir, 'index.html');
const siteMeta = JSON.parse(await readFile(join(root, 'site-meta.json'), 'utf8'));
const port = Number(process.env.PORT || 3000);
const maxBodySize = 32_768;
const requestLog = new Map();

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
};

function routePath(urlPath) {
  return (urlPath.split('?')[0] || '/').replace(/\/$/, '') || '/';
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function escapeXml(value) {
  return escapeHtml(value).replaceAll("'", '&apos;');
}

function absoluteUrl(path) {
  return new URL(path, siteMeta.siteOrigin).toString();
}

function staticPath(pathname) {
  const decoded = decodeURIComponent(pathname || '/');
  const candidate = resolve(distDir, `.${decoded}`);

  if (candidate !== distDir && !candidate.startsWith(`${distDir}${sep}`)) {
    return null;
  }

  return candidate;
}

async function sendFile(response, request, filePath) {
  const fileStat = await stat(filePath);

  if (!fileStat.isFile()) {
    throw new Error('Not a file');
  }

  response.writeHead(200, {
    'Cache-Control': 'public, max-age=31536000, immutable',
    'Content-Length': fileStat.size,
    'Content-Type': mimeTypes[extname(filePath)] || 'application/octet-stream',
  });

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
}

async function sendIndex(response, request, requestPath, statusCode = 200) {
  const path = statusCode === 404 ? '/404' : routePath(requestPath);
  const meta = siteMeta.routes[path] || siteMeta.routes['/404'];
  const route = routePath(requestPath);
  const canonical = absoluteUrl(statusCode === 404 ? '/404' : route === '/' ? '/' : route);
  const ogImage = absoluteUrl(siteMeta.ogImage);
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
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:url" content="${canonical}" />`,
    )
    .replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:image" content="${ogImage}" />`,
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:image" content="${ogImage}" />`,
    );

  response.writeHead(statusCode, {
    'Cache-Control': 'no-store',
    'Content-Length': Buffer.byteLength(html),
    'Content-Type': 'text/html; charset=utf-8',
  });

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  response.end(html);
}

function sendJson(response, request, statusCode, payload) {
  const body = JSON.stringify(payload);

  response.writeHead(statusCode, {
    'Cache-Control': 'no-store',
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'application/json; charset=utf-8',
  });

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  response.end(body);
}

async function readJsonBody(request) {
  let body = '';

  for await (const chunk of request) {
    body += chunk;

    if (Buffer.byteLength(body) > maxBodySize) {
      const error = new Error('Request body is too large.');
      error.statusCode = 413;
      throw error;
    }
  }

  if (!body.trim()) {
    return {};
  }

  try {
    return JSON.parse(body);
  } catch {
    const error = new Error('Request body must be valid JSON.');
    error.statusCode = 400;
    throw error;
  }
}

function getText(payload, key) {
  return String(payload[key] || '').trim();
}

function validateEnquiry(payload) {
  const errors = {};
  const email = getText(payload, 'email');

  for (const key of ['name', 'business', 'url', 'businessType', 'projectType']) {
    if (!getText(payload, key)) {
      errors[key] = 'Required';
    }
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  return errors;
}

function clientIp(request) {
  const forwarded = request.headers['x-forwarded-for'];

  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }

  return request.socket.remoteAddress || 'unknown';
}

function isRateLimited(request) {
  const key = clientIp(request);
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const entry = requestLog.get(key) || { count: 0, resetAt: now + windowMs };

  if (entry.resetAt <= now) {
    requestLog.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  entry.count += 1;
  requestLog.set(key, entry);
  return entry.count > 6;
}

function enquiryText(payload) {
  return [
    'New Kiera Gordon Digital website enquiry',
    '',
    `Name: ${getText(payload, 'name')}`,
    `Business: ${getText(payload, 'business')}`,
    `Email: ${getText(payload, 'email')}`,
    `Current website / booking / Instagram: ${getText(payload, 'url')}`,
    `Business type: ${getText(payload, 'businessType')}`,
    `Project need: ${getText(payload, 'projectType')}`,
    '',
    'Message:',
    getText(payload, 'message') || 'No message supplied.',
  ].join('\n');
}

function enquiryHtml(payload) {
  const rows = [
    ['Name', getText(payload, 'name')],
    ['Business', getText(payload, 'business')],
    ['Email', getText(payload, 'email')],
    ['Current website / booking / Instagram', getText(payload, 'url')],
    ['Business type', getText(payload, 'businessType')],
    ['Project need', getText(payload, 'projectType')],
    ['Message', getText(payload, 'message') || 'No message supplied.'],
  ];

  return `
    <h1>New Kiera Gordon Digital website enquiry</h1>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) => `
            <tr>
              <th align="left" style="border:1px solid #ddd">${escapeHtml(label)}</th>
              <td style="border:1px solid #ddd">${escapeHtml(value).replaceAll('\n', '<br>')}</td>
            </tr>
          `,
        )
        .join('')}
    </table>
  `;
}

async function handleEnquiry(request, response) {
  if (request.method !== 'POST') {
    response.writeHead(405, {
      Allow: 'POST',
      'Content-Type': 'application/json; charset=utf-8',
    });
    response.end(JSON.stringify({ ok: false, error: 'Use POST.' }));
    return;
  }

  if (isRateLimited(request)) {
    sendJson(response, request, 429, {
      ok: false,
      error: 'Too many enquiries from this connection. Try again later.',
    });
    return;
  }

  const payload = await readJsonBody(request);

  if (getText(payload, 'nickname')) {
    sendJson(response, request, 200, {
      ok: true,
      message: 'Thanks. Your enquiry has been received.',
    });
    return;
  }

  const errors = validateEnquiry(payload);

  if (Object.keys(errors).length > 0) {
    sendJson(response, request, 400, {
      ok: false,
      error: 'Check the required fields and send the enquiry again.',
      errors,
    });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM;
  const to = process.env.ENQUIRY_TO || siteMeta.enquiryTo;

  if (!resendApiKey || !from) {
    sendJson(response, request, 503, {
      ok: false,
      error:
        `Email delivery is not configured yet. Please email ${siteMeta.enquiryTo} directly.`,
    });
    return;
  }

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: getText(payload, 'email'),
      subject: `New website enquiry from ${getText(payload, 'business')}`,
      text: enquiryText(payload),
      html: enquiryHtml(payload),
    }),
  });

  if (!resendResponse.ok) {
    const message = await resendResponse.text().catch(() => '');
    console.error('Resend delivery failed:', message);
    sendJson(response, request, 502, {
      ok: false,
      error:
        `Email delivery failed. Please email ${siteMeta.enquiryTo} directly.`,
    });
    return;
  }

  sendJson(response, request, 200, {
    ok: true,
    message: 'Your enquiry has been sent. Kiera will reply with next steps.',
  });
}

function sendSitemap(response, request) {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${siteMeta.sitemapRoutes
  .map((route) => `  <url><loc>${escapeXml(absoluteUrl(route))}</loc></url>`)
  .join('\n')}
</urlset>
`;

  response.writeHead(200, {
    'Cache-Control': 'no-store',
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'application/xml; charset=utf-8',
  });

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  response.end(body);
}

function sendRobots(response, request) {
  const body = `User-agent: *
Allow: /

Sitemap: ${absoluteUrl('/sitemap.xml')}
`;

  response.writeHead(200, {
    'Cache-Control': 'no-store',
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'text/plain; charset=utf-8',
  });

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  response.end(body);
}

createServer(async (request, response) => {
  try {
    const url = new URL(request.url || '/', siteMeta.siteOrigin);
    const path = routePath(url.pathname);
    const redirect = siteMeta.redirects[path];

    if (redirect) {
      response.writeHead(308, {
        Location: redirect,
      });
      response.end();
      return;
    }

    if (path === '/api/enquiry') {
      await handleEnquiry(request, response);
      return;
    }

    if (path === '/sitemap.xml') {
      sendSitemap(response, request);
      return;
    }

    if (path === '/robots.txt') {
      sendRobots(response, request);
      return;
    }

    const filePath = staticPath(url.pathname);
    const isAssetRequest = filePath ? extname(filePath) !== '' : false;

    if (isAssetRequest && filePath) {
      await sendFile(response, request, filePath);
      return;
    }

    if (Object.hasOwn(siteMeta.routes, path) && path !== '/404') {
      await sendIndex(response, request, url.pathname, 200);
      return;
    }

    await sendIndex(response, request, url.pathname, 404);
  } catch (error) {
    const statusCode = error.statusCode || 500;

    if (statusCode < 500) {
      sendJson(response, request, statusCode, {
        ok: false,
        error: error.message,
      });
      return;
    }

    console.error(error);
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Internal server error');
  }
}).listen(port, '0.0.0.0', () => {
  console.log(`Static server running at http://0.0.0.0:${port}`);
});
