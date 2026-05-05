import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('main.tsx loaded');

// Simple direct mount
const root = document.getElementById('root');
console.log('Root element:', root);

if (root) {
  try {
    createRoot(root).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    console.log('React app mounted successfully');
  } catch (error) {
    console.error('Error mounting React app:', error);
    root.innerHTML = '<div style="background: red; color: white; padding: 20px;">React Error occurred</div>';
  }
} else {
  console.error('Root element not found');
  document.body.innerHTML = '<div style="background: red; color: white; padding: 20px;">Root element not found!</div>';
}
