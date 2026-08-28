import siteMeta from '../site-meta.json';
import { InternalLink as Link } from './components/common/InternalLink';
import { StartForm } from './components/forms/StartForm';
import { siteConfig } from './config/site';
import { faqs } from './data/faq';
import {
  atelierScreenshots,
  atelierUnionProject,
  projectPrinciples,
} from './data/portfolio';
import {
  notIncluded,
  operatingOptions,
  ownershipItems,
  packageInclusions,
  supportCovers,
  supportExcludes,
} from './data/pricing';
import { clientChecklist, processSteps } from './data/process';

type RouteMeta = Record<string, { title: string; description: string }>;

export const routeMeta: RouteMeta = siteMeta.routes;

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/process', label: 'Process' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
];

const offerFacts = [
  { value: siteConfig.launchPrice, label: 'Website build' },
  { value: '7–14', label: 'Working days' },
  { value: siteConfig.ownershipLabel, label: 'Ownership' },
  { value: '1 month', label: 'Tech support' },
];

const buildHighlights = [
  'Up to 6 core pages',
  'Custom web design',
  'Desktop + mobile design',
  'Built around your business',
  'Treatments and prices',
  'Gallery',
  'Reviews',
  'Team details',
  'Location and hours',
  'Contact routes',
  'Basic SEO',
  'Domain and SSL',
  'Launch support',
];

const discoverySteps = [
  {
    number: '01',
    title: 'Instagram',
    copy: 'They see your work.',
  },
  {
    number: '02',
    title: 'Google',
    copy: 'They search your business.',
  },
  {
    number: '03',
    title: 'Your website',
    copy: 'They check your work, treatments and prices.',
  },
  {
    number: '04',
    title: 'Booking',
    copy: 'They book.',
  },
];

const backendScreenshots = [
  {
    src: '/projects/atelier-union/backend/kgd-services.webp',
    alt: 'Read-only KGD Services area showing treatments, prices and timings',
    label: 'Services',
  },
  {
    src: '/projects/atelier-union/backend/kgd-lookbook.webp',
    alt: 'Read-only KGD Lookbook area showing published salon work',
    label: 'Lookbook',
  },
  {
    src: '/projects/atelier-union/backend/kgd-website.webp',
    alt: 'Read-only KGD Website area showing salon details and opening hours',
    label: 'Website',
  },
  {
    src: '/projects/atelier-union/backend/kgd-analytics.webp',
    alt: 'Read-only KGD Analytics area showing illustrative business activity',
    label: 'Analytics',
  },
];

const backendFeatures = [
  { title: 'Bookings', copy: 'Connected booking system' },
  { title: 'Services', copy: 'Manage treatments, prices and timings' },
  { title: 'Website', copy: 'Update salon details and content' },
  { title: 'Insights', copy: 'See bookings and business activity' },
];

function cleanPath(path: string) {
  return path.replace(/\/$/, '') || '/';
}

function Eyebrow({ children }: { children: string }) {
  return <p className="eyebrow">{children}</p>;
}

function SectionHeader({
  label,
  title,
  copy,
}: {
  label: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="section-header">
      <Eyebrow>{label}</Eyebrow>
      <div>
        <h2>{title}</h2>
        {copy ? <p>{copy}</p> : null}
      </div>
    </div>
  );
}

function CtaRow({ invert = false }: { invert?: boolean }) {
  return (
    <div className="cta-row">
      <Link className={`button ${invert ? 'light' : 'primary'}`} href="/start">
        {siteConfig.primaryCta}
        <span aria-hidden="true">-&gt;</span>
      </Link>
      <Link
        className={`button ${invert ? 'outline-light' : 'secondary'}`}
        href="/work"
      >
        {siteConfig.secondaryCta}
      </Link>
    </div>
  );
}

function ExternalProjectLink({
  className = 'button primary',
}: {
  className?: string;
}) {
  return (
    <a
      className={className}
      href={atelierUnionProject.liveUrl}
      target="_blank"
      rel="noreferrer"
    >
      View live website
      <span aria-hidden="true">-&gt;</span>
    </a>
  );
}

function Wordmark() {
  return (
    <Link className="wordmark" href="/" aria-label={`${siteConfig.name} home`}>
      <span>Kiera</span>
      <span>Gordon</span>
      <span>Digital</span>
    </Link>
  );
}

function Header({ path }: { path: string }) {
  return (
    <header className="site-header">
      <Wordmark />
      <nav className="desktop-nav" aria-label="Main navigation">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={path === link.href ? 'page' : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Link className="header-cta" href="/start">
        Start
      </Link>
      <details className="mobile-menu">
        <summary aria-label="Open menu">Menu</summary>
        <nav aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link className="button primary" href="/start">
            {siteConfig.primaryCta}
          </Link>
        </nav>
      </details>
    </header>
  );
}

function Footer() {
  const footerLinks = [
    ...navLinks,
    { href: '/start', label: 'Start' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
  ];

  return (
    <footer className="site-footer">
      <nav className="footer-nav" aria-label="Footer navigation">
        {footerLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="footer-bottom">
        <div className="footer-brand-text">
          <strong>{siteConfig.name}</strong>
          <p>{siteConfig.footerStatement}</p>
        </div>
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </div>
    </footer>
  );
}

function Hero() {
  return (
    <main className="hero" id="main-content">
      <div className="hero-copy">
        <Eyebrow>Websites for independent beauty businesses</Eyebrow>
        <h1>
          <span>Your business looks</span>
          <span>brilliant in person.</span>
          <span>Your website</span>
          <span>should too.</span>
        </h1>
        <p>
          Complete custom websites for independent beauty businesses, with one
          clear introductory launch price.
        </p>
        <CtaRow />
      </div>
      <div className="hero-system" aria-label="Launch offer facts">
        {offerFacts.map((fact) => (
          <article key={fact.label} className="metric-panel">
            <strong>{fact.value}</strong>
            <span>{fact.label}</span>
          </article>
        ))}
      </div>
    </main>
  );
}

function DiscoverySection() {
  return (
    <section className="discovery-section">
      <SectionHeader
        label="How clients find you"
        title="How clients find you."
        copy="Your website connects interest with booking."
      />
      <div className="discovery-grid">
        {discoverySteps.map((step) => (
          <article key={step.number}>
            <span>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectImage({
  screenshot,
  className = '',
  loading = 'eager',
}: {
  screenshot: (typeof atelierScreenshots)[number];
  className?: string;
  loading?: 'eager' | 'lazy';
}) {
  return (
    <figure className={`project-image ${className}`}>
      <img src={screenshot.src} alt={screenshot.alt} loading={loading} />
      <figcaption>{screenshot.label}</figcaption>
    </figure>
  );
}

function BrowserPreview({
  screenshot,
}: {
  screenshot: (typeof atelierScreenshots)[number];
}) {
  return (
    <a
      className="browser-preview"
      href={atelierUnionProject.liveUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="View live Atelier Union website"
    >
      <span className="browser-bar" aria-hidden="true">
        <span className="browser-controls">
          <span />
          <span />
          <span />
        </span>
        <span className="browser-url">atelier-union.onrender.com</span>
      </span>
      <img src={screenshot.src} alt={screenshot.alt} loading="eager" />
    </a>
  );
}

function BackendScreenshot({
  screenshot,
  className = '',
}: {
  screenshot: (typeof backendScreenshots)[number];
  className?: string;
}) {
  return (
    <figure className={`backend-screenshot ${className}`}>
      <img src={screenshot.src} alt={screenshot.alt} loading="lazy" />
      <figcaption>{screenshot.label}</figcaption>
    </figure>
  );
}

function BackendShowcase({ context }: { context: 'home' | 'case-study' }) {
  const onHome = context === 'home';

  return (
    <section
      className={`backend-showcase ${onHome ? 'backend-showcase-home' : 'kgd-backend-section'}`}
      id={onHome ? undefined : 'kgd-backend'}
    >
      <SectionHeader
        label="KGD MANAGED"
        title={
          onHome
            ? 'Your website. Booking system. Owner dashboard.'
            : 'The website is only half the system.'
        }
        copy={
          onHome
            ? 'Run bookings, services, team, website content and business insights from one connected system.'
            : 'The public website can connect to a private owner area for bookings, services, team, website content and business insights.'
        }
      />
      <div className="backend-editorial-grid">
        <BackendScreenshot
          screenshot={backendScreenshots[0]}
          className="backend-screenshot-dominant"
        />
        <div className="backend-editorial-aside">
          <BackendScreenshot screenshot={backendScreenshots[3]} />
          <div className="backend-feature-grid">
            {backendFeatures.map((feature) => (
              <article key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
              </article>
            ))}
          </div>
        </div>
        <BackendScreenshot
          screenshot={backendScreenshots[1]}
          className="backend-screenshot-lookbook"
        />
        <BackendScreenshot
          screenshot={backendScreenshots[2]}
          className="backend-screenshot-website"
        />
      </div>
      <div className="backend-demo-row">
        <p>Read-only demo using illustrative Atelier Union data.</p>
        <div className="backend-actions">
          <a
            className="button primary"
            href="https://atelier-union.onrender.com/KGD"
            target="_blank"
            rel="noopener noreferrer"
          >
            {onHome ? 'Preview the owner dashboard' : 'Preview owner dashboard'}
            <span aria-hidden="true">&rarr;</span>
          </a>
          {onHome ? (
            <Link
              className="backend-case-link"
              href="/work/atelier-union#kgd-backend"
            >
              See the full Atelier Union case study
              <span aria-hidden="true">&rarr;</span>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function FeaturedWorkSection() {
  return (
    <section className="featured-work">
      <div className="featured-copy">
        <SectionHeader
          label="Selected work"
          title="Atelier Union"
          copy={atelierUnionProject.shortTransparency}
        />
        <dl className="project-meta">
          <div>
            <dt>Project</dt>
            <dd>{atelierUnionProject.category}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{atelierUnionProject.location}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{atelierUnionProject.label}</dd>
          </div>
        </dl>
        <div className="project-actions">
          <ExternalProjectLink className="button primary featured-live-button" />
          <Link
            className="button outline-light quiet-case-link"
            href="/work/atelier-union"
          >
            Read case study
          </Link>
        </div>
      </div>
      <div className="project-layout">
        <BrowserPreview screenshot={atelierScreenshots[0]} />
      </div>
    </section>
  );
}

function WhatYouGetSection() {
  return (
    <section className="section-pad">
      <SectionHeader
        label="What you get"
        title="A complete custom website, built around your business."
        copy="Custom web design for desktop and mobile, designed around your business, style, services and customers."
      />
      <div className="deliverables-grid">
        {buildHighlights.map((item, index) => (
          <article key={item}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{item}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="process-section">
      <SectionHeader
        label="Process"
        title="Five steps from enquiry to launch."
        copy="Send the details, confirm the project, review the website, then launch."
      />
      <div className="process-list">
        {processSteps.map((step) => (
          <article key={step.step}>
            <span>{step.step}</span>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PricingSection({ showLink = true }: { showLink?: boolean }) {
  return (
    <section className="pricing-section">
      <div className="price-lockup">
        <Eyebrow>{siteConfig.offerLabel}</Eyebrow>
        <strong>{siteConfig.launchPrice}</strong>
        <span>One-off website build</span>
        <p>{siteConfig.offerNote}</p>
      </div>
      <div className="price-copy">
        <h2>A complete custom website for your beauty business.</h2>
        <p>
          Built around your business, content, style, services, customers and
          booking route, with two revision rounds and one month of technical
          support after launch included.
        </p>
        <div className="inclusion-list">
          {packageInclusions.slice(0, 10).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        {showLink ? (
          <Link className="button primary" href="/pricing">
            View pricing
          </Link>
        ) : null}
      </div>
    </section>
  );
}

function OptionsSection() {
  return (
    <section className="section-pad options-section">
      <SectionHeader
        label="After launch"
        title="Choose how the site is run."
        copy="KGD Managed is optional. You can use your own hosting and existing booking provider instead."
      />
      <div className="option-grid">
        {operatingOptions.map((option) => (
          <article key={option.name}>
            <div>
              <h3>{option.name}</h3>
              <strong>{option.price}</strong>
              <p>{option.summary}</p>
            </div>
            <ul>
              {option.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {option.name === 'KGD Managed' ? (
              <Link
                className="managed-demo-link"
                href="/work/atelier-union#kgd-backend"
              >
                See the KGD backend in action →
              </Link>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function OwnershipSection() {
  return (
    <section className="ownership-section">
      <h2>
        Your website.
        <br />
        Your domain.
        <br />
        Your business.
      </h2>
      <div className="ownership-list">
        {ownershipItems.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </section>
  );
}

function FounderPanel() {
  if (siteConfig.founderImage) {
    return (
      <figure className="founder-photo">
        <img
          src={siteConfig.founderImage}
          alt="Kiera Gordon, founder of Kiera Gordon Digital"
        />
        <figcaption>{siteConfig.founderName}</figcaption>
      </figure>
    );
  }

  return (
    <aside className="founder-note">
      <Eyebrow>Founder-led</Eyebrow>
      <p>
        Kiera Gordon Digital is run directly by Kiera, so the website build
        stays practical and close to the business details you send.
      </p>
    </aside>
  );
}

function AboutSection() {
  return (
    <section className="about-section">
      <div>
        <SectionHeader
          label="About"
          title="Independent web design for beauty businesses."
          copy="Kiera Gordon Digital designs custom websites for independent salons and beauty businesses."
        />
        <p>
          The work is handled directly by Kiera, from enquiry to launch.
        </p>
      </div>
      <FounderPanel />
    </section>
  );
}

function FAQSection({ limit }: { limit?: number }) {
  const visibleFaqs = limit ? faqs.slice(0, limit) : faqs;

  return (
    <section className="faq-section">
      <div className="faq-layout">
        <Eyebrow>FAQ</Eyebrow>
        <div className="faq-content">
          <h2>Straight answers before you send anything.</h2>
          <div className="faq-list">
            {visibleFaqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
          {limit ? (
            <Link className="button secondary" href="/faq">
              Read all FAQ
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta">
      <h2>
        Your business already looks good.
        <br />
        Make sure your website does too.
      </h2>
      <CtaRow invert />
      <p>{siteConfig.finalMicrocopy}</p>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <DiscoverySection />
      <FeaturedWorkSection />
      <BackendShowcase context="home" />
      <WhatYouGetSection />
      <ProcessSection />
      <PricingSection />
      <OptionsSection />
      <OwnershipSection />
      <AboutSection />
      <FAQSection limit={7} />
      <FinalCTA />
    </>
  );
}

function PageHero({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <main className="page-hero" id="main-content">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p>{copy}</p>
    </main>
  );
}

function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Selected work"
        copy={atelierUnionProject.transparency}
      />
      <section className="work-showcase">
        <div className="work-intro">
          <div>
            <h2>{atelierUnionProject.title}</h2>
            <p>{atelierUnionProject.shortTransparency}</p>
          </div>
          <dl className="project-meta light-meta">
            <div>
              <dt>Type</dt>
              <dd>{atelierUnionProject.category}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{atelierUnionProject.label}</dd>
            </div>
          </dl>
          <ExternalProjectLink />
        </div>
        <div className="gallery-grid work-collage">
          <ProjectImage screenshot={atelierScreenshots[0]} />
          <ProjectImage screenshot={atelierScreenshots[1]} className="phone-shot" />
          <ProjectImage screenshot={atelierScreenshots[2]} />
          <ProjectImage screenshot={atelierScreenshots[4]} />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

function ProjectPage() {
  return (
    <>
      <PageHero
        eyebrow="Case study"
        title="Atelier Union"
        copy={atelierUnionProject.transparency}
      />
      <section className="case-study">
        <ProjectImage screenshot={atelierScreenshots[0]} className="wide" />
        <div className="case-grid">
          <article>
            <Eyebrow>The brief</Eyebrow>
            <h2>{atelierUnionProject.brief}</h2>
          </article>
          <article>
            <Eyebrow>The result</Eyebrow>
            <p>{atelierUnionProject.result}</p>
            <ExternalProjectLink />
          </article>
        </div>
        <div className="case-grid">
          <article>
            <h2>The customer questions</h2>
            <ul>
              {atelierUnionProject.questions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </article>
          <article>
            <h2>The solution</h2>
            <ul>
              {atelierUnionProject.solution.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
        <div className="gallery-grid">
          {atelierScreenshots.slice(1).map((screenshot, index) => (
            <ProjectImage
              key={screenshot.src}
              screenshot={screenshot}
              className={index === 1 || index === 3 ? 'wide' : ''}
            />
          ))}
        </div>
        <BackendShowcase context="case-study" />
        <div className="principle-grid">
          {projectPrinciples.map((principle, index) => (
            <article key={principle.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{principle.title}</h3>
              <p>{principle.copy}</p>
            </article>
          ))}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={`${siteConfig.launchPrice} one-off website build.`}
        copy="An introductory launch price while Kiera Gordon Digital builds its portfolio of client websites."
      />
      <PricingSection showLink={false} />
      <section className="scope-section">
        <div>
          <h2>Included</h2>
          <div className="scope-list">
            {packageInclusions.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div>
          <h2>Not included by default</h2>
          <div className="scope-list muted">
            {notIncluded.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <p>
            Work outside the agreed scope can be discussed and quoted before it
            happens.
          </p>
        </div>
      </section>
      <OptionsSection />
      <section className="support-section">
        <div>
          <h2>First month support</h2>
          <p>
            Every £149 website includes 1 month of technical support after
            launch for issues attributable to the delivered website or setup.
          </p>
        </div>
        <div>
          <h2>KGD Managed support</h2>
          <p>
            KGD Managed clients receive ongoing managed technical support for
            the website, hosting, backend and platform while subscribed.
          </p>
          <div className="scope-list">
            {supportCovers.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="support-wide">
          <h2>Managed support does not include</h2>
          <div className="scope-list muted">
            {supportExcludes.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>
      <OwnershipSection />
      <FinalCTA />
    </>
  );
}

function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="From enquiry to launch."
        copy="The project starts with your business details and ends with a complete custom website."
      />
      <ProcessSection />
      <section className="checklist-section">
        <h2>What to send</h2>
        <div className="need-grid">
          {clientChecklist.map((item, index) => (
            <span key={item}>
              {String(index + 1).padStart(2, '0')} / {item}
            </span>
          ))}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Independent web design for beauty businesses."
        copy="Kiera Gordon Digital designs custom websites for independent salons and beauty businesses."
      />
      <AboutSection />
      <FinalCTA />
    </>
  );
}

function StartPage() {
  return (
    <>
      <PageHero
        eyebrow="Start your website"
        title="Send your details."
        copy="Tell Kiera what your business is and what kind of website help you need."
      />
      <section className="form-section">
        <div>
          <h2>Start with the details.</h2>
          <p>
            Kiera will review your enquiry and reply with the next steps for
            the £149 website build.
          </p>
          <ul>
            <li>Your name and business name</li>
            <li>Email address</li>
            <li>Current website, booking page or Instagram</li>
            <li>Business type and project need</li>
            <li>Optional message</li>
          </ul>
        </div>
        <StartForm />
      </section>
    </>
  );
}

function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions before you send your business."
        copy="Answers about the £149 website build, optional Managed plan, ownership, booking, hosting, revisions and support."
      />
      <FAQSection />
      <FinalCTA />
    </>
  );
}

function PrivacyPage() {
  return (
    <main className="legal-page" id="main-content">
      <Eyebrow>Privacy</Eyebrow>
      <h1>Privacy notice</h1>
      <p>
        Kiera Gordon Digital can be contacted at{' '}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> about this
        notice or the information it holds about you.
      </p>
      <p>
        When you send an enquiry, Kiera Gordon Digital may collect your name,
        business name, email address, website, booking page or Instagram if
        supplied, business type, project need and any optional message.
      </p>
      <p>
        This information is used to respond to enquiries, discuss projects and
        deliver agreed work. It is not sold. Service providers such as hosting
        and email infrastructure may process information where required to
        operate the service.
      </p>
      <p>
        Information is kept only for as long as reasonably necessary for the
        enquiry or project, or to meet applicable legal requirements.
      </p>
      <p>
        You can contact Kiera Gordon Digital about your information or data
        rights. You can also make a complaint to the Information Commissioner’s
        Office (ICO).
      </p>
    </main>
  );
}

function TermsPage() {
  return (
    <main className="legal-page" id="main-content">
      <Eyebrow>Terms</Eyebrow>
      <h1>Starter project terms</h1>
      <p>
        The {siteConfig.launchPrice} introductory website build covers a
        complete custom website for an independent beauty business within the
        scope described on the pricing page.
      </p>
      <p>
        The build includes up to 6 core pages, custom web design, desktop and
        mobile layouts, basic SEO foundations, 2 revision rounds, launch
        and 1 month of technical support for issues caused by the delivered
        setup.
      </p>
      <p>
        KGD Managed is optional at {siteConfig.managedPrice}. If you do not
        choose it, your website can connect to your existing booking provider
        and your own third-party hosting route.
      </p>
      <p>
        You own your website, domain, content, images and business data. The KGD
        platform, backend and owner area are licensed while subscribed to KGD
        Managed and are not sold outright.
      </p>
      <p>{siteConfig.legalNote}</p>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="page-hero" id="main-content">
      <Eyebrow>404</Eyebrow>
      <h1>This page is not part of the site.</h1>
      <p>Use the main navigation to return to the current website.</p>
      <Link className="button primary" href="/">
        Return home
      </Link>
    </main>
  );
}

function getPage(path: string) {
  switch (cleanPath(path)) {
    case '/':
      return <HomePage />;
    case '/work':
      return <WorkPage />;
    case '/work/atelier-union':
      return <ProjectPage />;
    case '/pricing':
      return <PricingPage />;
    case '/process':
      return <ProcessPage />;
    case '/about':
      return <AboutPage />;
    case '/start':
      return <StartPage />;
    case '/faq':
      return <FAQPage />;
    case '/privacy':
      return <PrivacyPage />;
    case '/terms':
      return <TermsPage />;
    default:
      return <NotFoundPage />;
  }
}

export default function SiteApp({ path }: { path: string }) {
  const currentPath = cleanPath(path);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header path={currentPath} />
      {getPage(currentPath)}
      <Footer />
      <span className="sr-only" aria-live="polite">
        {(routeMeta[currentPath]?.title || routeMeta['/404'].title).replace(
          ' | Kiera Gordon Digital',
          '',
        )}{' '}
        loaded.
      </span>
    </>
  );
}
