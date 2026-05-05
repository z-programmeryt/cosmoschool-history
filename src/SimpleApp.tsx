import React from 'react';

export default function SimpleApp() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '40px',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      fontSize: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ marginBottom: '20px' }}>🎉 React is Working!</h1>
      <p style={{ fontSize: '18px', textAlign: 'center' }}>
        কোয়ান্টাম কসমো স্কুল ও কলেজ<br />
        Quantum Cosmo School & College
      </p>
      <div style={{
        marginTop: '30px',
        padding: '20px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '10px',
        border: '2px solid rgba(255,255,255,0.3)'
      }}>
        <p>✅ React Components Loading</p>
        <p>✅ CSS Styling Working</p>
        <p>✅ Bengali Text Support</p>
      </div>
    </div>
  );
}
