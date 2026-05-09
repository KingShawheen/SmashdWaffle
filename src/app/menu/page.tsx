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
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
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

  const handleOpenItemModal = (item: any) => {
    setSelectedItem(item);
    if (item.type !== 'food' && item.prices && item.prices.length > 0) {
      // Default size selection
      const defaultSize = item.prices.length > 1 ? item.prices[1] : item.prices[0];
      setSelectedSize(defaultSize);
    } else {
      setSelectedSize(null);
    }
  };

  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  const handleQuickAdd = (item: any) => {
    if (item.isSoldOut) return;
    
    if (item.type === 'food') {
      addToCart({
        menuItemId: item.id,
        title: item.title,
        type: item.type,
        basePrice: item.basePrice,
        price: item.basePrice,
        modifiers: [],
        quantity: 1,
        size: undefined,
        imageUrl: item.imageUrl,
        emoji: item.emojis,
        squareVariationId: item.squareVariationId
      });
      setToastMessage(`Added ${item.title} to cart`);
      setTimeout(() => setToastMessage(null), 2000);
    } else {
      // For drinks, opening the modal is required to pick a size
      handleOpenItemModal(item);
    }
  };

  const handleInlineAddToCart = (drink: any) => {
    const sizeLabel = selectedSize ? selectedSize.size : drink.prices[0].size;
    const finalPrice = selectedSize ? selectedSize.price : drink.prices[0].price;

    addToCart({
      menuItemId: drink.id,
      title: drink.title,
      type: drink.type,
      basePrice: finalPrice,
      price: finalPrice,
      modifiers: [],
      quantity: 1,
      size: sizeLabel,
      imageUrl: drink.imageUrl,
      emoji: drink.emoji,
      squareVariationId: selectedSize ? selectedSize.squareVariationId : drink.prices[0].squareVariationId
    });
    
    setToastMessage(`Added ${drink.title} to cart`);
    setTimeout(() => setToastMessage(null), 2000);
    setExpandedItemId(null);
    setSelectedItem(null);
  };

  const renderDrinkList = (items: any[]) => {
    return items.map(drink => {
      const isExpanded = expandedItemId === drink.id;
      return (
        <div 
          id={`drink-card-${drink.id}`}
          key={drink.id} 
          style={{ 
            display: 'flex', flexDirection: 'column', backgroundColor: 'var(--sw-surface)', 
            borderRadius: '16px', boxShadow: isExpanded ? '0 8px 25px rgba(0,0,0,0.06)' : '0 4px 15px rgba(0,0,0,0.03)', 
            border: isExpanded ? '1px solid var(--sw-navy)' : '1px solid var(--sw-border)',
            opacity: drink.isSoldOut ? 0.5 : 1,
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {/* Main Card Header */}
          <div 
            onClick={() => handleOpenItemModal(drink)}
            style={{ display: 'flex', alignItems: 'center', padding: '1rem', cursor: drink.isSoldOut ? 'not-allowed' : 'pointer' }}
          >
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: drink.type === 'coffee' ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' : 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginRight: '1rem', flexShrink: 0, overflow: 'hidden' }}>
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
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickAdd(drink);
                }}
                style={{ 
                width: '28px', height: '28px', borderRadius: '50%', 
                backgroundColor: drink.isSoldOut ? '#e5e7eb' : 'var(--sw-yellow)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', 
                marginTop: '0.25rem', cursor: drink.isSoldOut ? 'not-allowed' : 'pointer',
                transition: 'transform 0.3s ease, background-color 0.3s ease'
              }}>
                <Plus size={16} color={drink.isSoldOut ? '#9ca3af' : 'black'} strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* Sleek Overlay Expansion Area (Slides in from the right) */}
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            transform: isExpanded ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            display: 'flex', alignItems: 'center', padding: '0 0.5rem',
            zIndex: 10
          }}>
            <button 
              onClick={(e) => { e.stopPropagation(); setExpandedItemId(null); }} 
              style={{ border: 'none', background: 'transparent', padding: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={20} color="var(--sw-text-muted)" />
            </button>
            
            <div style={{ flex: 1, display: 'flex', gap: '0.5rem', padding: '0 0.5rem' }}>
              {drink.prices.map((p: any) => {
                const isSelected = selectedSize?.size === p.size;
                return (
                  <button 
                    key={p.size}
                    onClick={(e) => { e.stopPropagation(); setSelectedSize(p); }} 
                    style={{ 
                      flex: 1, padding: '0.4rem', borderRadius: '8px', 
                      border: isSelected ? '2px solid var(--sw-red)' : '1px solid var(--sw-border)', 
                      backgroundColor: isSelected ? '#fef2f2' : 'var(--sw-surface)', 
                      fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{p.size}</span>
                    <span style={{ fontSize: '0.65rem', color: isSelected ? 'var(--sw-red)' : 'var(--sw-text-muted)' }}>
                      ${p.price.toFixed(2)}
                    </span>
                  </button>
                );
              })}
            </div>
            
            <button 
              onClick={(e) => { e.stopPropagation(); handleInlineAddToCart(drink); }}
              style={{ 
                backgroundColor: 'var(--sw-red)', color: 'white', 
                fontSize: '0.85rem', fontWeight: 800, borderRadius: '50px',
                padding: '0.5rem 1rem', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.25rem',
                boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
              }}>
              <ShoppingCart size={14} /> Add
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <main style={{ backgroundColor: 'var(--sw-bg)', minHeight: '100vh', paddingBottom: '100px', position: 'relative' }}>
      
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
                onClick={() => handleOpenItemModal(item)}
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
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickAdd(item);
                      }}
                      style={{ 
                        width: '32px', height: '32px', borderRadius: '50%', 
                        backgroundColor: item.isSoldOut ? '#e5e7eb' : 'var(--sw-yellow)', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', 
                        cursor: item.isSoldOut ? 'not-allowed' : 'pointer'
                      }}>
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
              {renderDrinkList(coffeeItems)}
            </div>
          </div>
          
          {/* Non-Coffee Menu Section */}
          <div style={{ marginTop: '2.5rem' }}>
            <h3 style={{ fontWeight: 900, marginBottom: '1rem', fontSize: '1.2rem', paddingLeft: '0.5rem' }}>Non-Coffee & Juice</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {renderDrinkList(nonCoffeeItems)}
            </div>
          </div>
        </div>
      )}

      {/* Item Details Info Modal */}
      <div 
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: '100%', maxWidth: '480px',
          backgroundColor: 'rgba(0,0,0,0.6)', 
          zIndex: 10000, 
          opacity: selectedItem ? 1 : 0, 
          pointerEvents: selectedItem ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
          display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem',
          backdropFilter: 'blur(4px)'
        }}
        onClick={() => setSelectedItem(null)}
      >
        {selectedItem && (
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--sw-surface)', 
              borderRadius: '24px',
              width: '100%', maxWidth: '420px',
              transform: selectedItem ? 'scale(1)' : 'scale(0.95)',
              transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
              overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
          >
            {/* Image Header */}
            <div style={{ height: '220px', background: selectedItem.type === 'food' ? selectedItem.emojiBg : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button 
                onClick={() => setSelectedItem(null)}
                style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
              >
                <X size={20} color="#111" />
              </button>
              {selectedItem.imageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={selectedItem.imageUrl} alt={selectedItem.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: '5rem' }}>{(selectedItem as any).emojis || (selectedItem as any).emoji || '🧇'}</span>
              )}
            </div>
            
            {/* Details Content */}
            <div style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '0.5rem', lineHeight: 1.1 }}>{selectedItem.title}</h2>
              {(selectedItem as any).dietary && (selectedItem as any).dietary.length > 0 && (
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  {(selectedItem as any).dietary.map((tag: string) => (
                    <span key={tag} style={{ backgroundColor: tag === 'V' ? '#dcfce7' : '#fef3c7', color: tag === 'V' ? '#166534' : '#92400e', fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '8px' }}>{tag}</span>
                  ))}
                </div>
              )}
              <p style={{ color: 'var(--sw-text-muted)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '2rem' }}>
                {selectedItem.description && selectedItem.description.trim() !== '' 
                  ? selectedItem.description 
                  : 'A delicious Smash\'d Waffle House specialty crafted with love.'}
              </p>
              
              {selectedItem.type !== 'food' && (
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {(selectedItem as any).prices.map((p: any) => {
                    const isSelected = selectedSize?.size === p.size;
                    return (
                      <button 
                        key={p.size}
                        onClick={(e) => { e.stopPropagation(); setSelectedSize(p); }} 
                        style={{ 
                          flex: 1, padding: '0.6rem 0.4rem', borderRadius: '12px', 
                          border: isSelected ? '2px solid var(--sw-red)' : '1px solid var(--sw-border)', 
                          backgroundColor: isSelected ? '#fef2f2' : 'var(--sw-surface)', 
                          fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.2s ease',
                          color: isSelected ? 'var(--sw-red)' : 'var(--sw-text)'
                        }}
                      >
                        <span>{p.size}</span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, marginTop: '0.2rem', color: isSelected ? 'var(--sw-red)' : 'var(--sw-text-muted)' }}>
                          ${p.price.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              <button 
                onClick={() => {
                  if (selectedItem.type === 'food') {
                    setSelectedItem(null);
                    handleQuickAdd(selectedItem);
                  } else {
                    handleInlineAddToCart(selectedItem);
                  }
                }}
                style={{ width: '100%', padding: '1rem', backgroundColor: 'var(--sw-red)', color: 'white', border: 'none', borderRadius: '50px', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.2)' }}
              >
                <ShoppingCart size={20} /> 
                Add to Cart — ${(selectedItem.type === 'food' ? (selectedItem as any).basePrice : (selectedSize ? selectedSize.price : (selectedItem as any).prices?.[0]?.price))?.toFixed(2)}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Add Toast Indicator */}
      <div style={{
        position: 'fixed',
        bottom: toastMessage ? '2rem' : '-100px',
        right: '1.5rem',
        backgroundColor: 'var(--sw-green)',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '50px',
        fontWeight: 800,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transition: 'bottom 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        zIndex: 11000,
        pointerEvents: 'none'
      }}>
        {toastMessage}
      </div>

    </main>
  );
}
