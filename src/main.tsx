import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import siteMeta from '../site-meta.json';
import SiteApp, { routeMeta } from './App';
import './styles/base.css';

function currentPath() {
  return window.location.pathname.replace(/\/$/, '') || '/';
}

function absoluteUrl(path: string) {
  return new URL(path, siteMeta.siteOrigin).toString();
}

function setMeta(selector: string, attribute: string, value: string) {
  document.querySelector(selector)?.setAttribute(attribute, value);
}

const path = currentPath();
const meta = routeMeta[path] || routeMeta['/404'];
const canonical = absoluteUrl(path === '/' ? '/' : path);
const image = absoluteUrl(siteMeta.ogImage);

document.title = meta.title;
setMeta('meta[name="description"]', 'content', meta.description);
setMeta('link[rel="canonical"]', 'href', canonical);
setMeta('meta[property="og:title"]', 'content', meta.title);
setMeta('meta[property="og:description"]', 'content', meta.description);
setMeta('meta[property="og:url"]', 'content', canonical);
setMeta('meta[property="og:image"]', 'content', image);
setMeta('meta[name="twitter:title"]', 'content', meta.title);
setMeta('meta[name="twitter:description"]', 'content', meta.description);
setMeta('meta[name="twitter:image"]', 'content', image);

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <SiteApp path={path} />
  </StrictMode>,
);
