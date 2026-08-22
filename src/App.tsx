import { InternalLink as Link } from './components/common/InternalLink';
import { ConceptForm } from './components/forms/ConceptForm';
import { siteConfig } from './config/site';
import { faqs } from './data/faq';
import { atelierUnionProject, projectPrinciples } from './data/portfolio';
import { carePlan, notIncluded, packageInclusions } from './data/pricing';
import { clientChecklist, journey, processSteps } from './data/process';

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/process', label: 'Process' },
  { href: '/about', label: 'About' },
];

const footerLinks = [
  ...navLinks,
  { href: '/faq', label: 'FAQ' },
  { href: '/concept', label: 'Request concept' },
];

const trustItems = [
  'Fixed £795 price',
  'See your concept first',
  'Full ownership',
  'No lock-in',
];

const whatYouGet = [
  {
    title: 'Mobile-first design',
    copy: 'Your business looks considered when someone finds you on their phone.',
  },
  {
    title: 'Treatments and pricing',
    copy: 'Customers understand what you offer before messaging to ask.',
  },
  {
    title: 'Existing booking integration',
    copy: 'Keep Fresha, Booksy, Treatwell or your current booking flow.',
  },
  {
    title: 'Work and gallery',
    copy: 'Your results do the selling.',
  },
  {
    title: 'Reviews and trust',
    copy: 'Give new customers confidence before they book.',
  },
  {
    title: 'Team',
    copy: 'Help customers choose the right stylist, artist or therapist.',
  },
  {
    title: 'Local search foundations',
    copy: 'Clear page structure and metadata help search engines understand your services and location.',
  },
  {
    title: 'Content polish',
    copy: 'We refine the information you already have into clear website copy.',
  },
  {
    title: 'Launch and domain connection',
    copy: 'We get the finished site online and connected.',
  },
];

const ownershipItems = [
  'Your domain stays in your name.',
  'You own the finished website.',
  'The £19 care plan is optional.',
  'No long-term website contract.',
  'No surprise fees for work outside scope. We quote it first.',
  'Two revision rounds are included.',
  '30 days of technical bug support after launch.',
];

const pageTitles: Record<string, string> = {
  '/': 'Home',
  '/work': 'Selected work',
  '/work/atelier-union': 'Atelier Union',
  '/pricing': 'Pricing',
  '/process': 'Process',
  '/about': 'About',
  '/concept': 'Concept request',
  '/faq': 'FAQ',
  '/privacy': 'Privacy',
  '/terms': 'Terms',
};

function Wordmark() {
  return (
    // Replace this typography-led wordmark with a real logo asset when supplied.
    <Link className="wordmark" href="/" aria-label={`${siteConfig.name} home`}>
      <span>KIERA GORDON</span>
      <small>DIGITAL</small>
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
        See your concept
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
            See your concept
          </Link>
        </nav>
      </details>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Wordmark />
        <p>{siteConfig.footerStatement}</p>
      </div>
      <nav aria-label="Footer navigation">
        {footerLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="footer-contact">
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        <div className="legal-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

function Eyebrow({ children }: { children: string }) {
  return <p className="eyebrow">{children}</p>;
}

function CtaPair({ dark = false }: { dark?: boolean }) {
  return (
    <>
      <div className="cta-row">
        <Link className={`button ${dark ? 'light' : 'primary'}`} href="/concept">
          {siteConfig.conceptCta}
        </Link>
        <Link className={`button ${dark ? 'dark-secondary' : 'secondary'}`} href="/work">
          {siteConfig.secondaryCta}
        </Link>
      </div>
      <p className={dark ? 'microcopy light-copy' : 'microcopy'}>
        {siteConfig.microcopy}
      </p>
    </>
  );
}

function BrowserMockup({
  label,
  title,
  mode = 'light',
}: {
  label: string;
  title: string;
  mode?: 'light' | 'dark' | 'accent';
}) {
  return (
    <figure className={`browser-frame mockup-${mode}`}>
      <div className="browser-bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="screen">
        <p>{label}</p>
        <h3>{title}</h3>
        <div className="screen-grid" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </figure>
  );
}

function PhoneMockup({ title = 'Treatments' }: { title?: string }) {
  return (
    <figure className="phone-frame">
      <div className="phone-screen">
        <p>Choose</p>
        <strong>{title}</strong>
        <span />
        <span />
        <span />
      </div>
    </figure>
  );
}

function HeroMockup() {
  return (
    <div className="hero-mockup" aria-label="Atelier Union website preview">
      <BrowserMockup
        label="ATELIER UNION"
        title="Nails shaped with restraint"
        mode="accent"
      />
      <PhoneMockup />
    </div>
  );
}

function JourneyStrip() {
  return (
    <ol className="journey-strip" aria-label="Beauty customer journey">
      {journey.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}

function FaqList({ limit }: { limit?: number }) {
  const items = typeof limit === 'number' ? faqs.slice(0, limit) : faqs;

  return (
    <div className="faq-list">
      {items.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

function HomePage() {
  return (
    <main>
      <section className="hero section-pad">
        <div className="hero-copy">
          <Eyebrow>Websites for independent beauty businesses</Eyebrow>
          <h1>
            Your business looks brilliant in person.
            <span>Your website should too.</span>
          </h1>
          <p className="hero-text">
            Premium, booking-ready websites for salons and independent beauty
            businesses without the cost, complexity or gamble of a traditional
            agency.
          </p>
          <CtaPair />
        </div>
        <HeroMockup />
      </section>

      <section className="trust-strip" aria-label="Project terms">
        {trustItems.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section className="section-pad insight-section">
        <div className="section-heading narrow">
          <h2>Your online presence should match the business you have built.</h2>
          <p>
            Your work can look exceptional on Instagram, your clients can love
            the salon, and your diary can be busy. When someone searches for
            you, your website is still part of the decision.
          </p>
        </div>
        <div className="type-sequence" aria-label="Customer journey insight">
          <p>Instagram gets attention.</p>
          <p>Google creates intent.</p>
          <p>Your website builds confidence.</p>
          <p>Booking closes the gap.</p>
        </div>
      </section>

      <section className="featured-project section-pad">
        <div className="feature-intro">
          <Eyebrow>Featured project</Eyebrow>
          <h2>{atelierUnionProject.title}</h2>
          <p className="project-subtitle">{atelierUnionProject.subtitle}</p>
          <p>{atelierUnionProject.shortTransparency}</p>
          <div className="cta-row">
            <Link className="button primary" href="/work/atelier-union">
              Explore the project
            </Link>
            <a className="button secondary" href={atelierUnionProject.liveUrl}>
              View live concept
            </a>
          </div>
        </div>
        <div className="project-showcase">
          <BrowserMockup label="Homepage" title="Considered first impression" />
          <BrowserMockup label="Treatments" title="Clear prices before booking" />
          <BrowserMockup label="Lookbook" title="Work-led decision making" />
          <PhoneMockup title="Book" />
        </div>
      </section>

      <section className="section-pad principles-section">
        <div className="section-heading">
          <h2>Design decisions with a reason behind them.</h2>
        </div>
        <div className="principle-list">
          {projectPrinciples.map((principle) => (
            <article key={principle.title}>
              <h3>{principle.title}</h3>
              <p>{principle.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad beauty-section">
        <div>
          <Eyebrow>Why beauty</Eyebrow>
          <h2>Beauty businesses need more than a five-page brochure site.</h2>
        </div>
        <div>
          <p>
            We build around the way beauty customers actually choose and book:
            work first, clear treatments, visible pricing, social proof, and a
            direct route into the booking system you already use.
          </p>
          <div className="platform-list" aria-label="Relevant beauty systems">
            <span>Fresha</span>
            <span>Treatwell</span>
            <span>Booksy</span>
            <span>Existing booking links</span>
            <span>Services</span>
            <span>Pricing</span>
            <span>Galleries</span>
            <span>Team profiles</span>
            <span>Reviews</span>
            <span>Local search</span>
          </div>
          <JourneyStrip />
        </div>
      </section>

      <section className="section-pad outcomes-section">
        <div className="section-heading">
          <h2>Everything your beauty business actually needs.</h2>
        </div>
        <div className="outcome-list">
          {whatYouGet.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="risk-section section-pad">
        <div className="risk-copy">
          <h2>See it before you commit to it.</h2>
          <p>
            Send us your current website, booking page or social profiles. We
            will create a personalised homepage direction around your existing
            business.
          </p>
        </div>
        <div className="risk-statements">
          <p>If you do not want to continue, you pay nothing.</p>
          <p>
            If you love the direction, we complete the website for the fixed
            {` ${siteConfig.price} `}price.
          </p>
          <CtaPair dark />
        </div>
      </section>

      <ProcessSection compact />

      <PricingSection compact />

      <CareSection />

      <OwnershipSection />

      <AboutSection compact />

      <section className="comparison-section section-pad">
        <div className="split-heading">
          <h2>
            A website builder gives you the tools.
            <span>We give you the finished website.</span>
          </h2>
        </div>
        <div>
          <p>
            Wix and Squarespace can both produce excellent websites. The
            difference is that you do not have to spend your evenings choosing
            layouts, writing pages, fixing mobile spacing, organising
            treatments or figuring out what should go where.
          </p>
          <div className="statement-pair">
            <p>You send us what already exists.</p>
            <p>We turn it into the finished result.</p>
          </div>
        </div>
      </section>

      <section className="section-pad faq-section">
        <div className="section-heading">
          <h2>Questions before you send your salon?</h2>
        </div>
        <FaqList limit={7} />
        <Link className="text-link" href="/faq">
          Read all FAQs
        </Link>
      </section>

      <FinalCta />
    </main>
  );
}

function ProcessSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`section-pad process-section ${compact ? 'compact' : ''}`}>
      <div className="section-heading">
        <Eyebrow>The process</Eyebrow>
        <h2>Simple on purpose.</h2>
        <p>
          Typical turnaround: {siteConfig.turnaround}. You do not need to write
          an essay before the work can begin.
        </p>
      </div>
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

function PricingSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`section-pad pricing-section ${compact ? 'compact' : ''}`}>
      <div className="pricing-main">
        <div>
          <h2>One clear price.</h2>
          <p>
            The core website offer is fixed and visible before you send a
            request. Additional work is quoted before it is undertaken.
          </p>
        </div>
        <article className="price-panel">
          <p>Premium Beauty Website</p>
          <strong>{siteConfig.price}</strong>
          <span>one-off</span>
          <Link className="button primary" href="/concept">
            {siteConfig.conceptCta}
          </Link>
        </article>
      </div>
      <div className="included-list">
        {packageInclusions.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
      <div className="payment-strip">
        <span>£397.50 after concept approval</span>
        <span>£397.50 once the finished site is approved for launch</span>
      </div>
    </section>
  );
}

function CareSection() {
  return (
    <section className="section-pad care-section">
      <div>
        <h2>Want us to keep an eye on it?</h2>
        <p>
          Website Care is optional. There is no minimum term and it can be
          cancelled any time.
        </p>
      </div>
      <article className="care-panel">
        <p>Website Care</p>
        <strong>{siteConfig.carePlanPrice}</strong>
        <ul>
          {carePlan.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="muted">
          Minor changes include things like a price update, opening-hours
          change, image replacement or short staff bio edit.
        </p>
      </article>
    </section>
  );
}

function OwnershipSection() {
  return (
    <section className="ownership-section section-pad">
      <div className="section-heading">
        <h2>Your website. Your domain. Your business.</h2>
      </div>
      <div className="ownership-grid">
        {ownershipItems.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </section>
  );
}

function AboutSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`about-section section-pad ${compact ? 'compact' : ''}`}>
      <div>
        <Eyebrow>About</Eyebrow>
        <h2>Kiera Gordon Digital</h2>
        <p>
          Kiera Gordon Digital is a small independent web-design studio focused
          on websites for beauty businesses. The aim is simple: make
          high-quality design easier to buy, easier to understand and much less
          risky than the traditional agency process.
        </p>
        <p>
          By specialising in appointment-led beauty businesses, the process can
          stay focused on what those customers actually need: treatments, work,
          trust, mobile usability and booking.
        </p>
      </div>
      {/* Replace with founder portrait. */}
      <div className="founder-panel" aria-label="Founder portrait area">
        <span>Kiera Gordon</span>
        <strong>Independent studio</strong>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="final-cta section-pad">
      <div>
        <h2>Curious what your business could look like?</h2>
        <p>
          Send us your current website, booking page or social profile and we
          will create a personalised homepage direction.
        </p>
        <CtaPair dark />
      </div>
    </section>
  );
}

function WorkPage() {
  return (
    <main>
      <section className="page-hero section-pad">
        <Eyebrow>Selected work</Eyebrow>
        <h1>Selected work.</h1>
        <p>
          At launch there is one project. More work will be added as real
          projects launch.
        </p>
      </section>
      <section className="featured-project section-pad page-feature">
        <div className="feature-intro">
          <p className="project-label">{atelierUnionProject.listingLabel}</p>
          <h2>{atelierUnionProject.title}</h2>
          <p>{atelierUnionProject.shortTransparency}</p>
          <div className="cta-row">
            <Link className="button primary" href="/work/atelier-union">
              Explore the project
            </Link>
            <a className="button secondary" href={atelierUnionProject.liveUrl}>
              View live concept
            </a>
          </div>
        </div>
        <div className="project-showcase">
          <BrowserMockup label="Atelier Union" title="Premium nail salon" />
          <PhoneMockup title="Lookbook" />
        </div>
      </section>
    </main>
  );
}

function ProjectPage() {
  return (
    <main>
      <section className="case-hero section-pad">
        <div>
          <Eyebrow>{atelierUnionProject.label}</Eyebrow>
          <h1>{atelierUnionProject.title}</h1>
          <p>{atelierUnionProject.category} · Self-initiated concept</p>
        </div>
        <p className="transparency">{atelierUnionProject.transparency}</p>
      </section>
      <section className="section-pad case-section">
        <div className="case-copy">
          <h2>The idea</h2>
          <p>{atelierUnionProject.description}</p>
        </div>
        <div className="case-copy">
          <h2>The challenge</h2>
          <p>
            Beauty customers need inspiration, trust, clear pricing and booking
            clarity without being overwhelmed by treatment terminology.
          </p>
        </div>
      </section>
      <section className="section-pad case-section">
        <div>
          <h2>The approach</h2>
          <ul className="lined-list">
            {atelierUnionProject.approach.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>The customer journey</h2>
          <JourneyStrip />
        </div>
      </section>
      <section className="section-pad case-screens">
        <div className="section-heading">
          <h2>Screens</h2>
        </div>
        <div className="screen-wall">
          {atelierUnionProject.screens.map((screen, index) => (
            <BrowserMockup
              key={screen}
              label={screen}
              title={index % 2 === 0 ? 'Clear visual direction' : 'Booking-ready structure'}
              mode={index % 3 === 0 ? 'accent' : 'light'}
            />
          ))}
        </div>
        <a className="button primary" href={atelierUnionProject.liveUrl}>
          View the live concept
        </a>
      </section>
    </main>
  );
}

function PricingPage() {
  return (
    <main>
      <section className="page-hero section-pad">
        <Eyebrow>Pricing</Eyebrow>
        <h1>One clear price.</h1>
        <p>
          The Premium Beauty Website is {siteConfig.price}. The optional care
          plan is {siteConfig.carePlanPrice}. No mandatory monthly plan.
        </p>
      </section>
      <PricingSection />
      <CareSection />
      <section className="section-pad exclusions-section">
        <div className="section-heading">
          <h2>What is not included.</h2>
          <p>
            These items are outside the core package and can be quoted
            separately where appropriate.
          </p>
        </div>
        <ul className="exclusion-grid">
          {notIncluded.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <FinalCta />
    </main>
  );
}

function ProcessPage() {
  return (
    <main>
      <section className="page-hero section-pad">
        <Eyebrow>Process</Eyebrow>
        <h1>Simple on purpose.</h1>
        <p>
          A focused process keeps the project clear from first concept to launch.
        </p>
      </section>
      <ProcessSection />
      <section className="section-pad checklist-section">
        <div className="section-heading">
          <h2>What to send.</h2>
          <p>
            You do not need to write an essay. Existing content is enough to
            start shaping the site.
          </p>
        </div>
        <ul className="checklist">
          {clientChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <FinalCta />
    </main>
  );
}

function AboutPage() {
  return (
    <main>
      <section className="page-hero section-pad">
        <Eyebrow>About</Eyebrow>
        <h1>Kiera Gordon Digital</h1>
        <p>
          A small independent web-design studio focused on websites for beauty
          businesses.
        </p>
      </section>
      <AboutSection />
      <OwnershipSection />
      <FinalCta />
    </main>
  );
}

function ConceptRequestPage() {
  return (
    <main>
      <section className="concept-page section-pad">
        <div className="concept-intro">
          <Eyebrow>Free homepage concept</Eyebrow>
          <h1>See what your business could look like.</h1>
          <p>
            Tell us where to find your business online. We will use what is
            already there to create a personalised homepage direction.
          </p>
          <div className="concept-assurances">
            <span>No call required.</span>
            <span>No payment details.</span>
            <span>No obligation to continue.</span>
          </div>
        </div>
        <ConceptForm />
      </section>
    </main>
  );
}

function FAQPage() {
  return (
    <main>
      <section className="page-hero section-pad">
        <Eyebrow>FAQ</Eyebrow>
        <h1>Clear answers before you send anything.</h1>
        <p>
          Practical details about payment, ownership, booking systems, revisions
          and what happens after launch.
        </p>
      </section>
      <section className="section-pad faq-section">
        <FaqList />
      </section>
      <FinalCta />
    </main>
  );
}

function PrivacyPage() {
  return (
    <main className="legal-page section-pad">
      <Eyebrow>Privacy</Eyebrow>
      <h1>Privacy notice.</h1>
      <p>
        This starter privacy page explains the information collected by the
        concept request form. It is practical launch copy, not bespoke legal
        advice.
      </p>
      <h2>Information collected</h2>
      <p>
        The concept form may collect your name, email address, business name,
        website or social profile URL, and the message you choose to send.
      </p>
      <h2>How it is used</h2>
      <p>
        The information is used to understand your business, reply to your
        request and prepare a homepage direction if the form is connected to a
        real endpoint.
      </p>
      <h2>Cookies and analytics</h2>
      <p>
        This starter site does not add non-essential analytics cookies or a
        cookie banner.
      </p>
      <h2>Contact</h2>
      <p>
        Questions can be sent to <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </main>
  );
}

function TermsPage() {
  return (
    <main className="legal-page section-pad">
      <Eyebrow>Terms</Eyebrow>
      <h1>Starter terms.</h1>
      <p>
        These terms are a plain-English starting point and are not legal advice.
        They should be reviewed before the website is used with paying clients.
      </p>
      <h2>Concept first</h2>
      <p>
        A personalised homepage concept is created before payment. If the
        customer does not want to proceed, they do not pay.
      </p>
      <h2>Payment</h2>
      <p>
        If the concept is approved, 50% is paid as a deposit and 50% is paid
        once the completed website is approved for launch.
      </p>
      <h2>Scope</h2>
      <p>
        The package includes the stated website work and two consolidated
        revision rounds. Additional work is quoted before it is undertaken.
      </p>
      <h2>Ownership</h2>
      <p>
        The customer should own their domain in their own account. The finished
        website belongs to the customer once the project is paid in full.
      </p>
      <h2>Support</h2>
      <p>
        30 days of technical bug support are included after launch. Website Care
        is optional and has no minimum term.
      </p>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="page-hero section-pad">
      <Eyebrow>Page not found</Eyebrow>
      <h1>This page is not part of the site.</h1>
      <p>Use the main navigation to return to the current website.</p>
      <Link className="button primary" href="/">
        Return home
      </Link>
    </main>
  );
}

function getPage(path: string) {
  switch (path) {
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
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header path={path} />
      <div id="main-content">{getPage(path)}</div>
      <Footer />
      <span className="sr-only" aria-live="polite">
        {pageTitles[path] || 'Page'} loaded.
      </span>
    </>
  );
}
