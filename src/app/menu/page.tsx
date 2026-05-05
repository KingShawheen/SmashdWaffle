"use client";

import { useState } from 'react';
import { ShoppingCart, ChevronLeft, Plus } from 'lucide-react';
import Link from 'next/link';

export default function Menu() {
  const [activeTab, setActiveTab] = useState<'food' | 'drinks'>('food');

  return (
    <main style={{ backgroundColor: 'var(--sw-bg)', minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* Top White Header */}
      <div style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '1rem', paddingTop: 'env(safe-area-inset-top, 3rem)', 
        backgroundColor: 'var(--sw-surface)' 
      }}>
        <Link href="/" style={{ padding: '0.5rem' }}>
          <ChevronLeft size={24} />
        </Link>
        <h1 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Menu Selection</h1>
        <Link href="/cart" style={{ position: 'relative', padding: '0.5rem' }}>
          <ShoppingCart size={24} />
          <div style={{ 
            position: 'absolute', top: 0, right: 0, 
            background: '#111', color: 'white', 
            borderRadius: '50%', width: '18px', height: '18px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontSize: '0.65rem', fontWeight: 'bold' 
          }}>2</div>
        </Link>
      </div>

      {/* Segmented Control (Yin & Yang Toggle) */}
      <div style={{ backgroundColor: 'var(--sw-surface)', padding: '0.5rem 1rem 1rem', borderBottom: '1px solid var(--sw-border)' }}>
        <div style={{ 
          display: 'flex', 
          backgroundColor: '#f3f4f6',
          borderRadius: '50px', 
          padding: '5px',
          position: 'relative'
        }}>
          {/* Animated Background Pill */}
          <div style={{
            position: 'absolute',
            top: '5px',
            bottom: '5px',
            left: activeTab === 'food' ? '5px' : '50%',
            width: 'calc(50% - 5px)',
            backgroundColor: 'var(--sw-surface)',
            borderRadius: '50px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
          }} />
          
          <button 
            onClick={() => setActiveTab('food')}
            style={{ 
              flex: 1, padding: '0.6rem 0', fontWeight: 800, fontSize: '0.95rem', 
              color: activeTab === 'food' ? 'var(--sw-text)' : 'var(--sw-text-muted)', 
              position: 'relative', zIndex: 2, backgroundColor: 'transparent' 
            }}
          >
            Signature Breakfast
          </button>
          <button 
            onClick={() => setActiveTab('drinks')}
            style={{ 
              flex: 1, padding: '0.6rem 0', fontWeight: 800, fontSize: '0.95rem', 
              color: activeTab === 'drinks' ? 'var(--sw-text)' : 'var(--sw-text-muted)', 
              position: 'relative', zIndex: 2, backgroundColor: 'transparent' 
            }}
          >
            Coffee & Drinks
          </button>
        </div>
      </div>

      {/* Dynamic Content Rendering */}
      {activeTab === 'food' ? (
        <div className="sw-animate-fade-in">
          {/* Red Sticky Categories Bar */}
          <div style={{ 
            backgroundColor: 'var(--sw-red)', 
            padding: '0.75rem 1rem', 
            display: 'flex', 
            gap: '0.75rem', 
            overflowX: 'auto', 
            WebkitOverflowScrolling: 'touch', 
            scrollbarWidth: 'none',
            position: 'sticky',
            top: 0,
            zIndex: 50
          }} className="hide-scrollbar">
            <button style={{ backgroundColor: 'var(--sw-yellow)', color: 'black', fontWeight: 800, fontSize: '0.9rem', padding: '0.4rem 1rem', borderRadius: '50px', whiteSpace: 'nowrap' }}>Signature Waffles</button>
            <button style={{ backgroundColor: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.8)', fontWeight: 600, fontSize: '0.9rem', padding: '0.4rem 1rem', borderRadius: '50px', whiteSpace: 'nowrap' }}>Savory Smash'd</button>
            <button style={{ backgroundColor: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.8)', fontWeight: 600, fontSize: '0.9rem', padding: '0.4rem 1rem', borderRadius: '50px', whiteSpace: 'nowrap' }}>Sides</button>
          </div>

          {/* Product Grid */}
          <div style={{ padding: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            
            {/* Breakfast SMASH Waffle */}
            <div style={{ backgroundColor: 'var(--sw-surface)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid var(--sw-border)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '140px', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '3rem', opacity: 0.3 }}>🧇</span>
                <div style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: 'var(--sw-yellow)', padding: '4px 8px', borderRadius: '8px', fontSize: '0.65rem', fontWeight: 800 }}>Chef's Choice</div>
              </div>
              <div style={{ padding: '0.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.2rem', lineHeight: 1.2 }}>Breakfast SMASH</h3>
                <div style={{ fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '0.25rem' }}>🥓 🍳 🧀 🥔</div>
                <p style={{ fontSize: '0.7rem', color: 'var(--sw-text-muted)', marginBottom: '1rem', lineHeight: 1.3, flex: 1 }}>Bacon, Egg, Cheese, and Tater Tots.</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>$15.00</span>
                  <button style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--sw-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>
                    <Plus size={18} color="black" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>

            {/* SMASH'D Omelette */}
            <div style={{ backgroundColor: 'var(--sw-surface)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid var(--sw-border)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '140px', background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '3rem', opacity: 0.3 }}>🧇</span>
              </div>
              <div style={{ padding: '0.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.2rem', lineHeight: 1.2 }}>SMASH'D Omelette</h3>
                <div style={{ fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '0.25rem' }}>🥚 🥩 🫑 🍄 🧀</div>
                <p style={{ fontSize: '0.7rem', color: 'var(--sw-text-muted)', marginBottom: '1rem', lineHeight: 1.3, flex: 1 }}>3 Eggs, Ham/Sausage, Bell Peppers, Mushrooms, Cheese.</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>$13.00</span>
                  <button style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--sw-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>
                    <Plus size={18} color="black" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>

            {/* Plain Waffle */}
            <div style={{ backgroundColor: 'var(--sw-surface)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid var(--sw-border)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '140px', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '3rem', opacity: 0.3 }}>🧇</span>
              </div>
              <div style={{ padding: '0.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.2rem', lineHeight: 1.2 }}>Plain Waffle</h3>
                <div style={{ fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '0.25rem' }}>🧇 🧈 🍁</div>
                <p style={{ fontSize: '0.7rem', color: 'var(--sw-text-muted)', marginBottom: '1rem', lineHeight: 1.3, flex: 1 }}>Classic golden waffle. GF option available.</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>$10.00</span>
                  <button style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--sw-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>
                    <Plus size={18} color="black" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>

            {/* Dessert Waffles */}
            <div style={{ backgroundColor: 'var(--sw-surface)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid var(--sw-border)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '140px', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '3rem', opacity: 0.3 }}>🧇</span>
              </div>
              <div style={{ padding: '0.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.2rem', lineHeight: 1.2 }}>Dessert Waffles</h3>
                <div style={{ fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '0.25rem' }}>🍪 🍫 🍨</div>
                <p style={{ fontSize: '0.7rem', color: 'var(--sw-text-muted)', marginBottom: '1rem', lineHeight: 1.3, flex: 1 }}>Oreo, Reese’s, or Ice Cream topping.</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>$15.00</span>
                  <button style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--sw-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>
                    <Plus size={18} color="black" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>

            {/* Waffle BLT */}
            <div style={{ backgroundColor: 'var(--sw-surface)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid var(--sw-border)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '140px', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '3rem', opacity: 0.3 }}>🧇</span>
              </div>
              <div style={{ padding: '0.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.2rem', lineHeight: 1.2 }}>Waffle BLT</h3>
                <div style={{ fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '0.25rem' }}>🥓 🥬 🍅 🥑 🧇</div>
                <p style={{ fontSize: '0.7rem', color: 'var(--sw-text-muted)', marginBottom: '1rem', lineHeight: 1.3, flex: 1 }}>Bacon, Lettuce, Tomato, Guacamole.</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>$15.00</span>
                  <button style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--sw-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>
                    <Plus size={18} color="black" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>

            {/* Acai Bowl */}
            <div style={{ backgroundColor: 'var(--sw-surface)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid var(--sw-border)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '140px', background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '3rem', opacity: 0.3 }}>🥣</span>
              </div>
              <div style={{ padding: '0.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.2rem', lineHeight: 1.2 }}>Acai Bowl</h3>
                <div style={{ fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '0.25rem' }}>🥣 🌾 🍌 🫐 🥜 🍯</div>
                <p style={{ fontSize: '0.7rem', color: 'var(--sw-text-muted)', marginBottom: '1rem', lineHeight: 1.3, flex: 1 }}>Acai, Granola, Banana, Blueberries, PB & Honey.</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>$15.00</span>
                  <button style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--sw-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>
                    <Plus size={18} color="black" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="sw-animate-fade-in" style={{ padding: '0.5rem 1rem 1rem' }}>
          {/* Coffee Menu Section */}
          <div className="smash-waffle-container" style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: 800, margin: 0, fontSize: '1.2rem' }}>Hot & Iced Coffee</h3>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--sw-red)' }}>Extra Shot: $1.00</span>
            </div>
            
            <div className="sw-drink-list">
              <div className="sw-drink-item">
                <h4 className="sw-drink-title">Americano</h4>
                <div className="sw-drink-prices">
                  <div className="sw-price-pill"><span className="sw-size">12oz</span><span className="sw-price">$3.00</span></div>
                  <div className="sw-price-pill"><span className="sw-size">16oz</span><span className="sw-price">$3.50</span></div>
                  <div className="sw-price-pill"><span className="sw-size">20oz</span><span className="sw-price">$4.00</span></div>
                  <div className="sw-price-pill"><span className="sw-size">24oz</span><span className="sw-price">$4.50</span></div>
                </div>
              </div>

              <div className="sw-drink-item">
                <h4 className="sw-drink-title">Longpour</h4>
                <div className="sw-drink-prices">
                  <div className="sw-price-pill"><span className="sw-size">12oz</span><span className="sw-price">$2.50</span></div>
                  <div className="sw-price-pill"><span className="sw-size">16oz</span><span className="sw-price">$3.00</span></div>
                  <div className="sw-price-pill"><span className="sw-size">20oz</span><span className="sw-price">$3.50</span></div>
                  <div className="sw-price-pill"><span className="sw-size">24oz</span><span className="sw-price">$4.00</span></div>
                </div>
              </div>

              <div className="sw-drink-item">
                <h4 className="sw-drink-title">Latte / Mocha / Macchiato / Chai</h4>
                <div className="sw-drink-prices">
                  <div className="sw-price-pill"><span className="sw-size">12oz</span><span className="sw-price">$4.00</span></div>
                  <div className="sw-price-pill"><span className="sw-size">16oz</span><span className="sw-price">$4.50</span></div>
                  <div className="sw-price-pill"><span className="sw-size">20oz</span><span className="sw-price">$5.00</span></div>
                  <div className="sw-price-pill"><span className="sw-size">24oz</span><span className="sw-price">$5.50</span></div>
                </div>
              </div>

              <div className="sw-drink-item">
                <h4 className="sw-drink-title">Big Train Latte (Iced)</h4>
                <div className="sw-drink-prices">
                  <div className="sw-price-pill"><span className="sw-size">12oz</span><span className="sw-price">$4.50</span></div>
                  <div className="sw-price-pill"><span className="sw-size">16oz</span><span className="sw-price">$5.00</span></div>
                  <div className="sw-price-pill"><span className="sw-size">20oz</span><span className="sw-price">$5.50</span></div>
                  <div className="sw-price-pill"><span className="sw-size">24oz</span><span className="sw-price">$6.00</span></div>
                </div>
              </div>

              <div className="sw-drink-item">
                <h4 className="sw-drink-title">Tea</h4>
                <div className="sw-drink-prices">
                  <div className="sw-price-pill"><span className="sw-size">12oz</span><span className="sw-price">$2.00</span></div>
                  <div className="sw-price-pill"><span className="sw-size">16oz</span><span className="sw-price">$2.50</span></div>
                  <div className="sw-price-pill"><span className="sw-size">20oz</span><span className="sw-price">$3.00</span></div>
                  <div className="sw-price-pill"><span className="sw-size">24oz</span><span className="sw-price">$3.50</span></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Non-Coffee Menu Section */}
          <div className="smash-waffle-container" style={{ marginTop: '3rem' }}>
            <h3 style={{ marginBottom: '1rem', fontWeight: 800, fontSize: '1.2rem' }}>Non-Coffee & Juice</h3>
            <div className="sw-drink-list">
              
              <div className="sw-drink-item">
                <h4 className="sw-drink-title">Italian Soda</h4>
                <div className="sw-drink-prices">
                  <div className="sw-price-pill"><span className="sw-size">12oz</span><span className="sw-price">$4.50</span></div>
                  <div className="sw-price-pill"><span className="sw-size">16oz</span><span className="sw-price">$5.25</span></div>
                  <div className="sw-price-pill"><span className="sw-size">20oz</span><span className="sw-price">$6.00</span></div>
                  <div className="sw-price-pill"><span className="sw-size">24oz</span><span className="sw-price">$6.75</span></div>
                </div>
              </div>

              <div className="sw-drink-item">
                <h4 className="sw-drink-title">Redbull Italian Soda</h4>
                <div className="sw-drink-prices">
                  <div className="sw-price-pill"><span className="sw-size">12oz</span><span className="sw-price">$5.50</span></div>
                  <div className="sw-price-pill"><span className="sw-size">16oz</span><span className="sw-price">$6.50</span></div>
                  <div className="sw-price-pill"><span className="sw-size">20oz</span><span className="sw-price">$7.50</span></div>
                  <div className="sw-price-pill"><span className="sw-size">24oz</span><span className="sw-price">$8.25</span></div>
                </div>
              </div>

              <div className="sw-drink-item">
                <h4 className="sw-drink-title">Fruit Smoothie</h4>
                <div className="sw-drink-prices">
                  <div className="sw-price-pill"><span className="sw-size">12oz</span><span className="sw-price">$4.00</span></div>
                  <div className="sw-price-pill"><span className="sw-size">16oz</span><span className="sw-price">$4.50</span></div>
                  <div className="sw-price-pill"><span className="sw-size">20oz</span><span className="sw-price">$5.00</span></div>
                  <div className="sw-price-pill"><span className="sw-size">24oz</span><span className="sw-price">$5.50</span></div>
                </div>
              </div>

              <div className="sw-drink-item">
                <h4 className="sw-drink-title">Juice (Orange, Apple)</h4>
                <div className="sw-drink-prices">
                  <div className="sw-price-pill"><span className="sw-size">12oz</span><span className="sw-price">$2.50</span></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </main>
  );
}
