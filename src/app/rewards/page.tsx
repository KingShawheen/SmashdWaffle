import Image from 'next/image';

export default function Rewards() {
  return (
    <main className="smash-waffle-container" style={{ paddingTop: '3rem' }}>
      <div className="sw-animate-fade-in">
        <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Smash'd Rewards</h1>
        <p style={{ textAlign: 'center', color: 'var(--sw-text-muted)', marginBottom: '3rem' }}>Earn points with every bite.</p>
        
        <div style={{ 
          background: 'linear-gradient(135deg, #111827 0%, #374151 100%)', 
          borderRadius: '24px', 
          padding: '2rem', 
          color: 'white',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'rgba(245, 174, 10, 0.2)', borderRadius: '50%', filter: 'blur(20px)' }}></div>
          <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '100px', height: '100px', background: 'rgba(245, 174, 10, 0.1)', borderRadius: '50%', filter: 'blur(15px)' }}></div>
          
          <h3 style={{ margin: 0, fontWeight: 500, opacity: 0.9, zIndex: 1 }}>Current Balance</h3>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', zIndex: 1 }}>
            <span style={{ fontSize: '4.5rem', fontWeight: 800, color: 'var(--sw-primary)' }}>450</span>
            <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>pts</span>
          </div>
          
          <div style={{ width: '100%', marginTop: '2rem', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
              <span>Gold Tier</span>
              <span>50 pts to Platinum</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ width: '90%', height: '100%', background: 'var(--sw-primary)', borderRadius: '99px' }}></div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontWeight: 800 }}>Available Rewards</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { pts: 100, reward: "Free Extra Shot or Flavor Pump" },
              { pts: 250, reward: "Free Coffee (Any Size)" },
              { pts: 500, reward: "Free Signature Waffle" }
            ].map((r, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '1.5rem', 
                background: 'var(--sw-surface)', 
                border: '1px solid var(--sw-border)', 
                borderRadius: '16px' 
              }}>
                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{r.reward}</div>
                <div style={{ background: 'var(--sw-primary)', color: '#000', fontWeight: 800, padding: '6px 14px', borderRadius: '99px', fontSize: '0.9rem' }}>
                  {r.pts} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
