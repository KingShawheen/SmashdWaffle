export default function Rewards() {
  return (
    <main style={{ backgroundColor: 'var(--sw-bg)', minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* Welcome Section */}
      <div style={{ padding: 'env(safe-area-inset-top, 3rem) 1rem 1rem', backgroundColor: 'var(--sw-surface)', borderBottom: '1px solid var(--sw-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Welcome Back, Alex!</h1>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#f3f4f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.2rem' }}>📱</span>
          </div>
        </div>
        
        {/* Progress Bar Container */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', position: 'relative' }}>
           {/* Waffle Bitten Icon */}
           <div style={{ 
             width: '45px', height: '45px', 
             backgroundColor: 'var(--sw-yellow)', 
             borderRadius: '50%', 
             position: 'absolute', left: 0, zIndex: 2, 
             display: 'flex', alignItems:'center', justifyContent:'center', 
             border: '2px solid #b45309',
             boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
           }}>
             <span style={{ fontSize: '1.5rem' }}>🧇</span>
           </div>

           {/* Track */}
           <div style={{ 
             flex: 1, height: '36px', 
             backgroundColor: '#374151', 
             borderRadius: '18px', 
             marginLeft: '22px',
             overflow: 'hidden', 
             display: 'flex' 
           }}>
             {/* Fill */}
             <div style={{ 
               width: '70%', 
               backgroundColor: 'var(--sw-yellow)', 
               borderRight: '2px solid #b45309',
               display: 'flex',
               gap: '4px'
             }}>
                {/* Simulated waffle grid marks */}
                <div style={{flex: 1, borderRight: '1px solid #b45309', opacity: 0.3}}></div>
                <div style={{flex: 1, borderRight: '1px solid #b45309', opacity: 0.3}}></div>
                <div style={{flex: 1, borderRight: '1px solid #b45309', opacity: 0.3}}></div>
                <div style={{flex: 1, borderRight: '1px solid #b45309', opacity: 0.3}}></div>
             </div>
           </div>
        </div>
        <p style={{ textAlign: 'right', fontSize: '0.85rem', fontWeight: 700, color: 'var(--sw-text)', marginTop: '0.5rem' }}>
          <span style={{color: '#b45309'}}>350/500</span> Waffle
        </p>
      </div>

      {/* Red Points Banner */}
      <div style={{ backgroundColor: 'var(--sw-red)', padding: '1rem', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--sw-yellow)', fontSize: '2rem', fontWeight: 900, margin: 0, letterSpacing: '0.5px' }}>850 Smash Points</h2>
      </div>

      {/* Available Rewards */}
      <div style={{ padding: '1.5rem 1rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>Available Rewards</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          
          <div style={{ backgroundColor: 'var(--sw-surface)', borderRadius: '16px', padding: '1rem 0.5rem', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.03)', border: '1px solid var(--sw-border)' }}>
            <div style={{ width: '48px', height: '48px', margin: '0 auto 0.75rem', backgroundColor: 'var(--sw-surface)', border: '2px solid #fef3c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>☕️</div>
            <p style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.2 }}>Free<br/>Coffee</p>
            <button style={{ backgroundColor: 'var(--sw-red)', color: 'white', fontSize: '0.8rem', fontWeight: 700, padding: '6px 16px', borderRadius: '50px', width: '90%' }}>Redeem</button>
          </div>

          <div style={{ backgroundColor: 'var(--sw-surface)', borderRadius: '16px', padding: '1rem 0.5rem', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.03)', border: '1px solid var(--sw-border)' }}>
            <div style={{ width: '48px', height: '48px', margin: '0 auto 0.75rem', backgroundColor: 'var(--sw-yellow)', border: '2px solid #b45309', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#b45309', fontWeight: 800 }}>$</div>
            <p style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.2 }}>$5 Off<br/>Order</p>
            <button style={{ backgroundColor: 'var(--sw-red)', color: 'white', fontSize: '0.8rem', fontWeight: 700, padding: '6px 16px', borderRadius: '50px', width: '90%' }}>Redeem</button>
          </div>

          <div style={{ backgroundColor: 'var(--sw-surface)', borderRadius: '16px', padding: '1rem 0.5rem', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.03)', border: '1px solid var(--sw-border)' }}>
            <div style={{ width: '48px', height: '48px', margin: '0 auto 0.75rem', backgroundColor: 'var(--sw-surface)', border: '2px solid #fef3c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🧇</div>
            <p style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.2 }}>Double<br/>Toppings</p>
            <button style={{ backgroundColor: 'var(--sw-red)', color: 'white', fontSize: '0.8rem', fontWeight: 700, padding: '6px 16px', borderRadius: '50px', width: '90%' }}>Redeem</button>
          </div>

        </div>
      </div>

      {/* Recent Activity */}
      <div style={{ padding: '0 1rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>Recent Activity</h3>
        <div style={{ borderBottom: '1px solid var(--sw-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--sw-text)', fontWeight: 500 }}>Earned 50 Points - Breakfast Order</p>
        </div>
        <div style={{ borderBottom: '1px solid var(--sw-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--sw-text)', fontWeight: 500 }}>Redeemed $5 Off</p>
        </div>
      </div>

      <div style={{ padding: '0 1rem' }}>
        <button style={{ width: '100%', backgroundColor: 'var(--sw-red)', color: 'white', fontSize: '1.1rem', fontWeight: 800, padding: '1rem', borderRadius: '12px', boxShadow: '0 4px 10px rgba(217,30,24,0.3)' }}>
          Refer a Friend & Get 100 Points!
        </button>
      </div>

    </main>
  );
}
