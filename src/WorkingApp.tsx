export default function WorkingApp() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '40px'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
        🎉 কোয়ান্টাম কসমো স্কুল
      </h1>
      <p style={{ fontSize: '24px', marginBottom: '30px' }}>
        Quantum Cosmo School & College
      </p>
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '30px',
        borderRadius: '15px',
        maxWidth: '800px'
      }}>
        <h2 style={{ fontSize: '32px', marginBottom: '15px' }}>
          ১৯৯৯ সাল থেকে শিক্ষার আলো
        </h2>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          বান্দরবানের লামায় কোয়ান্টাম কসমো স্কুল ও কলেজের যাত্রা শুরু। 
          পার্বত্য বাংলাদেশের আদিবাসী ও বঞ্চিত শিশুদের শিক্ষা ও মানবিক বিকাশে নিবেদিত।
        </p>
        <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '20px', borderRadius: '10px', flex: 1 }}>
            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>25+ বছর</h3>
            <p>শিক্ষার মান বজায় রেখে</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '20px', borderRadius: '10px', flex: 1 }}>
            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>১০০০+</h3>
            <p>শিক্ষার্থীর স্বপ্ন পূরণ</p>
          </div>
        </div>
      </div>
    </div>
  );
}
