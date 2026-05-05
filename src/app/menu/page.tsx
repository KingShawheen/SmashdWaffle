"use client";

import { useState } from 'react';
import { ShoppingCart, ChevronLeft, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { FOOD_ITEMS, COFFEE_ITEMS, NON_COFFEE_ITEMS, MenuItem, FoodItem, DrinkItem } from './data';

export default function Menu() {
  const [activeTab, setActiveTab] = useState<'food' | 'drinks'>('food');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const closeSheet = () => setSelectedItem(null);

  // Helper to render the modifier sheet content
  const renderSheetContent = () => {
    if (!selectedItem) return null;

    if (selectedItem.type === 'food') {
      const food = selectedItem as FoodItem;
      return (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.2rem' }}>{food.title}</h2>
              <div style={{ fontSize: '1.2rem', letterSpacing: '4px', marginBottom: '0.25rem' }}>{food.emojis}</div>
            </div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>${food.basePrice.toFixed(2)}</span>
          </div>
          <p style={{ color: 'var(--sw-text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: 1.4 }}>
            {food.description}
          </p>

          <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--sw-border)' }}>Popular Sides</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--sw-red)' }} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Side of Bacon (3 Slices)</span>
              </div>
              <span style={{ color: 'var(--sw-text-muted)', fontSize: '0.85rem' }}>+$3.50</span>
            </label>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--sw-red)' }} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Side of Sausage</span>
              </div>
              <span style={{ color: 'var(--sw-text-muted)', fontSize: '0.85rem' }}>+$3.00</span>
            </label>
          </div>

          <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--sw-border)' }}>Upgrades & Extras</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--sw-red)' }} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Extra Cheese</span>
              </div>
              <span style={{ color: 'var(--sw-text-muted)', fontSize: '0.85rem' }}>+$1.00</span>
            </label>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--sw-red)' }} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Chocolate Sauce</span>
              </div>
              <span style={{ color: 'var(--sw-text-muted)', fontSize: '0.85rem' }}>+$0.75</span>
            </label>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--sw-red)' }} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Extra Caramel</span>
              </div>
              <span style={{ color: 'var(--sw-text-muted)', fontSize: '0.85rem' }}>+$0.75</span>
            </label>
          </div>
        </>
      );
    } else {
      const drink = selectedItem as DrinkItem;
      return (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.2rem' }}>{drink.title}</h2>
          </div>
          
          <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--sw-border)' }}>Select Size</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {drink.prices.map((p, i) => (
              <label key={p.size} style={{ 
                flex: 1, minWidth: '70px',
                border: i === 1 ? '2px solid var(--sw-red)' : '1px solid var(--sw-border)', 
                backgroundColor: i === 1 ? '#fef2f2' : 'var(--sw-surface)',
                borderRadius: '8px', padding: '0.5rem', textAlign: 'center', cursor: 'pointer' 
              }}>
                <input type="radio" name="size" defaultChecked={i === 1} style={{ display: 'none' }} />
                <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.25rem' }}>{p.size}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--sw-text-muted)' }}>${p.price.toFixed(2)}</div>
              </label>
            ))}
          </div>

          <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--sw-border)' }}>Espresso Options</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--sw-red)' }} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Extra Shot of Espresso</span>
              </div>
              <span style={{ color: 'var(--sw-text-muted)', fontSize: '0.85rem' }}>+$1.00</span>
            </label>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--sw-red)' }} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Decaf</span>
              </div>
              <span style={{ color: 'var(--sw-text-muted)', fontSize: '0.85rem' }}>Free</span>
            </label>
          </div>

          <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--sw-border)' }}>Dairy & Alternatives</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {['Whole Milk (Free)', 'Half n Half (+$0.50)', 'Oat Milk (+$0.75)', 'Almond Milk (+$0.75)'].map((milk, idx) => (
              <label key={milk} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="radio" name="milk" defaultChecked={idx === 0} style={{ width: '18px', height: '18px', accentColor: 'var(--sw-red)' }} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{milk}</span>
              </label>
            ))}
          </div>

          <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--sw-border)' }}>Flavors & Sauces</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--sw-red)' }} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Extra Caramel</span>
              </div>
              <span style={{ color: 'var(--sw-text-muted)', fontSize: '0.85rem' }}>+$0.75</span>
            </label>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--sw-red)' }} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Vanilla Syrup</span>
              </div>
              <span style={{ color: 'var(--sw-text-muted)', fontSize: '0.85rem' }}>+$0.50</span>
            </label>
          </div>
        </>
      );
    }
  };

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
            <button style={{ backgroundColor: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.8)', fontWeight: 600, fontSize: '0.9rem', padding: '0.4rem 1rem', borderRadius: '50px', whiteSpace: 'nowrap' }}>Savory Smash&apos;d</button>
            <button style={{ backgroundColor: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.8)', fontWeight: 600, fontSize: '0.9rem', padding: '0.4rem 1rem', borderRadius: '50px', whiteSpace: 'nowrap' }}>Sides</button>
          </div>

          {/* Product Grid */}
          <div style={{ padding: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {FOOD_ITEMS.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedItem(item)}
                style={{ 
                  backgroundColor: 'var(--sw-surface)', borderRadius: '16px', overflow: 'hidden', 
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid var(--sw-border)', 
                  display: 'flex', flexDirection: 'column', cursor: 'pointer' 
                }}
              >
                <div style={{ position: 'relative', height: '140px', background: item.emojiBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '3rem', opacity: 0.3 }}>🧇</span>
                  {item.isChefChoice && (
                    <div style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: 'var(--sw-yellow)', padding: '4px 8px', borderRadius: '8px', fontSize: '0.65rem', fontWeight: 800 }}>Chef&apos;s Choice</div>
                  )}
                </div>
                <div style={{ padding: '0.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.2rem', lineHeight: 1.2 }}>{item.title}</h3>
                  <div style={{ fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '0.25rem' }}>{item.emojis}</div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--sw-text-muted)', marginBottom: '1rem', lineHeight: 1.3, flex: 1 }}>{item.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>${item.basePrice.toFixed(2)}</span>
                    <button style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--sw-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', pointerEvents: 'none' }}>
                      <Plus size={18} color="black" strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="sw-animate-fade-in" style={{ padding: '0.5rem 1rem 1rem' }}>
          {/* Coffee Menu Section */}
          <div style={{ marginTop: '0.5rem' }}>
            <h3 style={{ fontWeight: 900, marginBottom: '1rem', fontSize: '1.2rem', paddingLeft: '0.5rem' }}>Hot & Iced Coffee</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {COFFEE_ITEMS.map(drink => (
                <div 
                  key={drink.id} 
                  onClick={() => setSelectedItem(drink)} 
                  style={{ 
                    display: 'flex', alignItems: 'center', backgroundColor: 'var(--sw-surface)', 
                    padding: '1rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', 
                    border: '1px solid var(--sw-border)', cursor: 'pointer' 
                  }}
                >
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginRight: '1rem', flexShrink: 0 }}>
                    {drink.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.2rem' }}>{drink.title}</h4>
                    <div style={{ color: 'var(--sw-text-muted)', fontSize: '0.75rem', lineHeight: 1.3 }}>{drink.description}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginLeft: '1rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>${drink.prices[0].price.toFixed(2)}+</span>
                    <button style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--sw-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', marginTop: '0.25rem', pointerEvents: 'none' }}>
                      <Plus size={16} color="black" strokeWidth={3} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Non-Coffee Menu Section */}
          <div style={{ marginTop: '2.5rem' }}>
            <h3 style={{ fontWeight: 900, marginBottom: '1rem', fontSize: '1.2rem', paddingLeft: '0.5rem' }}>Non-Coffee & Juice</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {NON_COFFEE_ITEMS.map(drink => (
                <div 
                  key={drink.id} 
                  onClick={() => setSelectedItem(drink)} 
                  style={{ 
                    display: 'flex', alignItems: 'center', backgroundColor: 'var(--sw-surface)', 
                    padding: '1rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', 
                    border: '1px solid var(--sw-border)', cursor: 'pointer' 
                  }}
                >
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginRight: '1rem', flexShrink: 0 }}>
                    {drink.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.2rem' }}>{drink.title}</h4>
                    <div style={{ color: 'var(--sw-text-muted)', fontSize: '0.75rem', lineHeight: 1.3 }}>{drink.description}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginLeft: '1rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>${drink.prices[0].price.toFixed(2)}+</span>
                    <button style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--sw-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', marginTop: '0.25rem', pointerEvents: 'none' }}>
                      <Plus size={16} color="black" strokeWidth={3} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* iOS-Style Bottom Sheet Modal for Item Customization */}
      <div 
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)', 
          zIndex: 10000, 
          opacity: selectedItem ? 1 : 0, 
          pointerEvents: selectedItem ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
        }}
        onClick={closeSheet}
      >
        <div 
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: 'var(--sw-surface)', 
            borderTopLeftRadius: '24px', borderTopRightRadius: '24px',
            padding: '1.5rem', 
            maxHeight: '90vh', 
            overflowY: 'auto',
            transform: selectedItem ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            display: 'flex', flexDirection: 'column'
          }}
        >
          {/* Header Close Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{ width: '40px', height: '5px', backgroundColor: '#d1d5db', borderRadius: '5px' }}></div>
          </div>
          
          <button 
            onClick={closeSheet}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', backgroundColor: '#f3f4f6', borderRadius: '50%', padding: '0.4rem', border: 'none', display: 'flex' }}
          >
            <X size={20} color="#4b5563" />
          </button>

          {/* Dynamic Content */}
          <div style={{ flex: 1, paddingBottom: '80px' }}>
            {renderSheetContent()}
          </div>

          {/* Sticky Add To Cart Button */}
          <div style={{ 
            position: 'absolute', bottom: 0, left: 0, right: 0, 
            padding: '1rem', backgroundColor: 'var(--sw-surface)', 
            borderTop: '1px solid var(--sw-border)' 
          }}>
            <button style={{ 
              width: '100%', padding: '1rem', backgroundColor: 'var(--sw-red)', color: 'white', 
              fontSize: '1.1rem', fontWeight: 800, borderRadius: '50px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <span>Add to Cart</span>
              <span>{selectedItem && selectedItem.type === 'food' ? `$${(selectedItem as FoodItem).basePrice.toFixed(2)}` : '$4.00'}</span>
            </button>
          </div>
        </div>
      </div>

    </main>
  );
}
