# Customising Kiera Gordon Digital

This file is for simple edits after launch.

## Change The Website Build Price

Open:

```text
src/config/site.ts
```

Change:

```ts
launchPrice: '£149',
```

The homepage, pricing page, FAQ, terms and offer panels read from this central value.

## Change The Managed Plan Price

Open:

```text
src/config/site.ts
```

Change:

```ts
managedPrice: '£15 / month',
```

Also review `src/data/pricing.ts` and `src/data/faq.ts` if the Managed scope changes.

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
primaryCta: 'Start your website',
formCta: 'Send my enquiry',
secondaryCta: 'View our work',
```

## Change Route Metadata

Open:

```text
site-meta.json
```

This file controls the site origin, sitemap routes, route metadata and the retired enquiry-route redirect.

## Connect The Enquiry Form

The form endpoint is:

```text
/api/enquiry
```

Set these Render environment variables:

```text
RESEND_API_KEY
ENQUIRY_FROM
ENQUIRY_TO
```

`ENQUIRY_TO` is optional and defaults to `hello@kieragordondigital.co.uk`.

## Change Colours

Open:

```text
src/styles/tokens.css
```

The current system is near-white, black, grey and cobalt.

## Replace The Wordmark With A Logo

Add the real logo file to:

```text
public/logo.svg
```

Open `src/App.tsx`, find `function Wordmark()` and replace the text wordmark with an image tag using `/logo.svg`.

## Add A Founder Image

Add the portrait to:

```text
public/founder.jpg
```

Then open `src/config/site.ts` and set:

```ts
founderImage: '/founder.jpg',
```

Only use a real supplied portrait.

## Update Atelier Union Screenshots

Replace the WebP files in:

```text
public/projects/atelier-union/
```

Then update labels or alt text in:

```text
src/data/portfolio.ts
```

## Add A Real Client Project

Open:

```text
src/data/portfolio.ts
```

Add the real project details. Be clear whether it is a live client project or self-initiated work.

Then open:

```text
src/App.tsx
```

Update the Work page and add a case-study route for the new project.
