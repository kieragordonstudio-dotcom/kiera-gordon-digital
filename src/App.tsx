import { InternalLink as Link } from './components/common/InternalLink';
import { ConceptForm } from './components/forms/ConceptForm';
import { siteConfig } from './config/site';
import { faqs } from './data/faq';
import {
  atelierScreenshots,
  atelierUnionProject,
  projectPrinciples,
} from './data/portfolio';
import {
  notIncluded,
  ownershipItems,
  packageInclusions,
} from './data/pricing';
import { clientChecklist, journey, processSteps } from './data/process';

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/process', label: 'Process' },
  { href: '/about', label: 'About' },
];

export const routeMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Kiera Gordon Digital | Websites for independent beauty businesses',
    description:
      'Graphic, booking-ready websites for salons and independent beauty businesses. Introductory launch price £149.',
  },
  '/work': {
    title: 'Selected work | Kiera Gordon Digital',
    description:
      'Selected concept work from Kiera Gordon Digital, including the live Atelier Union nail salon website.',
  },
  '/work/atelier-union': {
    title: 'Atelier Union case study | Kiera Gordon Digital',
    description:
      'An honest self-initiated concept showing how brand, treatments, proof and booking can work together for a beauty business.',
  },
  '/pricing': {
    title: '£149 launch offer | Kiera Gordon Digital',
    description:
      'A focused launch offer for independent beauty business websites: one clear £149 price, no lock-in and no mandatory monthly contract.',
  },
  '/process': {
    title: 'Process | Kiera Gordon Digital',
    description:
      'A simple concept-first website process for salons and appointment-led beauty businesses.',
  },
  '/about': {
    title: 'About | Kiera Gordon Digital',
    description:
      'Kiera Gordon Digital is a small independent web-design studio focused on beauty businesses.',
  },
  '/concept': {
    title: 'Get your free concept | Kiera Gordon Digital',
    description:
      'Send your current website, booking page or Instagram and see a personalised homepage direction before paying anything.',
  },
  '/faq': {
    title: 'FAQ | Kiera Gordon Digital',
    description:
      'Answers about the £149 launch offer, ownership, booking systems, revisions, timings and launch support.',
  },
  '/privacy': {
    title: 'Privacy | Kiera Gordon Digital',
    description: 'Privacy information for Kiera Gordon Digital.',
  },
  '/terms': {
    title: 'Terms | Kiera Gordon Digital',
    description: 'Starter project terms for Kiera Gordon Digital.',
  },
};

const offerFacts = [
  { value: siteConfig.launchPrice, label: 'Launch price' },
  { value: siteConfig.turnaroundShort, label: 'Typical turnaround' },
  { value: siteConfig.ownershipLabel, label: 'Your website' },
  { value: siteConfig.freeConceptPrice, label: 'To see your concept' },
];

const trustItems = [
  `${siteConfig.launchPrice} launch price`,
  'See your concept first',
  'Full ownership',
  'No lock-in',
];

const whatYouGet = [
  'Mobile-first design',
  'Treatments & pricing',
  'Booking integration',
  'Work / gallery',
  'Reviews & trust',
  'Team',
  'Local SEO foundations',
  'Content polish',
  'Launch & domain connection',
];

const beautyNeeds = [
  'Work and gallery',
  'Treatment structure',
  'Clear prices',
  'Reviews and trust',
  'Team and artist context',
  'Location and hours',
  'Booking routes',
  'Strong mobile UX',
];

const builderDifferences = [
  'You do not spend evenings choosing layouts.',
  'You do not have to decide what pages need to exist.',
  'You do not have to fix mobile spacing yourself.',
  'You do not have to turn scattered content into a customer journey.',
];

function cleanPath(path: string) {
  return path.replace(/\/$/, '') || '/';
}

function Eyebrow({ children }: { children: string }) {
  return <p className="eyebrow">{children}</p>;
}

function SectionHeader({
  number,
  label,
  title,
  copy,
}: {
  number: string;
  label: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="section-header">
      <div className="section-marker">
        <span>{number}</span>
        <p>{label}</p>
      </div>
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
      <Link className={`button ${invert ? 'light' : 'primary'}`} href="/concept">
        {siteConfig.conceptCta}
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

function ExternalProjectLink({ className = 'button primary' }: { className?: string }) {
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
      <span>KIERA</span>
      <span>GORDON</span>
      <span>DIGITAL</span>
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
      <Link className="header-cta" href="/concept">
        Get your free concept
      </Link>
      <details className="mobile-menu">
        <summary aria-label="Open menu">Menu</summary>
        <nav aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href="/faq">FAQ</Link>
          <Link className="button primary" href="/concept">
            Get your free concept
          </Link>
        </nav>
      </details>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Wordmark />
        <p>{siteConfig.footerStatement}</p>
      </div>
      <nav aria-label="Footer navigation">
        {[...navLinks, { href: '/faq', label: 'FAQ' }, { href: '/concept', label: 'Concept' }].map(
          (link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ),
        )}
      </nav>
      <div className="footer-contact">
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
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
          Professional, booking-ready websites for beauty businesses, without
          agency prices or a complicated process.
        </p>
        <CtaRow />
        <p className="microcopy">{siteConfig.microcopy}</p>
      </div>
      <div className="hero-system" aria-label="Current launch offer facts">
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

function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Offer trust points">
      {trustItems.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </section>
  );
}

function InsightSection() {
  return (
    <section className="section-pad insight-section">
      <SectionHeader
        number="02"
        label="Insight"
        title="Your online presence should match the business you have built."
        copy="Beauty customers rarely move in a straight line. The website has to connect attention, intent, confidence and booking."
      />
      <div className="journey-grid">
        {journey.map((item, index) => (
          <article key={item}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{item}</h3>
            <p>
              {index === 0
                ? 'Attention starts with the work.'
                : index === 1
                  ? 'Search creates intent.'
                  : index === 2
                    ? 'The site builds confidence.'
                    : 'A clear route closes the gap.'}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectImage({
  screenshot,
  className = '',
}: {
  screenshot: (typeof atelierScreenshots)[number];
  className?: string;
}) {
  return (
    <figure className={`project-image ${className}`}>
      <img src={screenshot.src} alt={screenshot.alt} loading="lazy" />
      <figcaption>{screenshot.label}</figcaption>
    </figure>
  );
}

function FeaturedWorkSection() {
  return (
    <section className="featured-work">
      <div className="featured-copy">
        <SectionHeader
          number="03"
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
          <ExternalProjectLink />
          <Link className="button secondary" href="/work/atelier-union">
            Read case study
          </Link>
        </div>
      </div>
      <div className="project-reveal">
        <ProjectImage screenshot={atelierScreenshots[0]} className="wide" />
        <ProjectImage screenshot={atelierScreenshots[1]} className="phone-shot" />
        <ProjectImage screenshot={atelierScreenshots[2]} />
      </div>
    </section>
  );
}

function WhyBeautySection() {
  return (
    <section className="section-pad split-section">
      <SectionHeader
        number="04"
        label="Why beauty"
        title="Beauty websites need to follow how customers actually choose."
        copy={`Customers move from Instagram to Google to your website to ${siteConfig.bookingPlatforms.join(', ')} or the booking system you already use.`}
      />
      <div className="need-grid">
        {beautyNeeds.map((item, index) => (
          <span key={item}>
            {String(index + 1).padStart(2, '0')} / {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function WhatYouGetSection() {
  return (
    <section className="section-pad">
      <SectionHeader
        number="05"
        label="What you get"
        title="A complete launch website, not a template handover."
      />
      <div className="deliverables-grid">
        {whatYouGet.map((item, index) => (
          <article key={item}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{item}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

function ConceptSection() {
  return (
    <section className="concept-band">
      <div>
        <Eyebrow>Free concept</Eyebrow>
        <h2>See it before you commit to it.</h2>
      </div>
      <div>
        <p>
          Send your current website, booking page or social profile. We create a
          personalised homepage direction around your business. If you decide
          not to continue, you pay {siteConfig.freeConceptPrice}. If you want us
          to build the site, the current launch price is {siteConfig.launchPrice}.
        </p>
        <CtaRow invert />
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="process-section">
      <SectionHeader
        number="06"
        label="Process"
        title="Five steps. No forced call. No payment details to see the concept."
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

function PricingSection() {
  return (
    <section className="pricing-section">
      <div className="price-lockup">
        <Eyebrow>Launch offer</Eyebrow>
        <strong>{siteConfig.launchPrice}</strong>
        <span>One-off</span>
        <p>{siteConfig.offerNote}</p>
      </div>
      <div className="price-copy">
        <h2>A professionally designed website for your beauty business.</h2>
        <p>
          Built around your work, services and existing booking system, with one
          clear introductory price and no mandatory monthly contract.
        </p>
        <div className="inclusion-list">
          {packageInclusions.slice(0, 10).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <Link className="button primary" href="/pricing">
          View full scope
        </Link>
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

function AboutSection() {
  return (
    <section className="about-section">
      <div>
        <SectionHeader
          number="07"
          label="About"
          title="A small independent studio, focused first on beauty businesses."
          copy="Kiera Gordon Digital creates finished websites for appointment-led beauty businesses. The studio is intentionally small, practical and design-led."
        />
        <p>
          The aim is not to make every business look the same. The aim is to
          understand what makes each salon, stylist, therapist or studio feel
          credible in real life, then translate that into a clear digital
          experience.
        </p>
      </div>
      <figure className="founder-placeholder">
        <span>KGD</span>
        <figcaption>Founder image placeholder</figcaption>
      </figure>
    </section>
  );
}

function BuilderComparisonSection() {
  return (
    <section className="builder-section">
      <div>
        <Eyebrow>Builder vs finished result</Eyebrow>
        <h2>A website builder gives you the tools. We give you the finished website.</h2>
      </div>
      <div className="comparison-list">
        {builderDifferences.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </section>
  );
}

function FAQSection({ limit }: { limit?: number }) {
  const visibleFaqs = limit ? faqs.slice(0, limit) : faqs;

  return (
    <section className="faq-section">
      <SectionHeader
        number="08"
        label="FAQ"
        title="Straight answers before you send anything."
      />
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
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta">
      <h2>
        Your business already looks good.
        <br />
        Let’s make sure your website does too.
      </h2>
      <CtaRow invert />
      <p>{siteConfig.microcopy}</p>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <InsightSection />
      <FeaturedWorkSection />
      <WhyBeautySection />
      <WhatYouGetSection />
      <ConceptSection />
      <ProcessSection />
      <PricingSection />
      <OwnershipSection />
      <AboutSection />
      <BuilderComparisonSection />
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
        eyebrow="01 / Selected work"
        title="One honest concept, shown properly."
        copy={atelierUnionProject.transparency}
      />
      <section className="work-showcase">
        <div className="work-intro">
          <h2>{atelierUnionProject.title}</h2>
          <p>{atelierUnionProject.shortTransparency}</p>
          <ExternalProjectLink />
        </div>
        <div className="gallery-grid">
          {atelierScreenshots.map((screenshot, index) => (
            <ProjectImage
              key={screenshot.src}
              screenshot={screenshot}
              className={index === 0 || index === 3 ? 'wide' : ''}
            />
          ))}
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
        eyebrow="Case study / self-initiated concept"
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
              className={index === 2 ? 'wide' : ''}
            />
          ))}
        </div>
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
        title={`${siteConfig.launchPrice} launch offer. One clear scope.`}
        copy="The launch offer is intentionally focused: enough to create a strong, professional beauty website without drifting into a large custom project."
      />
      <PricingSection />
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
            If something is outside scope, it can be discussed separately before
            any additional work happens.
          </p>
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
        title="Concept first. Then a focused build."
        copy="The process is built to remove risk before the project starts and keep the build controlled once it does."
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
      <ConceptSection />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A design studio, not another beauty brand."
        copy="Kiera Gordon Digital is focused on helping independent beauty businesses look as credible online as they do in person."
      />
      <AboutSection />
      <WhyBeautySection />
      <BuilderComparisonSection />
      <FinalCTA />
    </>
  );
}

function ConceptRequestPage() {
  return (
    <>
      <PageHero
        eyebrow="Free concept"
        title="See what your business could look like."
        copy="Send the basics. No payment details, no forced call and no obligation to continue."
      />
      <section className="form-section">
        <div>
          <h2>Minimum information. Maximum usefulness.</h2>
          <p>
            The free concept is a homepage direction, not a full website build.
            It is designed to show how your business could be presented before
            you decide whether to continue.
          </p>
          <ul>
            <li>Current website, booking page or Instagram</li>
            <li>Business name and contact email</li>
            <li>Optional note if there is something specific to consider</li>
          </ul>
        </div>
        <ConceptForm />
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
        copy="Straight answers about the launch price, scope, ownership, booking systems and what happens after launch."
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
        Kiera Gordon Digital only asks for the information needed to respond to
        enquiries and deliver website projects, such as your name, business
        details, email address and project information.
      </p>
      <p>
        Enquiry information is used to reply to you and discuss your project. It
        is not sold. If a form provider, email service or hosting provider is
        used, information may pass through that service as part of normal
        website operation.
      </p>
      <p>{siteConfig.legalNote}</p>
    </main>
  );
}

function TermsPage() {
  return (
    <main className="legal-page" id="main-content">
      <Eyebrow>Terms</Eyebrow>
      <h1>Starter project terms</h1>
      <p>
        The {siteConfig.launchPrice} launch offer covers a focused website
        project for an independent beauty business within the scope described on
        the pricing page.
      </p>
      <p>
        Two revision rounds are included. Work outside the agreed scope is
        quoted before it happens. The finished website belongs to the customer
        once the project is complete and paid for.
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
    case '/concept':
      return <ConceptRequestPage />;
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
        {(routeMeta[currentPath]?.title || 'Page').replace(
          ' | Kiera Gordon Digital',
          '',
        )}{' '}
        loaded.
      </span>
    </>
  );
}
