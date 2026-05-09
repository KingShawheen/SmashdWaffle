"use client";

import Link from 'next/link';
import { User, Bell, Shield, CircleHelp, LogOut, ChevronRight } from 'lucide-react';

export default function Settings() {

  return (
    <main style={{ backgroundColor: 'var(--sw-bg)', minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* Top Header */}
      <div style={{ 
        display: 'flex', justifyContent: 'center', alignItems: 'center', 
        padding: '1rem', paddingTop: 'env(safe-area-inset-top, 3rem)', 
        backgroundColor: 'var(--sw-surface)', borderBottom: '1px solid var(--sw-border)'
      }}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Settings</h1>
      </div>

      <div className="sw-animate-fade-in" style={{ padding: '1.5rem 1rem' }}>
        
        {/* Profile Card */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', background: 'var(--sw-surface)', borderRadius: '20px', border: '1px solid var(--sw-border)', marginBottom: '2rem' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--sw-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sw-navy)' }}>
            <User size={30} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 4px 0' }}>John Doe</h2>
            <p style={{ margin: 0, color: 'var(--sw-text-muted)', fontSize: '0.85rem' }}>john.doe@example.com</p>
          </div>
        </div>

        {/* Settings Groups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Account */}
          <div>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--sw-text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Account</h3>
            <div style={{ background: 'var(--sw-surface)', borderRadius: '16px', border: '1px solid var(--sw-border)', overflow: 'hidden' }}>
              <Link href="#" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--sw-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <User size={20} color="var(--sw-navy)" />
                  <span style={{ fontWeight: 600 }}>Personal Information</span>
                </div>
                <ChevronRight size={20} color="var(--sw-text-muted)" />
              </Link>
              <Link href="#" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--sw-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Shield size={20} color="var(--sw-navy)" />
                  <span style={{ fontWeight: 600 }}>Security & Passwords</span>
                </div>
                <ChevronRight size={20} color="var(--sw-text-muted)" />
              </Link>
              <Link href="#" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Bell size={20} color="var(--sw-navy)" />
                  <span style={{ fontWeight: 600 }}>Notifications</span>
                </div>
                <ChevronRight size={20} color="var(--sw-text-muted)" />
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--sw-text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Support</h3>
            <div style={{ background: 'var(--sw-surface)', borderRadius: '16px', border: '1px solid var(--sw-border)', overflow: 'hidden' }}>
              <Link href="#" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--sw-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CircleHelp size={20} color="var(--sw-navy)" />
                  <span style={{ fontWeight: 600 }}>Help Center & FAQ</span>
                </div>
                <ChevronRight size={20} color="var(--sw-text-muted)" />
              </Link>
            </div>
          </div>

          {/* Action */}
          <button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '1rem', background: 'var(--sw-surface)', borderRadius: '16px', border: '1px solid var(--sw-border)', color: 'var(--sw-red)', fontWeight: 800, fontSize: '1rem', marginTop: '1rem' }}>
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>

        </div>

        <p 
          style={{ textAlign: 'center', color: 'var(--sw-text-muted)', fontSize: '0.75rem', marginTop: '2rem', userSelect: 'none' }}
        >
          App Version 1.0.0 (Deer Park)
        </p>

      </div>
    </main>
  );
}
