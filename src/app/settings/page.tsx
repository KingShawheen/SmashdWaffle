"use client";

import { useState } from 'react';
import { Bell, CircleHelp, ChevronRight, FileText, Phone } from 'lucide-react';

export default function Settings() {
  const [toast, setToast] = useState<string | null>(null);

  const handleAction = (action: string) => {
    if (action === 'contact') {
      window.location.href = 'mailto:hello@smashdwaffle.com';
      return;
    }
    setToast(`${action} will be available in the full release.`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <main style={{ backgroundColor: 'var(--sw-bg)', minHeight: '100vh', paddingBottom: '100px', position: 'relative' }}>
      
      {/* Top Header */}
      <div style={{ 
        display: 'flex', justifyContent: 'center', alignItems: 'center', 
        padding: '1rem', paddingTop: 'env(safe-area-inset-top, 3rem)', 
        backgroundColor: 'var(--sw-surface)', borderBottom: '1px solid var(--sw-border)'
      }}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Preferences</h1>
      </div>

      <div className="sw-animate-fade-in" style={{ padding: '1.5rem 1rem' }}>
        
        {/* Settings Groups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* App Settings */}
          <div>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--sw-text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>App Settings</h3>
            <div style={{ background: 'var(--sw-surface)', borderRadius: '16px', border: '1px solid var(--sw-border)', overflow: 'hidden' }}>
              <div onClick={() => handleAction('Notifications')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Bell size={20} color="var(--sw-navy)" />
                  <span style={{ fontWeight: 600 }}>Order Notifications</span>
                </div>
                <ChevronRight size={20} color="var(--sw-text-muted)" />
              </div>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--sw-text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Support & Legal</h3>
            <div style={{ background: 'var(--sw-surface)', borderRadius: '16px', border: '1px solid var(--sw-border)', overflow: 'hidden' }}>
              <div onClick={() => handleAction('contact')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--sw-border)', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Phone size={20} color="var(--sw-navy)" />
                  <span style={{ fontWeight: 600 }}>Contact the Kitchen</span>
                </div>
                <ChevronRight size={20} color="var(--sw-text-muted)" />
              </div>
              <div onClick={() => handleAction('Help Center')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--sw-border)', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CircleHelp size={20} color="var(--sw-navy)" />
                  <span style={{ fontWeight: 600 }}>Help Center & FAQ</span>
                </div>
                <ChevronRight size={20} color="var(--sw-text-muted)" />
              </div>
              <div onClick={() => handleAction('Privacy Policy')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FileText size={20} color="var(--sw-navy)" />
                  <span style={{ fontWeight: 600 }}>Terms & Privacy Policy</span>
                </div>
                <ChevronRight size={20} color="var(--sw-text-muted)" />
              </div>
            </div>
          </div>

        </div>

        <p 
          style={{ textAlign: 'center', color: 'var(--sw-text-muted)', fontSize: '0.75rem', marginTop: '2.5rem', userSelect: 'none' }}
        >
          Smash'd Waffle House<br/>
          App Version 1.0.0 (Deer Park)
        </p>

      </div>

      {/* Toast Notification */}
      <div style={{
        position: 'fixed',
        bottom: toast ? '110px' : '90px',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: toast ? 1 : 0,
        pointerEvents: 'none',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        backgroundColor: 'var(--sw-navy)',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '50px',
        fontWeight: 600,
        fontSize: '0.9rem',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        zIndex: 1000,
        whiteSpace: 'nowrap'
      }}>
        {toast}
      </div>
      
    </main>
  );
}
