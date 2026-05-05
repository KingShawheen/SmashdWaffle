import type { Metadata, Viewport } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import TopLocationHeader from "@/components/TopLocationHeader";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Smash'd Waffle House",
  description: "Home of our Original SMASH BREAKFAST WAFFLE!",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Smash'd",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#f3f4f6', margin: 0, padding: 0 }}>
        <div style={{ 
          maxWidth: '480px', 
          margin: '0 auto', 
          backgroundColor: 'var(--sw-bg)', 
          minHeight: '100dvh', 
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: '0 0 50px rgba(0,0,0,0.05)'
        }}>
          <TopLocationHeader />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {children}
          </div>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
