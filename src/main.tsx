import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import SiteApp, { routeMeta } from './App';
import './styles/base.css';

function currentPath() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  return path;
}

const meta = routeMeta[currentPath()] || routeMeta['/'];
document.title = meta.title;
document
  .querySelector('meta[name="description"]')
  ?.setAttribute('content', meta.description);
document
  .querySelector('link[rel="canonical"]')
  ?.setAttribute('href', `https://kiera-gordon-digital.onrender.com${currentPath()}`);

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <SiteApp path={currentPath()} />
  </StrictMode>,
);
