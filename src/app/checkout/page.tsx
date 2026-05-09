"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCartStore } from '../../store/cartStore';
import { useLocationStore } from '../../store/locationStore';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';

export default function Checkout() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const { activeLocation } = useLocationStore();
  const [isMounted, setIsMounted] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [squareOrderId, setSquareOrderId] = useState<string | null>(null);
  const [orderStatus, setOrderStatus] = useState<string>('OPEN');
  const [pendingOrderCount, setPendingOrderCount] = useState(0);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    pickupTime: 'ASAP',
    orderNotes: ''
  });
  const checkoutIdempotencyKey = useRef<string>('');

  const fallbackSubtotal = getCartTotal();
  const [exactSubtotal, setExactSubtotal] = useState<number | null>(null);
  const [exactTax, setExactTax] = useState<number | null>(null);
  const [exactTotal, setExactTotal] = useState<number | null>(null);

  // Industry Standard: Let Square handle the math (Bankers' Rounding, native pos taxes)
  useEffect(() => {
    if (items.length === 0) return;

    // Generate a secure idempotency key once per cart session
    checkoutIdempotencyKey.current = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : Math.random().toString(36).substring(2) + Date.now().toString(36);

    const calculateOrder = async () => {
      try {
        const res = await fetch('/api/orders/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items, locationId: activeLocation.squareLocationId })
        });
        const order = await res.json();
        if (order.totalMoney) {
          // Calculate subtotal from total - tax (safest way to get item total after discounts)
          setExactSubtotal(Number(order.totalMoney.amount) / 100 - Number(order.totalTaxMoney?.amount || 0) / 100);
          setExactTax(Number(order.totalTaxMoney?.amount || 0) / 100);
          setExactTotal(Number(order.totalMoney.amount) / 100);
        }
      } catch (err) {
        console.error("Failed to calculate exact order total:", err);
      }
    };
    calculateOrder();
  }, [items, activeLocation.squareLocationId]);

  const displaySubtotal = exactSubtotal !== null ? exactSubtotal : fallbackSubtotal;
  const displayTax = exactTax !== null ? exactTax : (fallbackSubtotal * activeLocation.taxRate);
  const displayTotal = exactTotal !== null ? exactTotal : (fallbackSubtotal + displayTax);

  useEffect(() => {
    setIsMounted(true);
    const fetchPendingQueue = async () => {
      try {
        const response = await fetch(`/api/orders/pending-count?locationId=${activeLocation.squareLocationId}`);
        const data = await response.json();
        setPendingOrderCount(data.count || 0);
      } catch (err) {
        console.error("Failed to fetch pending orders from Square", err);
      }
    };
    fetchPendingQueue();
  }, [activeLocation.squareLocationId]);

  // Poll Square API for Order Status on Success Screen
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (orderComplete && squareOrderId && orderStatus !== 'COMPLETED') {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/orders/${squareOrderId}`);
          const data = await res.json();
          if (data.success && data.order && data.order.state) {
            setOrderStatus(data.order.state);
          }
        } catch (err) {
          console.error("Failed to poll order status", err);
        }
      }, 5000); // Poll every 5 seconds for fast feedback
    }
    return () => clearInterval(interval);
  }, [orderComplete, squareOrderId, orderStatus]);



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
          locationId: activeLocation.squareLocationId,
          idempotencyKey: checkoutIdempotencyKey.current
        })
      });

      if (!response.ok) {
        throw new Error('Payment processing failed');
      }

      const data = await response.json();
      console.log('Order created:', data);
      
      if (data.order && data.order.id) {
        setSquareOrderId(data.order.id);
      }
      
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
      <main style={{ backgroundColor: 'var(--sw-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '1.5rem', paddingTop: 'env(safe-area-inset-top, 3rem)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <CheckCircle2 color="var(--sw-green, #22c55e)" size={80} />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>Order Confirmed!</h1>
          <p style={{ color: 'var(--sw-text-muted)', lineHeight: 1.5 }}>
            Your payment was successful. We are preparing your order for {customerDetails.pickupTime}.
          </p>
        </div>

        {/* Order Status Tracker */}
        <div style={{ padding: '1.5rem', backgroundColor: 'var(--sw-surface)', borderRadius: '16px', border: '1px solid var(--sw-border)', textAlign: 'left', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem' }}>Live Order Status</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
            {/* Connecting line */}
            <div style={{ position: 'absolute', left: '11px', top: '24px', bottom: '24px', width: '2px', backgroundColor: orderStatus === 'COMPLETED' ? 'var(--sw-green)' : 'var(--sw-border)', zIndex: 1, transition: 'background-color 0.5s ease' }}></div>
            
            {/* Step 1 */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
               <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--sw-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                 <CheckCircle2 size={14} color="white" />
               </div>
               <div>
                 <p style={{ fontWeight: 800, margin: '0 0 0.25rem 0', color: 'var(--sw-text)' }}>Order Received</p>
                 <p style={{ fontSize: '0.85rem', color: 'var(--sw-text-muted)', margin: 0 }}>Sent directly to the Square Kitchen Display.</p>
               </div>
            </div>

            {/* Step 2 */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
               <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: orderStatus === 'COMPLETED' ? 'var(--sw-green)' : 'var(--sw-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                 {orderStatus === 'COMPLETED' ? <CheckCircle2 size={14} color="white" /> : <div style={{ width: '8px', height: '8px', backgroundColor: 'black', borderRadius: '50%' }}></div>}
               </div>
               <div>
                 <p style={{ fontWeight: 800, margin: '0 0 0.25rem 0', color: 'var(--sw-text)' }}>{orderStatus === 'COMPLETED' ? 'Prepared' : 'In the Kitchen'}</p>
                 <p style={{ fontSize: '0.85rem', color: 'var(--sw-text-muted)', margin: 0 }}>{orderStatus === 'COMPLETED' ? 'The chefs have finished your order.' : 'Our chefs are smashing your waffles right now.'}</p>
               </div>
            </div>

            {/* Step 3 */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
               <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: orderStatus === 'COMPLETED' ? 'var(--sw-green)' : 'var(--sw-surface)', border: orderStatus === 'COMPLETED' ? 'none' : '2px solid var(--sw-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                 {orderStatus === 'COMPLETED' && <CheckCircle2 size={14} color="white" />}
               </div>
               <div>
                 <p style={{ fontWeight: 800, margin: '0 0 0.25rem 0', color: orderStatus === 'COMPLETED' ? 'var(--sw-text)' : 'var(--sw-text-muted)' }}>Ready for Pickup</p>
                 <p style={{ fontSize: '0.85rem', color: 'var(--sw-text-muted)', margin: 0 }}>{orderStatus === 'COMPLETED' ? 'Come grab your order at the counter!' : 'We will notify you here when it\'s ready.'}</p>
               </div>
            </div>
          </div>
        </div>

        <Link href="/">
          <button style={{ width: '100%', padding: '1rem', backgroundColor: 'var(--sw-navy)', color: 'white', borderRadius: '50px', fontWeight: 800, border: 'none', cursor: 'pointer' }}>
            Back to Home
          </button>
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
              <span>${displaySubtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--sw-text-muted)' }}>
              <span>Tax (Exact)</span>
              <span>${displayTax.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: '1.3rem' }}>
              <span>Total</span>
              <span>${displayTotal.toFixed(2)}</span>
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
          
          {/* Square Web Payments SDK */}
          <PaymentForm
            applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!}
            cardTokenizeResponseReceived={handlePaymentSuccess}
            locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!}
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
