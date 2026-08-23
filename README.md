# Kiera Gordon Digital

Public website for Kiera Gordon Digital, a website studio for independent beauty businesses.

Live Render URL:

```text
https://kiera-gordon-digital.onrender.com
```

## Run Locally

```bash
pnpm install
pnpm run dev
```

Open the local URL printed in the terminal.

## Build

```bash
pnpm run build
pnpm run start
```

The deployment build is written to `dist/` and served by `server.mjs`.

## Deploy To Render

This project is configured for Render with `render.yaml`.

Render should run:

```text
pnpm install --frozen-lockfile && pnpm run build
```

and start with:

```text
pnpm run start
```

The server handles clean routes, `/sitemap.xml`, `/robots.txt` and real 404 responses.

## Enquiry Email

The `/start` form posts to:

```text
/api/enquiry
```

Email delivery uses Resend when these Render environment variables are set:

```text
RESEND_API_KEY
ENQUIRY_FROM
ENQUIRY_TO
```

`ENQUIRY_TO` is optional and defaults to:

```text
kieragordondigital@gmail.com
```

If `RESEND_API_KEY` or `ENQUIRY_FROM` is missing, the endpoint returns a clear configuration error instead of showing fake success.

## Where To Edit Things

Central business copy, pricing, CTA wording and form endpoint:

```text
src/config/site.ts
```

Route metadata, canonical origin, sitemap routes and redirects:

```text
site-meta.json
```

Brand colours, typography and spacing tokens:

```text
src/styles/tokens.css
```

Main layout and page sections:

```text
src/App.tsx
```

Pricing, ownership and support scope:

```text
src/data/pricing.ts
```

FAQ, process and portfolio copy:

```text
src/data/faq.ts
src/data/process.ts
src/data/portfolio.ts
```

## Portfolio And Assets

Atelier Union screenshots are stored as WebP files in:

```text
public/projects/atelier-union/
```

Do not add fake clients, testimonials or performance numbers. Mark self-initiated work clearly.

## Founder Image

The real founder portrait is stored at `public/founder-kiera-gordon.webp`. The site does not use a stock or generated portrait.

The portrait is connected in `src/config/site.ts`:

```ts
founderImage: '/founder-kiera-gordon.webp',
```
