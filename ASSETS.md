# Asset Notes

The site avoids stock people, generated portraits and fake agency photography. Use real business assets when available.

## Atelier Union Screenshots

The current portfolio imagery was captured from the live Atelier Union website and saved as optimized WebP files in:

```text
public/projects/atelier-union/
```

Captured files:

```text
home-desktop.webp
home-mobile.webp
treatments-desktop.webp
lookbook-desktop.webp
booking-desktop.webp
booking-mobile.webp
```

Update labels and alt text in:

```text
src/data/portfolio.ts
```

## Founder Image

No founder photo is currently supplied. The live site uses a founder-led text panel instead of a stock or generated portrait.

When a real portrait exists, add it to:

```text
public/founder.jpg
```

Recommended size:

```text
1600 x 2000
```

Then set `founderImage` in `src/config/site.ts`.

## Logo

No final logo is currently supplied. The header uses a typography-led wordmark.

When a logo exists, add it to:

```text
public/logo.svg
```

Then replace the `Wordmark` component in:

```text
src/App.tsx
```

## Favicon

The favicon is:

```text
public/favicon.svg
```

Replace it when the final identity is ready.

## Social Preview

The social preview card is:

```text
public/og.png
```

Recommended size:

```text
1200 x 630
```
