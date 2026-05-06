'use client';

import { useState, useEffect } from 'react';
import { useUiStore } from '../store/uiStore';

const FOOD_IMAGES = [
  '/assets/food/strawberry_chocolate.png',
  '/assets/food/savory_bacon.png',
  '/assets/food/pb_jelly.png',
  '/assets/food/apple_cinnamon.png',
  '/assets/food/pb_banana.png'
];

const DRINK_IMAGES = [
  '/assets/drinks/latte.png',
  '/assets/drinks/iced_latte.png',
  '/assets/drinks/redbull_soda.png',
  '/assets/drinks/smoothie.png',
  '/assets/drinks/americano.png'
];

export default function DesktopSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeMenuTab = useUiStore((state) => state.activeMenuTab);

  const currentImages = activeMenuTab === 'drinks' ? DRINK_IMAGES : FOOD_IMAGES;

  useEffect(() => {
    setCurrentIndex(0);
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentImages.length);
    }, 4000); // 4 seconds per slide
    return () => clearInterval(timer);
  }, [currentImages]);

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--sw-red)', position: 'relative' }}>
      {/* Slides */}
      {currentImages.map((src, index) => (
        <div
          key={src}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Add a subtle zoom effect for a premium feel */}
          <div style={{
            width: '120%',
            height: '120%',
            backgroundImage: `radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%), url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: index === currentIndex ? 'scale(1)' : 'scale(1.05)',
            transition: 'transform 5s ease-out',
          }} />
        </div>
      ))}

      {/* Stunning Typography Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.7) 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '4rem',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        <h1 style={{ 
          fontSize: '6rem', 
          fontWeight: 900, 
          color: 'white', 
          lineHeight: 0.9, 
          letterSpacing: '-0.02em',
          textShadow: '0 10px 30px rgba(0,0,0,0.5)',
          marginBottom: '1rem'
        }}>
          {activeMenuTab === 'drinks' ? (
            <>
              THE BEST <br/>
              <span style={{ color: 'var(--sw-yellow)' }}>BEVERAGES</span><br/>
              IN DEER PARK.
            </>
          ) : (
            <>
              THE BEST <br/>
              <span style={{ color: 'var(--sw-yellow)' }}>BREAKFAST</span><br/>
              IN DEER PARK.
            </>
          )}
        </h1>
        <p style={{
          fontSize: '1.5rem',
          fontWeight: 500,
          color: 'rgba(255,255,255,0.9)',
          maxWidth: '600px',
          lineHeight: 1.5,
          textShadow: '0 4px 10px rgba(0,0,0,0.3)'
        }}>
          {activeMenuTab === 'drinks' 
            ? "From rich barista-crafted espresso to vibrant Italian sodas and smoothies. Fuel your day."
            : "Experience the original Smash'd Waffle. Beautifully crafted, perfectly crisp, and loaded with intense flavors."}
        </p>
      </div>
    </div>
  );
}
