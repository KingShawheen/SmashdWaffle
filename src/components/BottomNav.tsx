"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Utensils, Gift, ShoppingCart } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Home has dark navy nav, others have white nav
  const navBg = isHome ? "var(--sw-navy)" : "var(--sw-surface)";
  const inactiveColor = isHome ? "#9CA3AF" : "#6B7280";
  const activeColor = isHome ? "var(--sw-yellow)" : "var(--sw-red)";

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Menu", href: "/menu", icon: Utensils },
    { label: "Rewards", href: "/rewards", icon: Gift },
    { label: "Cart", href: "/cart", icon: ShoppingCart },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0, left: 0, right: 0,
      backgroundColor: navBg,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingBottom: 'env(safe-area-inset-bottom, 16px)',
      height: 'calc(70px + env(safe-area-inset-bottom, 0px))',
      borderTop: isHome ? 'none' : '1px solid var(--sw-border)',
      zIndex: 9999,
      transition: 'background-color 0.2s ease',
    }}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const color = isActive ? activeColor : inactiveColor;
        
        return (
          <Link key={item.label} href={item.href} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            position: 'relative', width: '25%', height: '100%',
            color: color
          }}>
            {/* Active Indicator Line for Home only */}
            {isHome && isActive && (
              <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '3px', backgroundColor: 'var(--sw-yellow)' }} />
            )}
            
            <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} style={{ marginBottom: '4px', marginTop: isHome ? '8px' : '0' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: isActive ? 700 : 500 }}>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
