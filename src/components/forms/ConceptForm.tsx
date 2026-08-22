'use client';

import { FormEvent, useState } from 'react';
import { InternalLink as Link } from '../common/InternalLink';
import { siteConfig } from '../../config/site';

type FieldErrors = Partial<Record<'name' | 'business' | 'email' | 'url', string>>;

function validate(form: HTMLFormElement) {
  const formData = new FormData(form);
  const errors: FieldErrors = {};
  const email = String(formData.get('email') || '').trim();

  if (!String(formData.get('name') || '').trim()) {
    errors.name = 'Enter your name so we know who to reply to.';
  }

  if (!String(formData.get('business') || '').trim()) {
    errors.business = 'Enter your business name so the concept can be personalised.';
  }

  if (!email || !email.includes('@')) {
    errors.email = 'Enter an email address so we know where to send your concept.';
  }

  if (!String(formData.get('url') || '').trim()) {
    errors.url =
      'Add a website, booking page or social profile so there is something to review.';
  }

  return errors;
}

export function ConceptForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    if (!siteConfig.formEndpoint) {
      event.preventDefault();
    }

    const nextErrors = validate(event.currentTarget);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      event.preventDefault();
      setSubmitted(false);
      return;
    }

    if (!siteConfig.formEndpoint) {
      setSubmitted(true);
    }
  }

  if (submitted && !siteConfig.formEndpoint) {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <p className="eyebrow">Form preview</p>
        <h2>Your request is ready to connect.</h2>
        <p>
          This local version has validated the details, but it has not sent an
          email because no form endpoint is configured yet. Connect Formspree,
          Basin or another endpoint before using this page with customers.
        </p>
        <Link className="button primary" href="/concept">
          Send another request
        </Link>
      </div>
    );
  }

  return (
    <form
      className="concept-form"
      action={siteConfig.formEndpoint || '#form-preview'}
      method="post"
      onSubmit={onSubmit}
      noValidate
    >
      <div className="field-grid">
        <label>
          <span>Your name</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            required
          />
          {errors.name ? <small id="name-error">{errors.name}</small> : null}
        </label>
        <label>
          <span>Business name</span>
          <input
            name="business"
            type="text"
            autoComplete="organization"
            aria-invalid={Boolean(errors.business)}
            aria-describedby={errors.business ? 'business-error' : undefined}
            required
          />
          {errors.business ? (
            <small id="business-error">{errors.business}</small>
          ) : null}
        </label>
      </div>
      <label>
        <span>Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          required
        />
        {errors.email ? <small id="email-error">{errors.email}</small> : null}
      </label>
      <label>
        <span>Website, booking page or social profile</span>
        <input
          name="url"
          type="url"
          inputMode="url"
          aria-invalid={Boolean(errors.url)}
          aria-describedby={errors.url ? 'url-error' : undefined}
          required
        />
        {errors.url ? <small id="url-error">{errors.url}</small> : null}
      </label>
      <label>
        <span>Anything you would like us to know?</span>
        <textarea name="message" rows={5} />
      </label>
      <button className="button primary form-button" type="submit">
        {siteConfig.conceptFormCta}
      </button>
      <p className="form-note">
        No call required. No payment details. No obligation to continue.
      </p>
      {!siteConfig.formEndpoint ? (
        <p className="form-preview-note" id="form-preview">
          Demo mode: submissions are validated in the browser only until a form
          endpoint is added in <code>src/config/site.ts</code>.
        </p>
      ) : null}
    </form>
  );
}
