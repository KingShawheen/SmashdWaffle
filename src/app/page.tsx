import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ backgroundColor: 'var(--sw-bg)', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top White Section */}
      <div style={{ padding: '1.5rem 1rem 1rem', textAlign: 'center', backgroundColor: 'var(--sw-surface)', borderBottom: '1px solid var(--sw-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="sw-animate-float" src="/assets/logo.png" alt="Smash'd Waffle House Logo" style={{ width: '180px', height: 'auto', filter: 'drop-shadow(0 4px 15px rgba(0,0,0,0.1))' }} />
        </div>
        
        <Link href="/menu" style={{
          display: 'block',
          width: '90%',
          margin: '0 auto',
          backgroundColor: 'var(--sw-red)',
          color: 'white',
          fontWeight: 900,
          fontSize: '1.2rem',
          padding: '0.8rem',
          borderRadius: '50px',
          textAlign: 'center',
          boxShadow: '0 4px 14px rgba(220, 38, 38, 0.3)'
        }}>
          ORDER ONLINE
        </Link>
      </div>

      {/* Middle Content Section */}
      <div style={{ backgroundColor: 'var(--sw-bg)', flex: 1, padding: '1.5rem 1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 style={{ 
          fontFamily: 'var(--font-sans)', 
          color: 'var(--sw-navy)', 
          fontSize: '1.6rem', 
          fontWeight: 900,
          lineHeight: 1.1, 
          marginBottom: '1rem' 
        }}>
          Home of our Original<br />
          <span style={{ color: 'var(--sw-red)' }}>SMASH BREAKFAST WAFFLE!</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '0.5rem', padding: '0 0.5rem', marginBottom: '0.5rem', flex: 1, minHeight: '280px' }}>
          <div style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: '#fff', position: 'relative', border: '1px solid var(--sw-border)', boxShadow: '0 4px 10px rgba(0,0,0,0.03)', display: 'block' }}>
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src="/assets/food/breakfast_smash.png" alt="Smash Breakfast Waffle" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
             <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', backgroundColor: '#fff', position: 'relative', border: '1px solid var(--sw-border)', boxShadow: '0 4px 10px rgba(0,0,0,0.03)', display: 'block' }}>
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src="/assets/food/iced_macchiato.png" alt="Iced Macchiato" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
             </div>
             <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', backgroundColor: '#fff', position: 'relative', border: '1px solid var(--sw-border)', boxShadow: '0 4px 10px rgba(0,0,0,0.03)', display: 'block' }}>
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src="/assets/food/hot_latte.png" alt="Hot Latte" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div style={{ backgroundColor: 'var(--sw-surface)', padding: '1rem', textAlign: 'center', paddingBottom: '90px', borderTop: '1px solid var(--sw-border)' }}>
        <p style={{ color: 'var(--sw-text-muted)', fontWeight: 600, fontSize: '0.75rem', lineHeight: 1.4 }}>
          847 S. MAIN ST. DEER PARK, WA<br />MON - SUN 8 AM - 1 PM
        </p>
      </div>
    </main>
  );
}
