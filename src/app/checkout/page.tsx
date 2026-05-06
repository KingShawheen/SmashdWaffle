"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '../../store/cartStore';
import { useLocationStore } from '../../store/locationStore';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function Checkout() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const { activeLocation } = useLocationStore();
  const [isMounted, setIsMounted] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [pendingOrderCount, setPendingOrderCount] = useState(0);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    pickupTime: 'ASAP',
    orderNotes: ''
  });

  const subtotal = getCartTotal();
  const tax = subtotal * activeLocation.taxRate;
  const total = subtotal + tax;

  useEffect(() => {
    setIsMounted(true);
    const fetchPendingQueue = async () => {
      try {
        const q = query(collection(db, 'orders'), where('status', '==', 'pending'));
        const snapshot = await getDocs(q);
        setPendingOrderCount(snapshot.size);
      } catch (err) {
        console.error("Failed to fetch pending orders", err);
      }
    };
    fetchPendingQueue();
  }, []);

  const asapText = pendingOrderCount > 10 ? "ASAP (45-60 min) - High Volume" : 
                   pendingOrderCount > 5 ? "ASAP (30-45 min)" : "ASAP (10-15 min)";

  // Handle Square Tokenization Success
  const handlePaymentSuccess = async (token: unknown) => {
    console.log("Square Payment Token Received: ", token);
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: token,
          items: items,
          customerDetails: customerDetails,
          locationId: activeLocation.id
        })
      });

      if (!response.ok) {
        throw new Error('Payment processing failed');
      }

      const data = await response.json();
      console.log('Order created:', data);
      
      clearCart();
      setOrderComplete(true);
    } catch (err) {
      console.error('Error completing order:', err);
      alert('There was an issue processing your order. Please try again.');
    }
  };

  if (!isMounted) return null; // Prevent hydration mismatch

  if (orderComplete) {
    return (
      <main style={{ backgroundColor: 'var(--sw-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
        <CheckCircle2 color="var(--sw-green, #22c55e)" size={80} style={{ marginBottom: '1rem' }} />
        <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem', textAlign: 'center' }}>Order Confirmed!</h1>
        <p style={{ textAlign: 'center', color: 'var(--sw-text-muted)', marginBottom: '2rem', lineHeight: 1.5 }}>
          Your payment was successful. We are preparing your order for {customerDetails.pickupTime}. 
          You will receive an email receipt shortly.
        </p>
        <Link href="/" style={{ backgroundColor: 'var(--sw-navy)', color: 'white', padding: '1rem 3rem', borderRadius: '50px', fontWeight: 800 }}>
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: 'var(--sw-bg)', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Top Header */}
      <div style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '1rem', paddingTop: 'env(safe-area-inset-top, 3rem)', 
        backgroundColor: 'var(--sw-surface)' 
      }}>
        <Link href="/cart" style={{ padding: '0.5rem' }}>
          <ChevronLeft size={24} />
        </Link>
        <h1 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Secure Checkout</h1>
        <div style={{ width: 40 }} /> {/* Spacer */}
      </div>

      <div className="sw-animate-fade-in" style={{ padding: '1.5rem 1rem' }}>
        
        {/* Detailed Itemized Receipt */}
        <div style={{ padding: '1.5rem', background: 'var(--sw-surface)', borderRadius: '20px', border: '1px solid var(--sw-border)', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', borderBottom: '2px dashed var(--sw-border)', paddingBottom: '0.5rem' }}>Order Receipt</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '1.5rem' }}>
            {items.map((item) => (
              <div key={item.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontWeight: 800 }}>{item.quantity}x {item.title}</span>
                  <span style={{ fontWeight: 800 }}>${(item.basePrice * item.quantity).toFixed(2)}</span>
                </div>
                
                {/* Modifiers List */}
                {item.modifiers && item.modifiers.length > 0 && (
                  <div style={{ paddingLeft: '1.5rem', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {item.modifiers.map((mod, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--sw-text-muted)' }}>
                        <span>+ {mod.name} (x{item.quantity})</span>
                        <span>${(mod.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--sw-text-muted)', borderTop: '1px solid #f3f4f6', paddingTop: '0.25rem' }}>
                  Item Total: ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '2px dashed var(--sw-border)', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--sw-text-muted)' }}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--sw-text-muted)' }}>
              <span>Tax ({(activeLocation.taxRate * 100).toFixed(1)}% - {activeLocation.state})</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: '1.3rem' }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Pickup Details */}
        <div style={{ padding: '1.5rem', background: 'var(--sw-surface)', borderRadius: '20px', border: '1px solid var(--sw-border)', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontWeight: 800 }}>Pickup Details</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--sw-text-muted)', marginBottom: '0.5rem' }}>Name</label>
              <input 
                type="text" 
                value={customerDetails.name}
                onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                placeholder="John Doe" 
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--sw-border)', backgroundColor: '#f9fafb', fontSize: '1rem' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--sw-text-muted)', marginBottom: '0.5rem' }}>Email</label>
              <input 
                type="email" 
                value={customerDetails.email}
                onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                placeholder="receipts@example.com" 
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--sw-border)', backgroundColor: '#f9fafb', fontSize: '1rem' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--sw-text-muted)', marginBottom: '0.5rem' }}>Phone Number (For Smash'd Rewards)</label>
              <input 
                type="tel" 
                value={customerDetails.phone}
                onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                placeholder="(555) 123-4567" 
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--sw-border)', backgroundColor: '#f9fafb', fontSize: '1rem' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--sw-text-muted)', marginBottom: '0.5rem' }}>Pickup Time</label>
              <select 
                value={customerDetails.pickupTime}
                onChange={(e) => setCustomerDetails({...customerDetails, pickupTime: e.target.value})}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--sw-border)', backgroundColor: '#f9fafb', fontSize: '1rem' }}
              >
                <option value={asapText}>{asapText}</option>
                {pendingOrderCount <= 5 && <option value="15-30 min">In 15-30 minutes</option>}
                {pendingOrderCount <= 10 && <option value="30-45 min">In 30-45 minutes</option>}
                <option value="60 min">In 1 hour</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--sw-text-muted)', marginBottom: '0.5rem' }}>Order Notes / Special Requests</label>
              <textarea 
                value={customerDetails.orderNotes}
                onChange={(e) => setCustomerDetails({...customerDetails, orderNotes: e.target.value})}
                placeholder="Allergies, extra napkins, or any other details..." 
                rows={3}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--sw-border)', backgroundColor: '#f9fafb', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical' }}
              />
            </div>
          </div>
        </div>

        {/* Square Payment Area */}
        <div style={{ padding: '1.5rem', background: 'var(--sw-surface)', borderRadius: '20px', border: '1px solid var(--sw-border)' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontWeight: 800 }}>Payment Method</h3>
          
          {/* REPLACE sandbox-sq0idb-xxx WITH YOUR ACTUAL SQUARE APP ID */}
          <PaymentForm
            applicationId="sandbox-sq0idb-YOUR_SANDBOX_APP_ID"
            cardTokenizeResponseReceived={handlePaymentSuccess}
            locationId={activeLocation.squareLocationId}
          >
            <CreditCard 
              buttonProps={{
                css: {
                  backgroundColor: 'var(--sw-red)',
                  color: 'white',
                  borderRadius: '50px',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  padding: '1rem',
                  width: '100%',
                  marginTop: '1rem',
                  '&:hover': {
                    backgroundColor: '#cc0000',
                  }
                }
              }}
            />
          </PaymentForm>

          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--sw-text-muted)', marginTop: '1rem' }}>
            By placing your order, you agree to our Terms of Service and Privacy Policy. Payments are processed securely via Square.
          </p>
        </div>

      </div>
    </main>
  );
}
