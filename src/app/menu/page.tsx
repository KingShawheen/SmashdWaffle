"use client";

import { useState, useEffect } from 'react';
import { ShoppingCart, ChevronLeft, Plus, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { MenuItem, FoodItem, DrinkItem, FOOD_ITEMS, COFFEE_ITEMS, NON_COFFEE_ITEMS } from './data';
import { useCartStore } from '../../store/cartStore';
import { useUiStore } from '../../store/uiStore';

export default function Menu() {
  const [activeTab, setActiveTab] = useState<'food' | 'drinks'>('food');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  
  // Square Catalog Data States
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [coffeeItems, setCoffeeItems] = useState<DrinkItem[]>([]);
  const [nonCoffeeItems, setNonCoffeeItems] = useState<DrinkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Customization States
  const [modifierTotal, setModifierTotal] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<{size: string, price: number} | null>(null);
  const [activeModifiers, setActiveModifiers] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  
  const cartCount = useCartStore((state) => state.getCartCount());
  const addToCart = useCartStore((state) => state.addToCart);
  
  const setActiveMenuTab = useUiStore((state) => state.setActiveMenuTab);

  // Sync the local activeTab to the global uiStore so the DesktopSlideshow updates
  useEffect(() => {
    setActiveMenuTab(activeTab);
  }, [activeTab, setActiveMenuTab]);
  
  // Reset when leaving the menu
  useEffect(() => {
    return () => {
      setActiveMenuTab('food');
    };
  }, [setActiveMenuTab]);

  // Fetch Menu from Square
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/api/menu');
        const json = await res.json();
        
        if (json.success && json.catalog) {
          const squareItems = json.catalog;
          
          const mergeWithSquare = (localItems: any[]) => {
            return localItems.map(local => {
              const sqItem = squareItems.find((s: any) => s.itemData?.name === local.title);
              if (sqItem) {
                // Found in Square! Merge live prices.
                if (local.type === 'food') {
                  const variation = sqItem.itemData?.variations?.[0];
                  const price = variation ? (variation.itemVariationData.priceMoney.amount / 100) : local.basePrice;
                  return { ...local, basePrice: price, squareId: sqItem.id, squareVariationId: variation?.id };
                } else {
                  const prices = sqItem.itemData?.variations?.map((v: any) => ({
                    size: v.itemVariationData.name,
                    price: v.itemVariationData.priceMoney.amount / 100,
                    squareVariationId: v.id
                  })) || local.prices;
                  return { ...local, prices, squareId: sqItem.id };
                }
              }
              return { ...local, isSoldOut: true }; // Not found in Square catalog
            });
          };

          setFoodItems(mergeWithSquare(FOOD_ITEMS));
          setCoffeeItems(mergeWithSquare(COFFEE_ITEMS));
          setNonCoffeeItems(mergeWithSquare(NON_COFFEE_ITEMS));
        } else {
          // Fallback to static if square fails
          setFoodItems(FOOD_ITEMS);
          setCoffeeItems(COFFEE_ITEMS);
          setNonCoffeeItems(NON_COFFEE_ITEMS);
        }
      } catch (err) {
        console.error("Error fetching Square menu:", err);
        // Fallback
        setFoodItems(FOOD_ITEMS);
        setCoffeeItems(COFFEE_ITEMS);
        setNonCoffeeItems(NON_COFFEE_ITEMS);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMenu();
    setIsMounted(true);
  }, []);

  // Reset modifiers when item changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setModifierTotal(0);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveModifiers([]);
    if (selectedItem?.type === 'coffee' || selectedItem?.type === 'non-coffee') {
      const drink = selectedItem as DrinkItem;
      // Default to the second size if available, otherwise first
      const defaultSize = drink.prices.length > 1 ? drink.prices[1] : drink.prices[0];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedSize(defaultSize);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedSize(null);
    }
  }, [selectedItem]);

  const handleToggleModifier = (name: string, price: number) => {
    if (activeModifiers.includes(name)) {
      setActiveModifiers(activeModifiers.filter(m => m !== name));
      setModifierTotal(prev => prev - price);
    } else {
      setActiveModifiers([...activeModifiers, name]);
      setModifierTotal(prev => prev + price);
    }
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;
    
    let basePrice = 0;
    let sizeLabel = undefined;
    let imageUrl;
    let emoji;
    
    if (selectedItem.type === 'food') {
      basePrice = (selectedItem as FoodItem).basePrice;
      imageUrl = (selectedItem as FoodItem).imageUrl;
      emoji = (selectedItem as FoodItem).emojis;
    } else {
      basePrice = selectedSize ? selectedSize.price : (selectedItem as DrinkItem).prices[0].price;
      sizeLabel = selectedSize ? selectedSize.size : (selectedItem as DrinkItem).prices[0].size;
      emoji = (selectedItem as DrinkItem).emoji;
      imageUrl = (selectedItem as DrinkItem).imageUrl;
    }

    const finalPrice = basePrice + modifierTotal;

    // Create modifier array with prices
    const modifierObjects: any[] = [];

    addToCart({
      menuItemId: selectedItem.id,
      title: selectedItem.title,
      type: selectedItem.type,
      basePrice: basePrice,
      price: finalPrice,
      modifiers: modifierObjects,
      quantity: 1,
      size: sizeLabel,
      imageUrl: imageUrl,
      emoji: emoji,
      squareVariationId: (selectedItem as any).squareVariationId
    });
    
    setSelectedItem(null); // Close modal
  };

  const closeSheet = () => setSelectedItem(null);

  const calculateCurrentPrice = () => {
    if (!selectedItem) return 0;
    let base = 0;
    if (selectedItem.type === 'food') base = (selectedItem as FoodItem).basePrice;
    if (selectedItem.type === 'coffee' || selectedItem.type === 'non-coffee') {
      base = selectedSize ? selectedSize.price : 0;
    }
    return base + modifierTotal;
  };

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
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <div style={{ fontSize: '1.2rem', letterSpacing: '4px' }}>{food.emojis}</div>
                {food.dietary && food.dietary.map(tag => (
                  <span key={tag} style={{ 
                    backgroundColor: tag === 'V' ? '#dcfce7' : '#fef3c7', 
                    color: tag === 'V' ? '#166534' : '#92400e', 
                    fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' 
                  }}>{tag}</span>
                ))}
              </div>
            </div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>${food.basePrice.toFixed(2)}</span>
          </div>
          <p style={{ color: 'var(--sw-text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: 1.4 }}>
            {food.description}
          </p>
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
            {drink.prices.map((p) => {
              const isSelected = selectedSize?.size === p.size;
              return (
                <label key={p.size} style={{ 
                  flex: 1, minWidth: '70px',
                  border: isSelected ? '2px solid var(--sw-red)' : '1px solid var(--sw-border)', 
                  backgroundColor: isSelected ? '#fef2f2' : 'var(--sw-surface)',
                  borderRadius: '8px', padding: '0.5rem', textAlign: 'center', cursor: 'pointer' 
                }}>
                  <input type="radio" name="size" onChange={() => setSelectedSize(p)} checked={isSelected} style={{ display: 'none' }} />
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.25rem' }}>{p.size}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--sw-text-muted)' }}>${p.price.toFixed(2)}</div>
                </label>
              );
            })}
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
          {isMounted && cartCount > 0 && (
            <div style={{ 
              position: 'absolute', top: 0, right: 0, 
              background: '#111', color: 'white', 
              borderRadius: '50%', width: '18px', height: '18px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontSize: '0.65rem', fontWeight: 'bold' 
            }}>{cartCount}</div>
          )}
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
              position: 'relative', zIndex: 2, backgroundColor: 'transparent', border: 'none' 
            }}
          >
            Signature Breakfast
          </button>
          <button 
            onClick={() => setActiveTab('drinks')}
            style={{ 
              flex: 1, padding: '0.6rem 0', fontWeight: 800, fontSize: '0.95rem', 
              color: activeTab === 'drinks' ? 'var(--sw-text)' : 'var(--sw-text-muted)', 
              position: 'relative', zIndex: 2, backgroundColor: 'transparent', border: 'none' 
            }}
          >
            Coffee & Drinks
          </button>
        </div>
      </div>

      {/* Dynamic Content Rendering */}
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
          <Loader2 size={32} color="var(--sw-red)" className="animate-spin" />
        </div>
      ) : activeTab === 'food' ? (
        <div className="sw-animate-fade-in">
          {/* Product Grid */}
          <div style={{ padding: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {foodItems.map((item) => (
              <div 
                key={item.id} 
                onClick={() => !item.isSoldOut && setSelectedItem(item)}
                style={{ 
                  backgroundColor: 'var(--sw-surface)', borderRadius: '16px', overflow: 'hidden', 
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid var(--sw-border)', 
                  display: 'flex', flexDirection: 'column', cursor: item.isSoldOut ? 'not-allowed' : 'pointer',
                  opacity: item.isSoldOut ? 0.5 : 1
                }}
              >
                <div style={{ position: 'relative', height: '140px', background: item.emojiBg, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {item.imageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '3rem', opacity: 0.3 }}>🧇</span>
                  )}
                  {item.isChefChoice && (
                    <div style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: 'var(--sw-yellow)', padding: '4px 8px', borderRadius: '8px', fontSize: '0.65rem', fontWeight: 800, zIndex: 10 }}>Chef&apos;s Choice</div>
                  )}
                </div>
                <div style={{ padding: '0.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.2rem', lineHeight: 1.2 }}>{item.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <div style={{ fontSize: '0.9rem', letterSpacing: '2px' }}>{item.emojis}</div>
                    {item.dietary && item.dietary.map(tag => (
                      <span key={tag} style={{ 
                        backgroundColor: tag === 'V' ? '#dcfce7' : '#fef3c7', 
                        color: tag === 'V' ? '#166534' : '#92400e', 
                        fontSize: '0.6rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' 
                      }}>{tag}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--sw-text-muted)', marginBottom: '1rem', lineHeight: 1.3, flex: 1 }}>{item.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>
                      {item.isSoldOut ? <span style={{ color: '#ef4444' }}>SOLD OUT</span> : `$${item.basePrice.toFixed(2)}`}
                    </span>
                    <button style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: item.isSoldOut ? '#e5e7eb' : 'var(--sw-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', pointerEvents: 'none' }}>
                      <Plus size={18} color={item.isSoldOut ? '#9ca3af' : 'black'} strokeWidth={3} />
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
              {coffeeItems.map(drink => (
                <div 
                  key={drink.id} 
                  onClick={() => !drink.isSoldOut && setSelectedItem(drink)} 
                  style={{ 
                    display: 'flex', alignItems: 'center', backgroundColor: 'var(--sw-surface)', 
                    padding: '1rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', 
                    border: '1px solid var(--sw-border)', cursor: drink.isSoldOut ? 'not-allowed' : 'pointer',
                    opacity: drink.isSoldOut ? 0.5 : 1
                  }}
                >
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginRight: '1rem', flexShrink: 0, overflow: 'hidden' }}>
                    {drink.imageUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={drink.imageUrl} alt={drink.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      drink.emoji
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.2rem' }}>{drink.title}</h4>
                    <div style={{ color: 'var(--sw-text-muted)', fontSize: '0.75rem', lineHeight: 1.3 }}>{drink.description}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginLeft: '1rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                      {drink.isSoldOut ? <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>SOLD OUT</span> : `$${drink.prices[0].price.toFixed(2)}+`}
                    </span>
                    <button style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: drink.isSoldOut ? '#e5e7eb' : 'var(--sw-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', marginTop: '0.25rem', pointerEvents: 'none' }}>
                      <Plus size={16} color={drink.isSoldOut ? '#9ca3af' : 'black'} strokeWidth={3} />
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
              {nonCoffeeItems.map(drink => (
                <div 
                  key={drink.id} 
                  onClick={() => !drink.isSoldOut && setSelectedItem(drink)} 
                  style={{ 
                    display: 'flex', alignItems: 'center', backgroundColor: 'var(--sw-surface)', 
                    padding: '1rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', 
                    border: '1px solid var(--sw-border)', cursor: drink.isSoldOut ? 'not-allowed' : 'pointer',
                    opacity: drink.isSoldOut ? 0.5 : 1
                  }}
                >
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginRight: '1rem', flexShrink: 0, overflow: 'hidden' }}>
                    {drink.imageUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={drink.imageUrl} alt={drink.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      drink.emoji
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.2rem' }}>{drink.title}</h4>
                    <div style={{ color: 'var(--sw-text-muted)', fontSize: '0.75rem', lineHeight: 1.3 }}>{drink.description}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginLeft: '1rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                      {drink.isSoldOut ? <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>SOLD OUT</span> : `$${drink.prices[0].price.toFixed(2)}+`}
                    </span>
                    <button style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: drink.isSoldOut ? '#e5e7eb' : 'var(--sw-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', marginTop: '0.25rem', pointerEvents: 'none' }}>
                      <Plus size={16} color={drink.isSoldOut ? '#9ca3af' : 'black'} strokeWidth={3} />
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
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)', 
          zIndex: 10000, 
          opacity: selectedItem ? 1 : 0, 
          pointerEvents: selectedItem ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          alignItems: 'center'
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
            width: '100%', maxWidth: '480px',
            overflowY: 'auto',
            transform: selectedItem ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            display: 'flex', flexDirection: 'column', position: 'relative'
          }}
        >
          {/* Header Close Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{ width: '40px', height: '5px', backgroundColor: '#d1d5db', borderRadius: '5px' }}></div>
          </div>
          
          <button 
            onClick={closeSheet}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', backgroundColor: '#f3f4f6', borderRadius: '50%', padding: '0.4rem', border: 'none', display: 'flex', zIndex: 10 }}
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
            <button 
              onClick={handleAddToCart}
              style={{ 
              width: '100%', padding: '1rem', backgroundColor: 'var(--sw-red)', color: 'white', 
              fontSize: '1.1rem', fontWeight: 800, borderRadius: '50px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              border: 'none', cursor: 'pointer'
            }}>
              <span>Add to Cart</span>
              <span>${calculateCurrentPrice().toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>

    </main>
  );
}
