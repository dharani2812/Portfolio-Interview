import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

// ─── Mobile scroll fix ────────────────────────────────────
// Framer Motion v12+ sets inline `touch-action: none` on every
// motion.* element that has whileHover / whileTap / etc.
// This blocks native touch-scrolling on mobile.
// The observer below watches the entire DOM and forces
// touch-action back to "pan-y" whenever Framer sets it.
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  const fixTouchAction = (node) => {
    if (node.nodeType === 1 && node.style.touchAction === 'none') {
      node.style.touchAction = 'pan-y';
    }
  };

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'attributes' && m.attributeName === 'style') {
        fixTouchAction(m.target);
      }
      if (m.type === 'childList') {
        m.addedNodes.forEach((n) => {
          if (n.nodeType === 1) {
            fixTouchAction(n);
            n.querySelectorAll?.('[style]').forEach(fixTouchAction);
          }
        });
      }
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['style'],
    childList: true,
    subtree: true,
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

