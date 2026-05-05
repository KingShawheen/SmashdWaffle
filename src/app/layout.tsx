import type { Metadata, Viewport } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import TopLocationHeader from "@/components/TopLocationHeader";
import DesktopSlideshow from "@/components/DesktopSlideshow";

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
      <body style={{ margin: 0, padding: 0 }}>
        <div className="desktop-layout-wrapper">
          
          {/* Left Side: Dynamic Full-Screen Slideshow for Desktop Only */}
          <div className="desktop-hero-pane">
            <DesktopSlideshow />
          </div>

          {/* Right Side: The PWA Mobile App Container */}
          <div className="app-container">
            <TopLocationHeader />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {children}
            </div>
            <BottomNav />
          </div>

        </div>
      </body>
    </html>
  );
}
