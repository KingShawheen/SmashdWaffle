import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ backgroundColor: 'var(--sw-navy)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navy Section */}
      <div style={{ padding: '4rem 1rem 1.5rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <img src="/assets/logo.png" alt="Smash'd Waffle House Logo" style={{ width: '220px', height: 'auto', filter: 'drop-shadow(0 4px 15px rgba(0,0,0,0.5))' }} />
        </div>
        
        <Link href="/menu" style={{
          display: 'block',
          width: '90%',
          margin: '0 auto',
          backgroundColor: 'var(--sw-yellow)',
          color: 'var(--sw-red)',
          fontWeight: 900,
          fontSize: '1.4rem',
          padding: '1rem',
          borderRadius: '50px',
          textAlign: 'center',
          boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
        }}>
          ORDER ONLINE
        </Link>
      </div>

      {/* Middle Red Section */}
      <div style={{ backgroundColor: 'var(--sw-red)', flex: 1, padding: '2rem 1rem', textAlign: 'center' }}>
        <h2 style={{ 
          fontFamily: 'var(--font-serif)', 
          color: 'white', 
          fontSize: '2.2rem', 
          lineHeight: 1.1, 
          marginBottom: '2rem' 
        }}>
          Home of our Original<br />SMASH BREAKFAST
        </h2>

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', padding: '0 0.5rem' }}>
          <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', height: '140px', backgroundColor: '#fff', position: 'relative' }}>
             {/* Use CSS gradient placeholder for the waffle image to match the mockup */}
             <div style={{width:'100%', height:'100%', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', display:'flex', alignItems:'center', justifyContent:'center'}}>
               <span style={{fontSize: '3rem'}}>🧇</span>
             </div>
          </div>
          <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', height: '140px', backgroundColor: '#fff', position: 'relative' }}>
             <div style={{width:'100%', height:'100%', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', display:'flex', alignItems:'center', justifyContent:'center'}}>
               <span style={{fontSize: '3rem'}}>🧇</span>
             </div>
          </div>
        </div>

        <h3 style={{ color: 'var(--sw-yellow)', fontSize: '1.8rem', fontWeight: 800 }}>Signature Waffles</h3>
      </div>

      {/* Bottom Navy Footer */}
      <div style={{ backgroundColor: 'var(--sw-navy)', padding: '2rem 1rem', textAlign: 'center', paddingBottom: '100px' }}>
        <p style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.6 }}>
          847 S. MAIN ST. DEER PARK, WA<br />MON - FRI 8 AM - 1 PM
        </p>
      </div>
    </main>
  );
}
