"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, GraduationCap, MonitorPlay, Users, ListChecks, ArrowRight, Lock, KeyRound, Mail, Loader2, Database } from 'lucide-react';
import { auth, db } from '../../lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { MenuItem } from '../menu/data';

export default function EmployeePortal() {
  const [activeTab, setActiveTab] = useState<'kds' | 'training' | 'admin'>('training');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  // Login Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Admin State
  const [adminItems, setAdminItems] = useState<MenuItem[]>([]);
  const [loadingAdmin, setLoadingAdmin] = useState(false);

  // Check auth state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.error(err);
      setError('Invalid credentials. Access Denied.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const loadAdminItems = async () => {
    setLoadingAdmin(true);
    try {
      const snapshot = await getDocs(collection(db, 'menu_items'));
      const items: MenuItem[] = [];
      snapshot.forEach(d => {
        items.push({ id: d.id, ...d.data() } as MenuItem);
      });
      // Sort by ID to keep order
      items.sort((a,b) => a.id.localeCompare(b.id));
      setAdminItems(items);
    } catch(err) {
      console.error("Error loading admin items", err);
    } finally {
      setLoadingAdmin(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'admin') {
      loadAdminItems();
    }
  }, [activeTab]);

  const toggleSoldOut = async (id: string, currentStatus: boolean | undefined) => {
    try {
      await updateDoc(doc(db, 'menu_items', id), { isSoldOut: !currentStatus });
      // update local state instantly for snappy UI
      setAdminItems(prev => prev.map(item => item.id === id ? { ...item, isSoldOut: !currentStatus } : item));
    } catch(err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loadingAuth) {
    return (
      <main style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 size={40} color="#3b82f6" className="animate-spin" />
      </main>
    );
  }

  if (!user) {
    return (
      <main style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '2rem' }}>
        <div style={{ position: 'absolute', top: '2rem', left: '1rem' }}>
          <Link href="/settings" style={{ color: '#94a3b8' }}>
            <ChevronLeft size={30} />
          </Link>
        </div>

        <div className="sw-animate-fade-in" style={{ backgroundColor: '#1e293b', padding: '2.5rem 2rem', borderRadius: '24px', border: '1px solid #334155', width: '100%', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock size={30} color="#38bdf8" />
            </div>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '1px' }}>Enterprise OS</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '2rem' }}>Restricted access. Authorized personnel only.</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Mail size={20} color="#64748b" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Employee Email" 
                required
                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '12px', border: error ? '2px solid #ef4444' : '1px solid #334155', backgroundColor: '#0f172a', color: 'white', fontSize: '1rem' }}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <KeyRound size={20} color="#64748b" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Secure Password" 
                required
                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '12px', border: error ? '2px solid #ef4444' : '1px solid #334155', backgroundColor: '#0f172a', color: 'white', fontSize: '1rem' }}
              />
            </div>
            {error && <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 700 }}>{error}</span>}
            
            <button type="submit" disabled={isLoggingIn} style={{ width: '100%', padding: '1rem', backgroundColor: '#3b82f6', color: 'white', fontWeight: 800, fontSize: '1rem', border: 'none', borderRadius: '12px', marginTop: '0.5rem', cursor: isLoggingIn ? 'not-allowed' : 'pointer', opacity: isLoggingIn ? 0.7 : 1 }}>
              {isLoggingIn ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
            </button>
          </form>
        </div>
        <p style={{ color: '#475569', fontSize: '0.75rem', marginTop: '2rem' }}>Protected by Smash&apos;d Security Architecture</p>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', paddingBottom: '100px' }}>
      
      {/* Stealth Header */}
      <div style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '1rem', paddingTop: 'env(safe-area-inset-top, 3rem)', 
        backgroundColor: '#1e293b', borderBottom: '1px solid #334155'
      }}>
        <button onClick={handleLogout} style={{ padding: '0.5rem', color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', fontWeight: 700 }}>
          <ChevronLeft size={20} />
          LOGOUT
        </button>
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
            color: activeTab === 'training' ? 'white' : '#94a3b8', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
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
            color: activeTab === 'kds' ? 'black' : '#94a3b8', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
          }}
        >
          <MonitorPlay size={18} />
          Kitchen Display
        </button>
        <button 
          onClick={() => setActiveTab('admin')}
          style={{ 
            padding: '0.75rem 1.25rem', borderRadius: '12px', fontWeight: 800, fontSize: '0.9rem',
            backgroundColor: activeTab === 'admin' ? '#ef4444' : '#1e293b',
            color: activeTab === 'admin' ? 'white' : '#94a3b8', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
          }}
        >
          <Database size={18} />
          Database Admin
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
              <button style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '0.75rem 1rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', cursor: 'pointer' }}>
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
              <button style={{ backgroundColor: '#334155', color: 'white', border: 'none', padding: '0.75rem 1rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', cursor: 'pointer' }}>
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
              <button style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '0.75rem 1rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '0.5rem', cursor: 'pointer' }}>
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
              <button style={{ width: '100%', backgroundColor: '#f59e0b', color: 'black', fontWeight: 900, padding: '1rem', border: 'none', borderRadius: '4px', marginTop: '1.5rem', fontSize: '1.1rem', cursor: 'pointer' }}>
                MARK READY
              </button>
            </div>
          </div>
        )}

        {activeTab === 'admin' && (
          <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Database size={24} color="#ef4444" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Firestore Seeding</h3>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>
              Push the static data.ts menu items into the live Firestore Database. This will initialize the NoSQL structure.
            </p>
            <button 
              onClick={async (e) => {
                const btn = e.currentTarget;
                btn.innerText = 'SEEDING...';
                btn.style.opacity = '0.7';
                try {
                  const { seedMenuData } = await import('../../lib/seed');
                  await seedMenuData();
                  btn.innerText = 'DATABASE SEEDED!';
                  btn.style.backgroundColor = '#10b981';
                } catch (err) {
                  btn.innerText = 'ERROR (Check Console)';
                  btn.style.backgroundColor = '#ef4444';
                }
              }}
              style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '1rem', borderRadius: '8px', fontWeight: 900, fontSize: '0.95rem', width: '100%', cursor: 'pointer', marginBottom: '2rem' }}>
              INITIALIZE DATABASE
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderTop: '1px solid #334155', paddingTop: '1.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>📦</span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Live Inventory Control</h3>
            </div>
            
            {loadingAdmin ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}><Loader2 className="animate-spin" /></div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {adminItems.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #334155' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>{item.type === 'food' ? '🧇' : '☕️'}</span>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.title}</span>
                    </div>
                    <button 
                      onClick={() => toggleSoldOut(item.id, item.isSoldOut)}
                      style={{ 
                        padding: '0.4rem 0.8rem', borderRadius: '6px', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer', border: 'none',
                        backgroundColor: item.isSoldOut ? '#ef4444' : '#10b981', color: 'white' 
                      }}>
                      {item.isSoldOut ? 'SOLD OUT' : 'IN STOCK'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
