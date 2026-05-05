import Image from 'next/image';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <div className="sw-hero">
        <div className="sw-hero-overlay"></div>
        <div className="sw-hero-content">
          <div className="sw-badge sw-animate-fade-in">📍 Now Serving Deer Park</div>
          <img src="/assets/logo.png" alt="Smash'd Waffle House" className="sw-hero-logo sw-animate-fade-in sw-animate-delay-1" />
          <h1 className="sw-hero-title sw-animate-fade-in sw-animate-delay-2">
            Home of our Original <br/><span className="sw-text-highlight">SMASH BREAKFAST WAFFLE!</span>
          </h1>
          <p className="sw-hero-subtitle sw-animate-fade-in sw-animate-delay-2">Enjoy the best waffles and coffee while meeting with a friend or family!</p>
          <div className="sw-hero-actions sw-animate-fade-in sw-animate-delay-3">
            <a href="/menu" className="sw-btn sw-btn-primary sw-btn-lg">Order Online Here!</a>
            <a href="/rewards" className="sw-btn sw-btn-outline sw-btn-lg">View Rewards</a>
          </div>
        </div>
      </div>
    </main>
  );
}
