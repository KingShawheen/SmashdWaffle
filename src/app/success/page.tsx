"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [orderStatus, setOrderStatus] = useState<string>('OPEN');

  // Poll Square API for Order Status
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (orderId && orderStatus !== 'COMPLETED') {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/orders/${orderId}`);
          const data = await res.json();
          if (data.success && data.order) {
            // Fulfillments have granular states (PROPOSED, PREPARED, COMPLETED)
            const fulfillment = data.order.fulfillments?.[0];
            if (fulfillment?.state) {
              setOrderStatus(fulfillment.state);
            } else if (data.order.state) {
              setOrderStatus(data.order.state);
            }
          }
        } catch (err) {
          console.error("Failed to poll order status", err);
        }
      }, 3000); // Poll every 3 seconds for faster feedback
    }
    return () => clearInterval(interval);
  }, [orderId, orderStatus]);

  const isReady = ['PREPARED', 'COMPLETED'].includes(orderStatus);
  const [hasNotified, setHasNotified] = useState(false);

  // Trigger Notification when Ready
  useEffect(() => {
    if (isReady && !hasNotified) {
      setHasNotified(true);
      
      // Haptic Feedback (Android / Supported devices)
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 400]);
      }

      // Audio "Ding" using Web Audio API
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          
          // High chime
          const osc1 = ctx.createOscillator();
          const gain1 = ctx.createGain();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(880, ctx.currentTime); // A5
          gain1.gain.setValueAtTime(0.5, ctx.currentTime);
          gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
          osc1.connect(gain1);
          gain1.connect(ctx.destination);
          osc1.start();
          osc1.stop(ctx.currentTime + 0.6);

          // Second chime slightly delayed
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(1108.73, ctx.currentTime + 0.15); // C#6
          gain2.gain.setValueAtTime(0, ctx.currentTime);
          gain2.gain.setValueAtTime(0.5, ctx.currentTime + 0.15);
          gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start(ctx.currentTime + 0.15);
          osc2.stop(ctx.currentTime + 0.8);
        }
      } catch (e) {
        console.error("Audio notification failed", e);
      }
    }
  }, [isReady, hasNotified]);

  return (
    <main style={{ backgroundColor: 'var(--sw-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '1.5rem', paddingTop: 'env(safe-area-inset-top, 3rem)' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '2rem' }}>
        <div className="sw-animate-fade-in" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <CheckCircle2 color="var(--sw-green, #22c55e)" size={80} />
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>Order Confirmed!</h1>
        <p style={{ color: 'var(--sw-text-muted)', lineHeight: 1.5 }}>
          Your payment was successful. The kitchen has received your ticket.
        </p>
        
        {/* Removed debug block */}
      </div>

      {/* Order Status Tracker */}
      <div style={{ padding: '1.5rem', backgroundColor: 'var(--sw-surface)', borderRadius: '16px', border: '1px solid var(--sw-border)', textAlign: 'left', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem' }}>Live Order Status</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
          {/* Connecting line */}
          <div style={{ position: 'absolute', left: '11px', top: '24px', bottom: '24px', width: '2px', backgroundColor: isReady ? 'var(--sw-green)' : 'var(--sw-border)', zIndex: 1, transition: 'background-color 0.5s ease' }}></div>
          
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
             <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: isReady ? 'var(--sw-green)' : 'var(--sw-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
               {isReady ? <CheckCircle2 size={14} color="white" /> : <div style={{ width: '8px', height: '8px', backgroundColor: 'black', borderRadius: '50%' }}></div>}
             </div>
             <div>
               <p style={{ fontWeight: 800, margin: '0 0 0.25rem 0', color: 'var(--sw-text)' }}>{isReady ? 'Prepared' : 'In the Kitchen'}</p>
               <p style={{ fontSize: '0.85rem', color: 'var(--sw-text-muted)', margin: 0 }}>{isReady ? 'The chefs have finished your order.' : 'Our chefs are smashing your waffles right now.'}</p>
             </div>
          </div>

          {/* Step 3 */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
             <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: isReady ? 'var(--sw-green)' : 'var(--sw-surface)', border: isReady ? 'none' : '2px solid var(--sw-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px', transition: 'all 0.3s ease' }}>
               {isReady && <CheckCircle2 size={14} color="white" />}
             </div>
             <div>
               <p style={{ fontWeight: 800, margin: '0 0 0.25rem 0', color: isReady ? 'var(--sw-text)' : 'var(--sw-text-muted)' }}>Ready for Pickup</p>
               <p style={{ fontSize: '0.85rem', color: isReady ? 'var(--sw-green)' : 'var(--sw-text-muted)', margin: 0, fontWeight: isReady ? 800 : 400 }}>{isReady ? 'Come grab your order at the counter!' : 'We will notify you here when it\'s ready.'}</p>
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

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading order status...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
