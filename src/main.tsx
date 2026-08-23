import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import SiteApp from './App';
import './styles/base.css';

function currentPath() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  return path;
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <SiteApp path={currentPath()} />
  </StrictMode>,
);
