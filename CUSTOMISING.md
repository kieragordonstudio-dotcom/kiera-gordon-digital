# Customising Kiera Gordon Digital

This file is for simple edits after launch.

## Change The Launch Price

Open:

```text
src/config/site.ts
```

Change:

```ts
launchPrice: '£149',
```

The homepage, pricing page, FAQ, terms and offer panels read from this central
value.

## Change The Offer Note

Open:

```text
src/config/site.ts
```

Change:

```ts
offerNote: 'Currently £149 while Kiera Gordon Digital builds its first client portfolio.',
```

## Change Colours

Open:

```text
src/styles/tokens.css
```

The current system is off-white, black, grey and cobalt. Update the token values
there if the studio identity changes.

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
conceptCta: 'Get your free concept',
conceptFormCta: 'Send my business',
secondaryCta: 'View our work',
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
Founder image placeholder
```

Replace that graphic panel with the real photograph.

## Update Atelier Union Screenshots

Replace the files in:

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

Add the real project details. Be clear whether it is a live client project or a
concept project.

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

to the endpoint URL. Test the form after changing it.
