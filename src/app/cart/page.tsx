"use client";

import Link from 'next/link';
import { useCartStore } from '../../store/cartStore';
import { ChevronLeft, Trash2, Plus, Minus } from 'lucide-react';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCartStore();
  
  const subtotal = getCartTotal();
  const tax = subtotal * 0.081;
  const total = subtotal + tax;

  return (
    <main style={{ backgroundColor: 'var(--sw-bg)', minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* Top Header */}
      <div style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '1rem', paddingTop: 'env(safe-area-inset-top, 3rem)', 
        backgroundColor: 'var(--sw-surface)' 
      }}>
        <Link href="/menu" style={{ padding: '0.5rem' }}>
          <ChevronLeft size={24} />
        </Link>
        <h1 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Your Cart</h1>
        <span style={{ background: 'var(--sw-primary)', padding: '4px 12px', borderRadius: '99px', fontWeight: 700, fontSize: '0.85rem' }}>
          {getCartCount()} Items
        </span>
      </div>

      <div className="sw-animate-fade-in" style={{ padding: '1rem' }}>
        
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <span style={{ fontSize: '4rem', opacity: 0.5, display: 'block', marginBottom: '1rem' }}>🛒</span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Your cart is empty</h2>
            <p style={{ color: 'var(--sw-text-muted)', marginBottom: '2rem' }}>Looks like you haven&apos;t added any smash waffles yet.</p>
            <Link href="/menu" style={{ 
              display: 'inline-block', backgroundColor: 'var(--sw-red)', color: 'white', 
              padding: '0.75rem 2rem', borderRadius: '50px', fontWeight: 800 
            }}>
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'var(--sw-surface)', borderRadius: '16px', border: '1px solid var(--sw-border)' }}>
                  <div style={{ width: '70px', height: '70px', borderRadius: '12px', overflow: 'hidden', background: '#f3f4f6', flexShrink: 0, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.imageUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontSize: '2rem' }}>{item.emoji}</span>
                    )}
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, lineHeight: 1.2 }}>{item.title}</h3>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', padding: '4px', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {item.size && <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: 'var(--sw-text-muted)' }}>Size: {item.size}</p>}
                    
                    {/* Itemized Modifiers */}
                    {item.modifiers && item.modifiers.length > 0 && (
                      <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {item.modifiers.map((mod, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--sw-text-muted)' }}>
                            <span>+ {mod.name}</span>
                            <span>${mod.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                      <span style={{ fontWeight: 800 }}>${(item.price * item.quantity).toFixed(2)}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f3f4f6', padding: '2px', borderRadius: '8px' }}>
                        <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'white', border: 'none', width: '24px', height: '24px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                          <Minus size={14} />
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, width: '16px', textAlign: 'center' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'white', border: 'none', width: '24px', height: '24px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={{ padding: '1.5rem', background: '#f9fafb', borderRadius: '20px', border: '1px solid var(--sw-border)' }}>
              <h3 style={{ margin: '0 0 1rem 0', fontWeight: 800 }}>Order Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--sw-text-muted)' }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--sw-text-muted)' }}>
                <span>Tax (8.1%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--sw-border)', fontWeight: 800, fontSize: '1.25rem' }}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <div style={{ marginTop: '2rem' }}>
              <Link href="/checkout" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '1.2rem', backgroundColor: 'var(--sw-red)', color: 'white', borderRadius: '50px', fontWeight: 800, fontSize: '1.1rem' }}>
                <span>Secure Checkout</span>
                <span>${total.toFixed(2)}</span>
              </Link>
              <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--sw-text-muted)', marginTop: '1rem' }}>
                🔒 Payments secured by Square SDK
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
