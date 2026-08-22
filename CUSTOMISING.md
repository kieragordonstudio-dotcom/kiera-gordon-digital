# Customising Kiera Gordon Digital

This file is for simple edits after launch.

## Change The Accent Colour

Open:

```text
src/styles/tokens.css
```

Change:

```css
--color-accent: #c94f3d;
```

## Change The Background Colour

Open:

```text
src/styles/tokens.css
```

Change:

```css
--color-background: #f5f3ef;
```

## Change The £795 Price

Open:

```text
src/config/site.ts
```

Change:

```ts
price: '£795',
```

Also update the two payment lines in `src/App.tsx` if the 50% payment amounts change.

## Change The £19 Care Plan

Open:

```text
src/config/site.ts
```

Change:

```ts
carePlanPrice: '£19/month',
```

## Change Contact Details

Open:

```text
src/config/site.ts
```

Change:

```ts
email: 'hello@kieragordondigital.co.uk',
phone: '',
```

Leave `phone` empty if there is no public phone number.

## Change CTA Wording

Open:

```text
src/config/site.ts
```

Change:

```ts
conceptCta: 'See what your salon could look like',
conceptFormCta: 'Request my homepage concept',
secondaryCta: 'See our work',
```

## Replace The Temporary Wordmark With A Logo

Add the real logo file to:

```text
public/logo.svg
```

Open:

```text
src/App.tsx
```

Find:

```text
function Wordmark()
```

Replace the text wordmark with an image tag using `/logo.svg`.

## Add A Founder Image

Add the portrait to:

```text
public/founder.jpg
```

Open:

```text
src/App.tsx
```

Find:

```text
Replace with founder portrait.
```

Replace the abstract `founder-panel` content with the image.

## Add A Real Client Project

Open:

```text
src/data/portfolio.ts
```

Add the real project details. Be clear whether it is a live client project or a concept.

Then open:

```text
src/App.tsx
```

Update the Work page and add a case-study route for the new project.

## Connect The Concept Form

Create a form endpoint in Formspree, Basin or another form service.

Open:

```text
src/config/site.ts
```

Change:

```ts
formEndpoint: '',
```

to the endpoint URL.

Test the form after changing it.
