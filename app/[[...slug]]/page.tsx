import SiteApp from '../../src/App';

const routes = [
  [],
  ['work'],
  ['work', 'atelier-union'],
  ['pricing'],
  ['process'],
  ['about'],
  ['concept'],
  ['faq'],
  ['privacy'],
  ['terms'],
];

const titles: Record<string, string> = {
  '/': 'Kiera Gordon Digital | Websites for independent beauty businesses',
  '/work': 'Selected work | Kiera Gordon Digital',
  '/work/atelier-union': 'Atelier Union | Kiera Gordon Digital',
  '/pricing': 'Pricing | Kiera Gordon Digital',
  '/process': 'Process | Kiera Gordon Digital',
  '/about': 'About | Kiera Gordon Digital',
  '/concept': 'See what your business could look like | Kiera Gordon Digital',
  '/faq': 'FAQ | Kiera Gordon Digital',
  '/privacy': 'Privacy | Kiera Gordon Digital',
  '/terms': 'Terms | Kiera Gordon Digital',
};

const descriptions: Record<string, string> = {
  '/': 'Premium, booking-ready websites for salons and independent beauty businesses.',
  '/work': 'Selected work from Kiera Gordon Digital, including the Atelier Union concept project.',
  '/work/atelier-union': 'A transparent self-initiated concept showing how Kiera Gordon Digital approaches premium beauty websites.',
  '/pricing': 'A fixed £795 Premium Beauty Website package with an optional £19/month care plan.',
  '/process': 'A simple five-step website process built around concept-first, low-risk approval.',
  '/about': 'About Kiera Gordon Digital, a small independent web-design studio focused on beauty businesses.',
  '/concept': 'Request a free homepage concept for your salon or independent beauty business.',
  '/faq': 'Answers about pricing, ownership, booking systems, revisions, support and launch.',
  '/privacy': 'Starter privacy notice for Kiera Gordon Digital.',
  '/terms': 'Starter terms for Kiera Gordon Digital website projects.',
};

function pathFromSlug(slug: string[] = []) {
  return `/${slug.join('/')}`.replace(/\/$/, '') || '/';
}

export const dynamicParams = false;

export function generateStaticParams() {
  return routes.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  const path = pathFromSlug(slug);

  return {
    title: titles[path] || titles['/'],
    description: descriptions[path] || descriptions['/'],
    openGraph: {
      title: titles[path] || titles['/'],
      description: descriptions[path] || descriptions['/'],
      images: ['/og.png'],
    },
    twitter: {
      title: titles[path] || titles['/'],
      description: descriptions[path] || descriptions['/'],
      images: ['/og.png'],
    },
  };
}

export default async function SitePage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  const path = pathFromSlug(slug);

  return <SiteApp path={path} />;
}
