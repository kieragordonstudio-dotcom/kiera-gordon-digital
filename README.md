# Kiera Gordon Digital

Public website for Kiera Gordon Digital, a premium website studio for independent beauty businesses.

## Run Locally

```bash
pnpm install
pnpm run dev
```

Open the local URL printed in the terminal.

If you prefer npm:

```bash
npm install
npm run build
```

## Build

```bash
pnpm run build
```

The deployment build is written to `dist/`.

## Deploy

This project is already configured for OpenAI Sites through `.openai/hosting.json`.

For Render, use `render.yaml` in this repo. The app runs as a Node web service because the current Sites-compatible build produces a worker/server entry as well as static client assets.

## Where To Edit Things

Business name, email, pricing, turnaround, revision count, CTA wording and legal/footer wording:

```text
src/config/site.ts
```

Brand colours, typography and spacing tokens:

```text
src/styles/tokens.css
```

Main layout and page sections:

```text
src/App.tsx
```

Portfolio data:

```text
src/data/portfolio.ts
```

Pricing/package data:

```text
src/data/pricing.ts
```

FAQ data:

```text
src/data/faq.ts
```

Process data:

```text
src/data/process.ts
```

## Replace The Wordmark With A Logo

The temporary wordmark is in `src/App.tsx`, inside the `Wordmark` component. Replace that component output with an image when a real logo exists.

Put the logo file in:

```text
public/logo.svg
```

Then update `Wordmark` to render that file.

## Replace Founder Image

The founder image placeholder is in `src/App.tsx`, inside `AboutSection`. Search for:

```text
Replace with founder portrait.
```

Replace the abstract panel with a real portrait image when supplied.

## Connect The Concept Form

The form component is:

```text
src/components/forms/ConceptForm.tsx
```

The endpoint is configured here:

```text
src/config/site.ts
```

Set `formEndpoint` to a Formspree, Basin or similar endpoint. Until then, the form validates locally and clearly says submissions are not delivered.

## Add Future Portfolio Projects

Add project data to:

```text
src/data/portfolio.ts
```

Then add the page or listing section in:

```text
src/App.tsx
```

Do not add fake clients, testimonials or performance numbers.
