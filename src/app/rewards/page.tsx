"use client";

import { useState } from 'react';

export default function Rewards() {
  const [phone, setPhone] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;
    
    setIsSubmitting(true);
    // Simulate API call to Firebase/Authentication/Square
    setTimeout(() => {
      setIsSubmitting(false);
      setIsAuthenticated(true);
    }, 1000);
  };

  const formatPhone = (val: string) => {
    const cleaned = ('' + val).replace(/\D/g, '');
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return val;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  if (!isAuthenticated) {
    return (
      <main style={{ backgroundColor: 'var(--sw-bg)', minHeight: '100vh', padding: 'env(safe-area-inset-top, 3rem) 1.5rem 100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '80px', height: '80px', margin: '0 auto 1.5rem', backgroundColor: 'var(--sw-surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '2px solid var(--sw-border)' }}>
            📱
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--sw-navy)', marginBottom: '0.5rem', lineHeight: 1.1 }}>
            Join Smash'd Rewards
          </h1>
          <p style={{ color: 'var(--sw-text-muted)', fontSize: '1rem', lineHeight: 1.4 }}>
            Enter your phone number to track your points and earn free waffles today!
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--sw-text)' }}>Mobile Number</label>
            <input 
              type="tel" 
              value={phone}
              onChange={handlePhoneChange}
              placeholder="(555) 123-4567"
              maxLength={14}
              required
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '12px',
                border: '1px solid var(--sw-border)',
                backgroundColor: 'var(--sw-surface)',
                fontSize: '1.2rem',
                letterSpacing: '1px',
                outline: 'none',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
              }}
            />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting || phone.length < 10}
            style={{ 
              width: '100%', 
              backgroundColor: phone.length >= 10 ? 'var(--sw-red)' : '#ccc', 
              color: 'white', 
              fontSize: '1.1rem', 
              fontWeight: 800, 
              padding: '1rem', 
              borderRadius: '12px', 
              boxShadow: phone.length >= 10 ? '0 4px 14px rgba(220, 38, 38, 0.3)' : 'none',
              border: 'none',
              cursor: phone.length >= 10 ? 'pointer' : 'not-allowed',
              opacity: isSubmitting ? 0.7 : 1
            }}
          >
            {isSubmitting ? 'Verifying...' : 'Continue'}
          </button>
        </form>
      </main>
    );
  }

  // Dashboard View (Empty state for new user)
  return (
    <main style={{ backgroundColor: 'var(--sw-bg)', minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* Welcome Section */}
      <div style={{ padding: 'env(safe-area-inset-top, 3rem) 1rem 1rem', backgroundColor: 'var(--sw-surface)', borderBottom: '1px solid var(--sw-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <p style={{ fontSize: '0.8rem', color: 'var(--sw-text-muted)', fontWeight: 600, marginBottom: '0.2rem' }}>Welcome to Rewards,</p>
            <h1 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--sw-navy)' }}>{phone}</h1>
          </div>
          <button onClick={() => setIsAuthenticated(false)} style={{ fontSize: '0.8rem', color: 'var(--sw-red)', fontWeight: 700, background: 'none', border: 'none', textDecoration: 'underline' }}>Sign Out</button>
        </div>
        
        {/* Progress Bar Container - Empty State */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', position: 'relative' }}>
           <div style={{ 
             width: '45px', height: '45px', 
             backgroundColor: 'var(--sw-surface)', 
             borderRadius: '50%', 
             position: 'absolute', left: 0, zIndex: 2, 
             display: 'flex', alignItems:'center', justifyContent:'center', 
             border: '2px solid var(--sw-border)',
           }}>
             <span style={{ fontSize: '1.5rem', opacity: 0.5 }}>🧇</span>
           </div>

           <div style={{ 
             flex: 1, height: '36px', 
             backgroundColor: '#f3f4f6', 
             borderRadius: '18px', 
             marginLeft: '22px',
             overflow: 'hidden', 
             border: '1px solid var(--sw-border)',
           }}>
           </div>
        </div>
        <p style={{ textAlign: 'right', fontSize: '0.85rem', fontWeight: 700, color: 'var(--sw-text-muted)', marginTop: '0.5rem' }}>
          0/500 Waffle
        </p>
      </div>

      {/* Red Points Banner */}
      <div style={{ backgroundColor: 'var(--sw-red)', padding: '1rem', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--sw-yellow)', fontSize: '2rem', fontWeight: 900, margin: 0, letterSpacing: '0.5px' }}>0 Smash Points</h2>
      </div>

      {/* Available Rewards - Locked */}
      <div style={{ padding: '1.5rem 1rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>Available Rewards</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          
          <div style={{ backgroundColor: 'var(--sw-surface)', borderRadius: '16px', padding: '1rem 0.5rem', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.03)', border: '1px solid var(--sw-border)', opacity: 0.5 }}>
            <div style={{ width: '48px', height: '48px', margin: '0 auto 0.75rem', backgroundColor: 'var(--sw-surface)', border: '2px solid var(--sw-border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>☕️</div>
            <p style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.2 }}>Free<br/>Coffee</p>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--sw-text-muted)' }}>🔒 150 pts</div>
          </div>

          <div style={{ backgroundColor: 'var(--sw-surface)', borderRadius: '16px', padding: '1rem 0.5rem', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.03)', border: '1px solid var(--sw-border)', opacity: 0.5 }}>
            <div style={{ width: '48px', height: '48px', margin: '0 auto 0.75rem', backgroundColor: '#f3f4f6', border: '2px solid var(--sw-border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'var(--sw-text-muted)', fontWeight: 800 }}>$</div>
            <p style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.2 }}>$5 Off<br/>Order</p>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--sw-text-muted)' }}>🔒 300 pts</div>
          </div>

          <div style={{ backgroundColor: 'var(--sw-surface)', borderRadius: '16px', padding: '1rem 0.5rem', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.03)', border: '1px solid var(--sw-border)', opacity: 0.5 }}>
            <div style={{ width: '48px', height: '48px', margin: '0 auto 0.75rem', backgroundColor: 'var(--sw-surface)', border: '2px solid var(--sw-border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🧇</div>
            <p style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.2 }}>Free<br/>Waffle</p>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--sw-text-muted)' }}>🔒 500 pts</div>
          </div>

        </div>
      </div>

      {/* Empty Activity */}
      <div style={{ padding: '0 1rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>Recent Activity</h3>
        <div style={{ padding: '1rem', backgroundColor: 'var(--sw-surface)', borderRadius: '12px', border: '1px dashed var(--sw-border)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--sw-text-muted)', fontWeight: 500, margin: 0 }}>Place your first order to start earning points!</p>
        </div>
      </div>

    </main>
  );
}
