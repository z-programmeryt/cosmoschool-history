import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('main.tsx loaded');

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    console.log('React app mounted successfully');
  } catch (error) {
    console.error('Error mounting React app:', error);
    rootElement.innerHTML = `
      <div style="background: #fee2e2; color: #991b1b; padding: 20px; border-radius: 8px; font-family: sans-serif; max-width: 600px; margin: 40px auto; border: 1px solid #fecaca;">
        <h1 style="font-size: 20px; margin-bottom: 10px;">Rendering Error</h1>
        <p>Something went wrong while loading the application.</p>
        <pre style="background: white; padding: 10px; border-radius: 4px; overflow: auto; font-size: 12px; margin-top: 10px;">${error instanceof Error ? error.message : String(error)}</pre>
      </div>
    `;
  }
} else {
  console.error('Root element not found');
  document.body.innerHTML = '<div style="padding: 20px; color: red;">Error: Root element not found (#root)</div>';
}
