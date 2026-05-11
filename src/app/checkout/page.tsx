"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCartStore } from '../../store/cartStore';
import { useLocationStore } from '../../store/locationStore';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';
import { PaymentForm, CreditCard, ApplePay, GooglePay } from 'react-square-web-payments-sdk';
import { isStoreOpen } from '../../lib/storeHours';

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
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const storeStatus = isStoreOpen();

  const [tipPercentage, setTipPercentage] = useState<number | null>(0.15);
  const [customTip, setCustomTip] = useState<string>('');

  const fallbackSubtotal = getCartTotal();
  const calculatedTipAmount = tipPercentage !== null 
    ? Math.round(fallbackSubtotal * tipPercentage * 100) / 100 
    : (parseFloat(customTip) || 0);
  const calculatedTipAmountCents = Math.round(calculatedTipAmount * 100);

  const [exactSubtotal, setExactSubtotal] = useState<number | null>(null);
  const [exactTax, setExactTax] = useState<number | null>(null);
  const [exactTip, setExactTip] = useState<number | null>(null);
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
          body: JSON.stringify({ 
            items, 
            locationId: activeLocation.squareLocationId, 
            taxRate: activeLocation.taxRate,
            tipAmount: calculatedTipAmountCents
          })
        });
        const order = await res.json();
        if (order.totalMoney) {
          // Calculate subtotal from total - tax - tip (safest way to get item total after discounts)
          const tipMoney = Number(order.totalServiceChargeMoney?.amount || 0) / 100;
          const taxMoney = Number(order.totalTaxMoney?.amount || 0) / 100;
          setExactSubtotal(Number(order.totalMoney.amount) / 100 - taxMoney - tipMoney);
          setExactTax(taxMoney);
          setExactTip(tipMoney);
          setExactTotal(Number(order.totalMoney.amount) / 100);
        }
      } catch (err) {
        console.error("Failed to calculate exact order total:", err);
      }
    };
    calculateOrder();
  }, [items, activeLocation.squareLocationId, calculatedTipAmountCents]);

  const displaySubtotal = exactSubtotal !== null ? exactSubtotal : fallbackSubtotal;
  const displayTax = exactTax !== null ? exactTax : (fallbackSubtotal * activeLocation.taxRate);
  const displayTip = exactTip !== null ? exactTip : calculatedTipAmount;
  const displayTotal = exactTotal !== null ? exactTotal : (fallbackSubtotal + displayTax + displayTip);

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
          idempotencyKey: checkoutIdempotencyKey.current,
          taxRate: activeLocation.taxRate,
          tipAmount: calculatedTipAmountCents
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Payment processing failed');
      }

      const data = await response.json();
      console.log('Order created:', data);
      
      clearCart();
      
      if (data.order && data.order.id) {
        window.location.href = `/success?orderId=${data.order.id}`;
      } else {
        window.location.href = `/success`;
      }
    } catch (err: any) {
      console.error('Error completing order:', err);
      setCheckoutError(err.message || 'There was an issue processing your order. Please try again.');
    }
  };

  if (!isMounted) return null; // Prevent hydration mismatch

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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--sw-text-muted)' }}>
              <span>Tax (Exact)</span>
              <span>${displayTax.toFixed(2)}</span>
            </div>
            {displayTip > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--sw-text-muted)' }}>
                <span>Tip</span>
                <span>${displayTip.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: '1.3rem', marginTop: displayTip === 0 ? '1rem' : 0 }}>
              <span>Total</span>
              <span>${displayTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Tipping Section */}
        <div style={{ padding: '1.5rem', background: 'var(--sw-surface)', borderRadius: '20px', border: '1px solid var(--sw-border)', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontWeight: 800 }}>Add a Tip</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--sw-text-muted)', marginBottom: '1rem' }}>Support the kitchen staff!</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {[0.15, 0.20, 0.25].map(pct => (
              <button 
                key={pct}
                onClick={() => { setTipPercentage(pct); setCustomTip(''); }}
                style={{
                  flex: 1, padding: '0.8rem', borderRadius: '12px', fontWeight: 800,
                  border: tipPercentage === pct ? '2px solid var(--sw-red)' : '1px solid var(--sw-border)',
                  backgroundColor: tipPercentage === pct ? '#fef2f2' : '#f9fafb',
                  color: tipPercentage === pct ? 'var(--sw-red)' : 'inherit',
                  cursor: 'pointer'
                }}>
                {pct * 100}%
              </button>
            ))}
            <button
              onClick={() => { setTipPercentage(null); }}
              style={{
                flex: 1, padding: '0.8rem', borderRadius: '12px', fontWeight: 800,
                border: tipPercentage === null ? '2px solid var(--sw-red)' : '1px solid var(--sw-border)',
                backgroundColor: tipPercentage === null ? '#fef2f2' : '#f9fafb',
                color: tipPercentage === null ? 'var(--sw-red)' : 'inherit',
                cursor: 'pointer'
              }}>
              Custom
            </button>
          </div>
          {tipPercentage === null && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              <span style={{ fontWeight: 800 }}>$</span>
              <input 
                type="number" 
                value={customTip}
                onChange={(e) => setCustomTip(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--sw-border)', backgroundColor: '#f9fafb', fontSize: '1rem' }}
              />
            </div>
          )}
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
          
          {checkoutError && (
            <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '12px', textAlign: 'center', marginBottom: '1rem', fontWeight: 700 }}>
              {checkoutError}
            </div>
          )}

          {storeStatus.open && fallbackSubtotal >= 5 ? (
            /* Square Web Payments SDK */
            <PaymentForm
            applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!}
            cardTokenizeResponseReceived={handlePaymentSuccess}
            createPaymentRequest={() => ({
              countryCode: 'US',
              currencyCode: 'USD',
              total: {
                amount: displayTotal.toFixed(2),
                label: 'Smashd Waffle House',
              },
            })}
            locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!}
          >
            <div style={{ marginBottom: '1rem' }}>
              <ApplePay />
              <GooglePay />
            </div>
            
            <div style={{ margin: '1.5rem 0', display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1, borderTop: '1px solid var(--sw-border)' }}></div>
              <div style={{ padding: '0 1rem', fontSize: '0.85rem', color: 'var(--sw-text-muted)', fontWeight: 700 }}>OR PAY WITH CARD</div>
              <div style={{ flex: 1, borderTop: '1px solid var(--sw-border)' }}></div>
            </div>

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
                  marginTop: '0.5rem',
                  '&:hover': {
                    backgroundColor: '#cc0000',
                  }
                }
              }}
            />
          </PaymentForm>
          ) : (
            <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', fontWeight: 700 }}>
              {!storeStatus.open ? `🛑 ${storeStatus.message}` : `⚠️ Order must be at least $5.00`}
            </div>
          )}

          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--sw-text-muted)', marginTop: '1rem' }}>
            By placing your order, you agree to our Terms of Service and Privacy Policy. Payments are processed securely via Square.
          </p>
        </div>

      </div>
    </main>
  );
}
