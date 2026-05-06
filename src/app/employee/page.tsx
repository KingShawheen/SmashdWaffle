"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, GraduationCap, MonitorPlay, ListChecks, ArrowRight, Lock, KeyRound, Mail, Loader2, Database } from 'lucide-react';
import { auth, db } from '../../lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { collection, getDocs, doc, updateDoc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { MenuItem } from '../menu/data';
import { TRAINING_MODULES } from './trainingData';

export default function EmployeePortal() {
  const [activeTab, setActiveTab] = useState<'kds' | 'training' | 'admin'>('training');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  
  // Login Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Admin State
  const [adminItems, setAdminItems] = useState<MenuItem[]>([]);
  const [loadingAdmin, setLoadingAdmin] = useState(false);

  // KDS State
  const [orders, setOrders] = useState<any[]>([]);
  const [isFullScreenKDS, setIsFullScreenKDS] = useState(false);

  const isAdmin = user?.email === 'admin@smashdwaffle.com';

  // Check auth state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // Subscribe to live orders
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'orders'), 
      where('status', '==', 'pending')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveOrders: any[] = [];
      snapshot.forEach((doc) => {
        liveOrders.push({ id: doc.id, ...doc.data() });
      });
      // Sort by creation time locally to avoid needing a composite index immediately
      liveOrders.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      setOrders(liveOrders);
    });
    return () => unsubscribe();
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadAdminItems();
    }
  }, [activeTab]);

  const toggleSoldOut = async (id: string, currentStatus: boolean | undefined) => {
    if (!isAdmin) return;
    try {
      await updateDoc(doc(db, 'menu_items', id), { isSoldOut: !currentStatus });
      // update local state instantly for snappy UI
      setAdminItems(prev => prev.map(item => item.id === id ? { ...item, isSoldOut: !currentStatus } : item));
    } catch(err) {
      console.error(err);
    }
  };

  const markOrderReady = async (orderId: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: 'completed' });
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

  // Full Screen KDS Rendering
  if (isFullScreenKDS) {
    return (
      <main style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#10b981', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: 0 }}>LIVE KITCHEN DISPLAY</h1>
          </div>
          <button onClick={() => setIsFullScreenKDS(false)} style={{ backgroundColor: '#334155', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', fontSize: '1.2rem' }}>
            Exit Full Screen
          </button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem', flex: 1, overflowY: 'auto' }}>
          {orders.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#64748b', fontSize: '1.5rem', fontWeight: 800, padding: '4rem' }}>No pending orders</div>
          ) : (
            orders.map(order => (
              <div key={order.id} style={{ backgroundColor: '#fef3c7', padding: '1.5rem', borderRadius: '12px', borderLeft: '8px solid #f59e0b', color: 'black', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px dashed #d97706', paddingBottom: '0.5rem' }}>
                  <div>
                    <span style={{ fontWeight: 900, fontSize: '1.4rem', display: 'block' }}>{order.customerName}</span>
                    <span style={{ fontSize: '0.9rem', color: '#b45309', fontWeight: 700 }}>ID: {order.id.slice(-4).toUpperCase()}</span>
                  </div>
                  <span style={{ fontWeight: 900, color: '#b45309', fontSize: '1.2rem' }}>{order.pickupTime}</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontWeight: 700, flex: 1 }}>
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} style={{ marginBottom: '1rem' }}>
                      <li style={{ fontSize: '1.1rem' }}>{item.quantity}x {item.title} {item.size ? `(${item.size})` : ''}</li>
                      {item.modifiers && item.modifiers.map((mod: any, mIdx: number) => (
                        <li key={mIdx} style={{ marginLeft: '1rem', color: '#b45309', fontSize: '0.95rem' }}>- {mod.name}</li>
                      ))}
                    </div>
                  ))}
                </ul>
                <div style={{ marginTop: '1rem', color: '#b45309', fontSize: '0.9rem', fontWeight: 800, fontStyle: 'italic' }}>
                  {order.orderNotes ? `Notes: ${order.orderNotes}` : ''}
                </div>
                <button onClick={() => markOrderReady(order.id)} style={{ width: '100%', backgroundColor: '#f59e0b', color: 'black', fontWeight: 900, padding: '1rem', border: 'none', borderRadius: '8px', marginTop: '1.5rem', fontSize: '1.2rem', cursor: 'pointer' }}>
                  MARK READY
                </button>
              </div>
            ))
          )}
        </div>
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
          onClick={() => { setActiveTab('training'); setSelectedModule(null); }}
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
        {isAdmin && (
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
        )}
      </div>

      <div className="sw-animate-fade-in" style={{ padding: '0 1rem' }}>
        
        {activeTab === 'training' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {selectedModule ? (
              <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155' }}>
                <button onClick={() => setSelectedModule(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1rem', fontWeight: 700 }}>
                  <ChevronLeft size={18} />
                  Back to Modules
                </button>
                {(() => {
                  const mod = TRAINING_MODULES.find(m => m.id === selectedModule);
                  if (!mod) return null;
                  return (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '2rem' }}>{mod.icon}</span>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0 }}>{mod.title}</h2>
                      </div>
                      <div className="markdown-content" style={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>
                        {mod.content}
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              TRAINING_MODULES.map(mod => (
                <div key={mod.id} style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{mod.icon}</span>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{mod.title}</h3>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                    {mod.description}
                  </p>
                  <button onClick={() => setSelectedModule(mod.id)} style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '0.75rem 1rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', cursor: 'pointer' }}>
                    <span>Open SOP Document</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'kds' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', backgroundColor: '#334155', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#10b981', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Live Orders ({orders.length})</span>
              </div>
              <button onClick={() => setIsFullScreenKDS(true)} style={{ backgroundColor: '#1e293b', border: '1px solid #475569', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}>
                FULL SCREEN MODE
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {orders.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#64748b', fontSize: '1rem', fontWeight: 700, padding: '2rem' }}>No pending orders right now.</div>
              ) : (
                orders.map(order => (
                  <div key={order.id} style={{ backgroundColor: '#fef3c7', padding: '1.5rem', borderRadius: '8px', borderLeft: '8px solid #f59e0b', color: 'black', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px dashed #d97706', paddingBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 900, fontSize: '1.2rem' }}>{order.customerName}</span>
                      <span style={{ fontWeight: 800, color: '#b45309' }}>{order.pickupTime}</span>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontWeight: 700 }}>
                      {order.items.map((item: any, idx: number) => (
                        <div key={idx} style={{ marginBottom: '0.5rem' }}>
                          <li style={{ marginBottom: '0.25rem' }}>{item.quantity}x {item.title} {item.size ? `(${item.size})` : ''}</li>
                          {item.modifiers && item.modifiers.map((mod: any, mIdx: number) => (
                            <li key={mIdx} style={{ marginLeft: '1rem', color: '#b45309', fontSize: '0.85rem' }}>- {mod.name}</li>
                          ))}
                        </div>
                      ))}
                    </ul>
                    <div style={{ marginTop: '0.5rem', color: '#b45309', fontSize: '0.85rem', fontWeight: 800, fontStyle: 'italic' }}>
                      {order.orderNotes ? `Notes: ${order.orderNotes}` : ''}
                    </div>
                    <button onClick={() => markOrderReady(order.id)} style={{ width: '100%', backgroundColor: '#f59e0b', color: 'black', fontWeight: 900, padding: '1rem', border: 'none', borderRadius: '4px', marginTop: '1.5rem', fontSize: '1.1rem', cursor: 'pointer' }}>
                      MARK READY
                    </button>
                  </div>
                ))
              )}
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
                } catch (err: unknown) {
                  console.error(err);
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
