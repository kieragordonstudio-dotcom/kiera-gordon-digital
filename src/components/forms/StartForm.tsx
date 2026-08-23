'use client';

import { FormEvent, useState } from 'react';
import { siteConfig } from '../../config/site';

const businessTypes = [
  'Nails',
  'Hair',
  'Brows / lashes',
  'Beauty salon',
  'Aesthetics',
  'Other',
];

const projectTypes = [
  'New website',
  'Replace an existing website',
  'Improve an existing website',
  'Not sure yet',
];

type FieldName =
  | 'name'
  | 'business'
  | 'email'
  | 'url'
  | 'businessType'
  | 'projectType';

type FieldErrors = Partial<Record<FieldName, string>>;

type FormStatus =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success'; message: string }
  | { state: 'error'; message: string };

function getText(formData: FormData, name: string) {
  return String(formData.get(name) || '').trim();
}

function validate(formData: FormData) {
  const errors: FieldErrors = {};
  const email = getText(formData, 'email');

  if (!getText(formData, 'name')) {
    errors.name = 'Enter your name.';
  }

  if (!getText(formData, 'business')) {
    errors.business = 'Enter your business name.';
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!getText(formData, 'url')) {
    errors.url = 'Add your website, booking page or Instagram.';
  }

  if (!getText(formData, 'businessType')) {
    errors.businessType = 'Choose the closest business type.';
  }

  if (!getText(formData, 'projectType')) {
    errors.projectType = 'Choose what you need.';
  }

  return errors;
}

function ErrorMessage({ id, message }: { id: string; message?: string }) {
  return message ? <small id={id}>{message}</small> : null;
}

export function StartForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>({ state: 'idle' });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors = validate(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({
        state: 'error',
        message: 'Check the highlighted fields and send the enquiry again.',
      });
      return;
    }

    setStatus({ state: 'submitting' });

    try {
      const response = await fetch(siteConfig.formEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        setStatus({
          state: 'error',
          message:
            result.error ||
            'The enquiry could not be sent. Please email Kiera directly.',
        });
        return;
      }

      form.reset();
      setErrors({});
      setStatus({
        state: 'success',
        message:
          result.message ||
          'Your enquiry has been sent. Kiera will reply with the next steps.',
      });
    } catch {
      setStatus({
        state: 'error',
        message:
          'The enquiry could not be sent. Please email Kiera directly.',
      });
    }
  }

  return (
    <form className="enquiry-form" method="post" onSubmit={onSubmit} noValidate>
      <label className="spam-field" aria-hidden="true">
        <span>Leave this field empty</span>
        <input name="nickname" type="text" tabIndex={-1} autoComplete="off" />
      </label>

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
          <ErrorMessage id="name-error" message={errors.name} />
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
          <ErrorMessage id="business-error" message={errors.business} />
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
        <ErrorMessage id="email-error" message={errors.email} />
      </label>

      <label>
        <span>Current website / booking page / Instagram</span>
        <input
          name="url"
          type="text"
          aria-invalid={Boolean(errors.url)}
          aria-describedby={errors.url ? 'url-error' : undefined}
          required
        />
        <ErrorMessage id="url-error" message={errors.url} />
      </label>

      <div className="field-grid">
        <label>
          <span>Type of beauty business</span>
          <select
            name="businessType"
            defaultValue=""
            aria-invalid={Boolean(errors.businessType)}
            aria-describedby={
              errors.businessType ? 'business-type-error' : undefined
            }
            required
          >
            <option value="" disabled>
              Choose one
            </option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <ErrorMessage
            id="business-type-error"
            message={errors.businessType}
          />
        </label>

        <label>
          <span>What do you need?</span>
          <select
            name="projectType"
            defaultValue=""
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={errors.projectType ? 'project-type-error' : undefined}
            required
          >
            <option value="" disabled>
              Choose one
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <ErrorMessage id="project-type-error" message={errors.projectType} />
        </label>
      </div>

      <label>
        <span>Optional message</span>
        <textarea name="message" rows={5} />
      </label>

      <button
        className="button primary form-button"
        type="submit"
        disabled={status.state === 'submitting'}
      >
        {status.state === 'submitting' ? 'Sending...' : siteConfig.formCta}
      </button>

      <p className="form-note">
        Enquiries go to{' '}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>

      <div
        className={`form-status ${status.state}`}
        role="status"
        aria-live="polite"
      >
        {status.state === 'success' || status.state === 'error' ? (
          <p>{status.message}</p>
        ) : null}
      </div>
    </form>
  );
}
