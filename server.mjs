import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const distDir = resolve(root, 'dist');
const indexFile = join(distDir, 'index.html');
const port = Number(process.env.PORT || 3000);

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

createServer(async (request, response) => {
  try {
    const requestedPath = safePath(request.url || '/');
    const isAssetRequest = extname(requestedPath) !== '';
    await sendFile(response, isAssetRequest ? requestedPath : indexFile);
  } catch {
    try {
      await sendFile(response, indexFile);
    } catch {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not found');
    }
  }
}).listen(port, '0.0.0.0', () => {
  console.log(`Static server running at http://0.0.0.0:${port}`);
});
