import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('main.tsx loaded');

// Wait for DOM to be ready
function mountApp() {
  const root = document.getElementById('root');
  console.log('Root element:', root);
  
  if (root) {
    createRoot(root).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    console.log('React app mounted');
  } else {
    console.error('Root element not found, retrying...');
    setTimeout(mountApp, 100);
  }
}

// Try mounting immediately and also on DOM load
mountApp();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
}
