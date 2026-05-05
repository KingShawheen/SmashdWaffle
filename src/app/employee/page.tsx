"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, GraduationCap, MonitorPlay, Users, ListChecks, ArrowRight } from 'lucide-react';

export default function EmployeePortal() {
  const [activeTab, setActiveTab] = useState<'kds' | 'training'>('training');

  return (
    <main style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', paddingBottom: '100px' }}>
      
      {/* Stealth Header */}
      <div style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '1rem', paddingTop: 'env(safe-area-inset-top, 3rem)', 
        backgroundColor: '#1e293b', borderBottom: '1px solid #334155'
      }}>
        <Link href="/settings" style={{ padding: '0.5rem', color: '#94a3b8' }}>
          <ChevronLeft size={24} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981' }}></div>
          <h1 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, letterSpacing: '1px' }}>COMMAND CENTER</h1>
        </div>
        <div style={{ width: '40px' }} />
      </div>

      {/* Employee Context */}
      <div style={{ padding: '1.5rem', backgroundColor: '#1e293b', borderBottom: '1px solid #334155' }}>
        <p style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem', fontWeight: 700 }}>Active Session</p>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '0 0 0.5rem 0' }}>Deer Park - FloState</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span style={{ fontSize: '0.85rem', color: '#cbd5e1', backgroundColor: '#334155', padding: '4px 10px', borderRadius: '50px' }}>Role: Barista / Line</span>
          <span style={{ fontSize: '0.85rem', color: '#cbd5e1', backgroundColor: '#334155', padding: '4px 10px', borderRadius: '50px' }}>ID: 8849-A</span>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', padding: '1rem', gap: '1rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
        <button 
          onClick={() => setActiveTab('training')}
          style={{ 
            padding: '0.75rem 1.25rem', borderRadius: '12px', fontWeight: 800, fontSize: '0.9rem',
            backgroundColor: activeTab === 'training' ? '#3b82f6' : '#1e293b',
            color: activeTab === 'training' ? 'white' : '#94a3b8', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}
        >
          <GraduationCap size={18} />
          Smash&apos;d Academy
        </button>
        <button 
          onClick={() => setActiveTab('kds')}
          style={{ 
            padding: '0.75rem 1.25rem', borderRadius: '12px', fontWeight: 800, fontSize: '0.9rem',
            backgroundColor: activeTab === 'kds' ? '#f59e0b' : '#1e293b',
            color: activeTab === 'kds' ? 'black' : '#94a3b8', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}
        >
          <MonitorPlay size={18} />
          Kitchen Display
        </button>
      </div>

      <div className="sw-animate-fade-in" style={{ padding: '0 1rem' }}>
        
        {activeTab === 'training' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>☕️</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Coffee Science & Extraction</h3>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                Mastering the perfect pull. Learn timing, temperature controls, and milk micro-foam techniques for our signature Longpour and Lattes.
              </p>
              <button style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '0.75rem 1rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <span>Start Module</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🥓</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>The Perfect SMASH</h3>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                Styles of bacon, batter temperature, and grid timing. Flawless execution of our signature savory waffles.
              </p>
              <button style={{ backgroundColor: '#334155', color: 'white', border: 'none', padding: '0.75rem 1rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <span>Resume Module (40%)</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🧼</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>WA State Health & Safety</h3>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                Cleanliness, cross-contamination, and strict adherence to Washington state food laws to a T.
              </p>
              <button style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '0.75rem 1rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '0.5rem' }}>
                <ListChecks size={16} />
                <span>Passed (Valid until 2027)</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'kds' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', backgroundColor: '#334155', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: '#10b981', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Live Orders (Waiting)</span>
            </div>

            {/* Fake Order Ticket */}
            <div style={{ backgroundColor: '#fef3c7', padding: '1.5rem', borderRadius: '8px', borderLeft: '8px solid #f59e0b', color: 'black', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px dashed #d97706', paddingBottom: '0.5rem' }}>
                <span style={{ fontWeight: 900, fontSize: '1.2rem' }}>Order #1042</span>
                <span style={{ fontWeight: 800, color: '#b45309' }}>ASAP</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontWeight: 700 }}>
                <li style={{ marginBottom: '0.5rem' }}>1x Savory Bacon SMASH</li>
                <li style={{ marginLeft: '1rem', color: '#b45309', fontSize: '0.85rem', marginBottom: '1rem' }}>- Add Extra Cheese</li>
                
                <li style={{ marginBottom: '0.5rem' }}>1x 16oz Latte</li>
                <li style={{ marginLeft: '1rem', color: '#b45309', fontSize: '0.85rem' }}>- Oat Milk</li>
                <li style={{ marginLeft: '1rem', color: '#b45309', fontSize: '0.85rem' }}>- Extra Shot</li>
              </ul>
              <button style={{ width: '100%', backgroundColor: '#f59e0b', color: 'black', fontWeight: 900, padding: '1rem', border: 'none', borderRadius: '4px', marginTop: '1.5rem', fontSize: '1.1rem' }}>
                MARK READY
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
