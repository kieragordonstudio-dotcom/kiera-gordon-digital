# Asset Notes

The site intentionally avoids stock people and fake agency photography. Use real
business assets when available.

## Atelier Union Screenshots

The current portfolio imagery was captured from the live Atelier Union website
and saved in:

```text
public/projects/atelier-union/
```

Captured files:

```text
home-desktop.png
home-mobile.png
treatments-desktop.png
lookbook-desktop.png
lookbook-selected-oxblood.png
booking-flow-desktop.png
booking-mobile.png
```

Update labels and alt text in:

```text
src/data/portfolio.ts
```

## Founder Image

No founder photo is currently supplied. The live site uses a deliberate
graphic/typographic panel instead of a stock portrait.

When a real portrait exists, add it to:

```text
public/founder.jpg
```

Recommended size:

```text
1600 x 2000
```

## Logo

No final logo is currently supplied. The header uses a simple typography-led
wordmark.

When a logo exists, add it to:

```text
public/logo.svg
```

Then replace the `Wordmark` component in:

```text
src/App.tsx
```

## Favicon

The favicon placeholder is:

```text
public/favicon.svg
```

Replace it when the final identity is ready.

## Social Preview

The social preview card is:

```text
public/og.png
```

Recommended replacement size:

```text
1200 x 630 or larger landscape
```
