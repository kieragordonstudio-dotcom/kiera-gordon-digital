import type { AnchorHTMLAttributes } from 'react';

type InternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export function InternalLink({ href, ...props }: InternalLinkProps) {
  return <a href={href} {...props} />;
}
