"use client";

import { MapPin, ChevronDown } from 'lucide-react';
// We can use usePathname later if we want to hide it on specific pages

export default function TopLocationHeader() {
  // We can use usePathname later if we want to hide it on specific pages  
  // Optional: Don't show on absolute blank paths if needed, 
  // but user wants it embedded into the top of the site/app.
  
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      backgroundColor: 'var(--sw-bg)',
      padding: '0.75rem 1rem',
      paddingTop: 'calc(0.75rem + env(safe-area-inset-top, 0px))',
      borderBottom: '1px solid var(--sw-border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      boxSizing: 'border-box',
      cursor: 'pointer'
    }}>
      <MapPin size={16} color="var(--sw-red)" style={{ marginRight: '6px' }} />
      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--sw-navy)' }}>
        Deer Park, WA
      </span>
      <ChevronDown size={14} color="var(--sw-text-muted)" style={{ marginLeft: '4px' }} />
    </div>
  );
}
