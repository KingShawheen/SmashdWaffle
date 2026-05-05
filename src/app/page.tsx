import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ backgroundColor: 'var(--sw-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top White Section */}
      <div style={{ padding: '4rem 1rem 1.5rem', textAlign: 'center', backgroundColor: 'var(--sw-surface)', borderBottom: '1px solid var(--sw-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo.png" alt="Smash'd Waffle House Logo" style={{ width: '220px', height: 'auto', filter: 'drop-shadow(0 4px 15px rgba(0,0,0,0.15))' }} />
        </div>
        
        <Link href="/menu" style={{
          display: 'block',
          width: '90%',
          margin: '0 auto',
          backgroundColor: 'var(--sw-red)',
          color: 'white',
          fontWeight: 900,
          fontSize: '1.4rem',
          padding: '1rem',
          borderRadius: '50px',
          textAlign: 'center',
          boxShadow: '0 4px 14px rgba(220, 38, 38, 0.3)'
        }}>
          ORDER ONLINE
        </Link>
      </div>

      {/* Middle Content Section */}
      <div style={{ backgroundColor: 'var(--sw-bg)', flex: 1, padding: '2.5rem 1rem', textAlign: 'center' }}>
        <h2 style={{ 
          fontFamily: 'var(--font-sans)', 
          color: 'var(--sw-navy)', 
          fontSize: '2rem', 
          fontWeight: 900,
          lineHeight: 1.1, 
          marginBottom: '2rem' 
        }}>
          Home of our Original<br />
          <span style={{ color: 'var(--sw-red)' }}>SMASH BREAKFAST WAFFLE!</span>
        </h2>

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', padding: '0 0.5rem' }}>
          <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', height: '140px', backgroundColor: '#fff', position: 'relative', border: '1px solid var(--sw-border)', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
             <div style={{width:'100%', height:'100%', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', display:'flex', alignItems:'center', justifyContent:'center'}}>
               <span style={{fontSize: '3rem'}}>🧇</span>
             </div>
          </div>
          <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', height: '140px', backgroundColor: '#fff', position: 'relative', border: '1px solid var(--sw-border)', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
             <div style={{width:'100%', height:'100%', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', display:'flex', alignItems:'center', justifyContent:'center'}}>
               <span style={{fontSize: '3rem'}}>☕️</span>
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div style={{ backgroundColor: 'var(--sw-surface)', padding: '2rem 1rem', textAlign: 'center', paddingBottom: '100px', borderTop: '1px solid var(--sw-border)' }}>
        <p style={{ color: 'var(--sw-text-muted)', fontWeight: 600, fontSize: '0.85rem', lineHeight: 1.6 }}>
          847 S. MAIN ST. DEER PARK, WA<br />MON - SUN 8 AM - 1 PM
        </p>
      </div>
    </main>
  );
}
