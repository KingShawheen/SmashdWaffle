import Link from 'next/link';

export default function Cart() {
  return (
    <main className="smash-waffle-container" style={{ paddingTop: '3rem', paddingBottom: '8rem' }}>
      <div className="sw-animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 800 }}>Your Cart</h1>
          <span style={{ background: 'var(--sw-primary)', padding: '4px 12px', borderRadius: '99px', fontWeight: 700, fontSize: '0.85rem' }}>2 Items</span>
        </div>
        
        {/* Cart Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          
          <div style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'var(--sw-surface)', borderRadius: '16px', border: '1px solid var(--sw-border)' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', background: '#f3f4f6', flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1562376552-0d160a2f9fc4?q=80&w=200&auto=format&fit=crop" alt="Waffle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Breakfast SMASH</h3>
                <span style={{ fontWeight: 800 }}>$15.00</span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--sw-text-muted)' }}>+ Side of Salsa</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'var(--sw-surface)', borderRadius: '16px', border: '1px solid var(--sw-border)' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', background: '#f3f4f6', flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1504113888839-1c8eb50233d3?q=80&w=200&auto=format&fit=crop" alt="Coffee" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Americano (16oz)</h3>
                <span style={{ fontWeight: 800 }}>$3.50</span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--sw-text-muted)' }}>Iced, Extra Shot</p>
            </div>
          </div>

        </div>

        {/* Order Summary */}
        <div style={{ padding: '1.5rem', background: '#f9fafb', borderRadius: '20px', border: '1px solid var(--sw-border)' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontWeight: 800 }}>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--sw-text-muted)' }}>
            <span>Subtotal</span>
            <span>$18.50</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--sw-text-muted)' }}>
            <span>Tax (8.9%)</span>
            <span>$1.65</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--sw-border)', fontWeight: 800, fontSize: '1.25rem' }}>
            <span>Total</span>
            <span>$20.15</span>
          </div>
        </div>

        {/* Checkout Button */}
        <div style={{ marginTop: '2rem' }}>
          <Link href="/checkout" style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }} className="sw-btn sw-btn-primary sw-btn-lg">
            <span>Secure Checkout</span>
            <span>$20.15</span>
          </Link>
          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--sw-text-muted)', marginTop: '1rem' }}>
            🔒 Payments secured by Stripe
          </p>
        </div>
      </div>
    </main>
  );
}
