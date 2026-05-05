import { ShoppingCart, ChevronLeft, Plus } from 'lucide-react';
import Link from 'next/link';

export default function Menu() {
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
        <button style={{ backgroundColor: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.8)', fontWeight: 600, fontSize: '0.9rem', padding: '0.4rem 1rem', borderRadius: '50px', whiteSpace: 'nowrap' }}>Drinks</button>
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

    </main>
  );
}
