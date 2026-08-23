import { siteConfig } from '../config/site';

export const atelierScreenshots = [
  {
    label: 'Homepage desktop',
    src: '/projects/atelier-union/home-desktop.png',
    alt: 'Atelier Union homepage desktop screenshot showing warm editorial nail salon design.',
  },
  {
    label: 'Homepage mobile',
    src: '/projects/atelier-union/home-mobile.png',
    alt: 'Atelier Union mobile homepage screenshot.',
  },
  {
    label: 'Treatments',
    src: '/projects/atelier-union/treatments-desktop.png',
    alt: 'Atelier Union treatments page screenshot with service categories, prices and durations.',
  },
  {
    label: 'Lookbook',
    src: '/projects/atelier-union/lookbook-desktop.png',
    alt: 'Atelier Union Lookbook screenshot showing nail inspiration imagery and filters.',
  },
  {
    label: 'Selected Lookbook state',
    src: '/projects/atelier-union/lookbook-selected-oxblood.png',
    alt: 'Atelier Union Lookbook selected oxblood nail inspiration state.',
  },
  {
    label: 'Booking flow',
    src: '/projects/atelier-union/booking-flow-desktop.png',
    alt: 'Atelier Union desktop booking flow screenshot with selected treatment context.',
  },
  {
    label: 'Mobile booking',
    src: '/projects/atelier-union/booking-mobile.png',
    alt: 'Atelier Union mobile booking experience screenshot.',
  },
];

export const atelierUnionProject = {
  title: 'Atelier Union',
  slug: 'atelier-union',
  number: '01',
  category: 'Nail salon concept',
  location: 'Aberdeen',
  label: 'Self-initiated concept project',
  listingLabel: 'Selected work',
  subtitle: 'Nail salon concept · Aberdeen',
  liveUrl: siteConfig.atelierUnionLiveUrl,
  transparency:
    'Atelier Union is a self-initiated concept project. It is not a paying salon client and no performance results are claimed.',
  shortTransparency:
    'A self-initiated concept showing how a nail salon website can combine brand, treatments, trust, inspiration and booking without making the customer work.',
  description:
    'A premium nail salon experience that feels desirable while remaining extremely easy to understand and book.',
  brief:
    'Design a premium nail salon experience that feels desirable while remaining extremely easy to understand and book.',
  result:
    'A polished concept showing what an independent beauty business can look like when brand and customer journey are designed together.',
  questions: [
    'Can I see the work?',
    'What should I book?',
    'How much is it?',
    'How long does it take?',
    'Who should I book with?',
    'When can I get in?',
  ],
  solution: [
    'Clear treatment navigation',
    'Pricing and duration visibility',
    'Treatment finder',
    'Lookbook-to-booking journey',
    'Artist selection',
    'Trust and hygiene messaging',
    'Responsive booking flow',
  ],
  proves: [
    'Design quality',
    'Customer-journey thinking',
    'Booking UX',
    'Mobile quality',
    'Beauty-industry understanding',
    'Technical execution',
  ],
};

export const projectPrinciples = [
  {
    title: 'Treatments before terminology',
    copy: 'Customers can start with what they want instead of needing to understand salon-industry language.',
  },
  {
    title: 'Price before booking',
    copy: 'Prices and durations are visible early so customers understand the commitment before entering the booking flow.',
  },
  {
    title: 'Proof before promises',
    copy: 'Work, artist information and hygiene cues build confidence without fake luxury language.',
  },
  {
    title: 'Booking without friction',
    copy: 'The booking journey keeps treatment, price, artist and time clear throughout.',
  },
];
