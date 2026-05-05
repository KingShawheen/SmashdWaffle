import Image from 'next/image';

export default function Menu() {
  return (
    <main style={{ paddingBottom: '8rem', paddingTop: '2rem' }}>
      <div className="smash-waffle-container" id="menu">
        <div className="sw-location-header">
          <div>
            <h2 style={{ marginBottom: '0.5rem' }}>Our Menu</h2>
            <p style={{ color: 'var(--sw-text-muted)', margin: 0 }}>📍 847 S. Main St. Deer Park, WA | Mon–Sun: 8 AM – 1 PM</p>
          </div>
        </div>

        <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontWeight: 800 }}>Waffles & Signature Food</h3>
        <div className="sw-menu-grid">
          {/* Breakfast SMASH Waffle */}
          <div className="sw-menu-card sw-animate-fade-in sw-animate-delay-1">
            <div className="sw-card-content">
              <div className="sw-card-header">
                <h3 className="sw-item-title">Breakfast SMASH Waffle <span style={{ color: 'var(--sw-primary)', fontSize: '0.8rem', marginLeft: '8px' }}>POPULAR</span></h3>
                <span className="sw-item-price">$15.00</span>
              </div>
              <p className="sw-item-desc">Bacon, Egg, Cheese, and Tater Tots. Green Onion Garnish. Sour Cream or Salsa on the side. (No Waffle Batter)</p>
              <button className="sw-btn sw-btn-primary" style={{ width: '100%' }}>Customize & Add</button>
            </div>
          </div>

          {/* SMASH'D Omelette */}
          <div className="sw-menu-card sw-animate-fade-in sw-animate-delay-1">
            <div className="sw-card-content">
              <div className="sw-card-header">
                <h3 className="sw-item-title">SMASH’D Omelette</h3>
                <span className="sw-item-price">$13.00</span>
              </div>
              <p className="sw-item-desc">3 Eggs, Ham or Sausage, Bell Peppers, Mushrooms, Cheese. (No Waffle Batter)</p>
              <button className="sw-btn sw-btn-primary" style={{ width: '100%' }}>Customize & Add</button>
            </div>
          </div>

          {/* Plain Waffle */}
          <div className="sw-menu-card sw-animate-fade-in sw-animate-delay-2">
            <div className="sw-card-content">
              <div className="sw-card-header">
                <h3 className="sw-item-title">Plain Waffle</h3>
                <span className="sw-item-price">$10.00 <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>(Jr. $8)</span></span>
              </div>
              <p className="sw-item-desc">Gluten Free-Friendly Option Available (No Jr. GF).</p>
              <button className="sw-btn sw-btn-primary" style={{ width: '100%' }}>Customize & Add</button>
            </div>
          </div>

          {/* Signature Waffles */}
          <div className="sw-menu-card sw-animate-fade-in sw-animate-delay-2">
            <div className="sw-card-content">
              <div className="sw-card-header">
                <h3 className="sw-item-title">Signature Waffles</h3>
                <span className="sw-item-price">$12.00 <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>(Jr. $10)</span></span>
              </div>
              <p className="sw-item-desc">Choose from: Apple Pie, Blueberry/Lemon, Breezy’s Berry’s, Banana/Almond Butter/Honey, Churro, PB&J, Nutella, Strawberry/Chocolate.</p>
              <button className="sw-btn sw-btn-primary" style={{ width: '100%' }}>Customize & Add</button>
            </div>
          </div>

          {/* Dessert Waffles */}
          <div className="sw-menu-card sw-animate-fade-in sw-animate-delay-3">
            <div className="sw-card-content">
              <div className="sw-card-header">
                <h3 className="sw-item-title">Dessert Waffles</h3>
                <span className="sw-item-price">$15.00</span>
              </div>
              <p className="sw-item-desc">Choose from: Oreo, Reese’s, Ice Cream.</p>
              <button className="sw-btn sw-btn-primary" style={{ width: '100%' }}>Customize & Add</button>
            </div>
          </div>

          {/* Biscuit Waffle and Gravy */}
          <div className="sw-menu-card sw-animate-fade-in sw-animate-delay-3">
            <div className="sw-card-content">
              <div className="sw-card-header">
                <h3 className="sw-item-title">Biscuit Waffle and Gravy</h3>
                <span className="sw-item-price">$12.00</span>
              </div>
              <p className="sw-item-desc">Classic biscuits and gravy served Smash'd style.</p>
              <button className="sw-btn sw-btn-primary" style={{ width: '100%' }}>Customize & Add</button>
            </div>
          </div>
          
          {/* Waffle Breakfast Special */}
          <div className="sw-menu-card sw-animate-fade-in sw-animate-delay-3">
            <div className="sw-card-content">
              <div className="sw-card-header">
                <h3 className="sw-item-title">Waffle Breakfast Special</h3>
                <span className="sw-item-price">$22.00</span>
              </div>
              <p className="sw-item-desc">Signature Waffle, 2 Eggs, Bacon or Sausage, Fresh Fruit, Drip Coffee or Juice.</p>
              <button className="sw-btn sw-btn-primary" style={{ width: '100%' }}>Customize & Add</button>
            </div>
          </div>

          {/* Good Morning Breakfast Special */}
          <div className="sw-menu-card sw-animate-fade-in sw-animate-delay-3">
            <div className="sw-card-content">
              <div className="sw-card-header">
                <h3 className="sw-item-title">Good Morning Breakfast Special</h3>
                <span className="sw-item-price">$19.00</span>
              </div>
              <p className="sw-item-desc">2 Eggs, Bacon, Waffle Bites, Fresh Fruit, Drip Coffee or Juice.</p>
              <button className="sw-btn sw-btn-primary" style={{ width: '100%' }}>Customize & Add</button>
            </div>
          </div>
          
          {/* Acai Bowl */}
          <div className="sw-menu-card sw-animate-fade-in sw-animate-delay-3">
            <div className="sw-card-content">
              <div className="sw-card-header">
                <h3 className="sw-item-title">Acai Bowl</h3>
                <span className="sw-item-price">$15.00</span>
              </div>
              <p className="sw-item-desc">Acai, Granola, Banana, Blueberries, Almond Butter, Peanut Butter, Honey.</p>
              <button className="sw-btn sw-btn-primary" style={{ width: '100%' }}>Customize & Add</button>
            </div>
          </div>
          
          {/* Waffle BLT */}
          <div className="sw-menu-card sw-animate-fade-in sw-animate-delay-3">
            <div className="sw-card-content">
              <div className="sw-card-header">
                <h3 className="sw-item-title">Waffle BLT</h3>
                <span className="sw-item-price">$15.00</span>
              </div>
              <p className="sw-item-desc">Bacon, Lettuce, Tomato, Guacamole on a Waffle.</p>
              <button className="sw-btn sw-btn-primary" style={{ width: '100%' }}>Customize & Add</button>
            </div>
          </div>
          
          {/* Kids Menu */}
          <div className="sw-menu-card sw-animate-fade-in sw-animate-delay-3">
            <div className="sw-card-content">
              <div className="sw-card-header">
                <h3 className="sw-item-title">Kids Waffle Bites</h3>
                <span className="sw-item-price">$5.00</span>
              </div>
              <p className="sw-item-desc">Served with Butter and Berry Sauce. (Kids Fruit Cup available for $3)</p>
              <button className="sw-btn sw-btn-primary" style={{ width: '100%' }}>Customize & Add</button>
            </div>
          </div>
        </div>
      </div>

      {/* Coffee Menu Section */}
      <div className="smash-waffle-container" style={{ marginTop: '3rem' }}>
        <h3 style={{ marginBottom: '1rem', fontWeight: 800 }}>Coffee Menu <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--sw-text-muted)', marginLeft: '8px' }}>Extra Shot: $1.00</span></h3>
        <div className="sw-drink-list sw-animate-fade-in sw-animate-delay-3">
          
          <div className="sw-drink-item">
            <h4 className="sw-drink-title">Americano</h4>
            <div className="sw-drink-prices">
              <div className="sw-price-pill"><span className="sw-size">12oz</span><span className="sw-price">$3.00</span></div>
              <div className="sw-price-pill"><span className="sw-size">16oz</span><span className="sw-price">$3.50</span></div>
              <div className="sw-price-pill"><span className="sw-size">20oz</span><span className="sw-price">$4.00</span></div>
              <div className="sw-price-pill"><span className="sw-size">24oz</span><span className="sw-price">$4.50</span></div>
            </div>
          </div>

          <div className="sw-drink-item">
            <h4 className="sw-drink-title">Longpour</h4>
            <div className="sw-drink-prices">
              <div className="sw-price-pill"><span className="sw-size">12oz</span><span className="sw-price">$2.50</span></div>
              <div className="sw-price-pill"><span className="sw-size">16oz</span><span className="sw-price">$3.00</span></div>
              <div className="sw-price-pill"><span className="sw-size">20oz</span><span className="sw-price">$3.50</span></div>
              <div className="sw-price-pill"><span className="sw-size">24oz</span><span className="sw-price">$4.00</span></div>
            </div>
          </div>

          <div className="sw-drink-item">
            <h4 className="sw-drink-title">Latte / Mocha / Macchiato / Chai</h4>
            <div className="sw-drink-prices">
              <div className="sw-price-pill"><span className="sw-size">12oz</span><span className="sw-price">$4.00</span></div>
              <div className="sw-price-pill"><span className="sw-size">16oz</span><span className="sw-price">$4.50</span></div>
              <div className="sw-price-pill"><span className="sw-size">20oz</span><span className="sw-price">$5.00</span></div>
              <div className="sw-price-pill"><span className="sw-size">24oz</span><span className="sw-price">$5.50</span></div>
            </div>
          </div>

          <div className="sw-drink-item">
            <h4 className="sw-drink-title">Big Train Latte (Iced)</h4>
            <div className="sw-drink-prices">
              <div className="sw-price-pill"><span className="sw-size">12oz</span><span className="sw-price">$4.50</span></div>
              <div className="sw-price-pill"><span className="sw-size">16oz</span><span className="sw-price">$5.00</span></div>
              <div className="sw-price-pill"><span className="sw-size">20oz</span><span className="sw-price">$5.50</span></div>
              <div className="sw-price-pill"><span className="sw-size">24oz</span><span className="sw-price">$6.00</span></div>
            </div>
          </div>

          <div className="sw-drink-item">
            <h4 className="sw-drink-title">Tea</h4>
            <div className="sw-drink-prices">
              <div className="sw-price-pill"><span className="sw-size">12oz</span><span className="sw-price">$2.00</span></div>
              <div className="sw-price-pill"><span className="sw-size">16oz</span><span className="sw-price">$2.50</span></div>
              <div className="sw-price-pill"><span className="sw-size">20oz</span><span className="sw-price">$3.00</span></div>
              <div className="sw-price-pill"><span className="sw-size">24oz</span><span className="sw-price">$3.50</span></div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Non-Coffee Menu Section */}
      <div className="smash-waffle-container" style={{ marginTop: '3rem' }}>
        <h3 style={{ marginBottom: '1rem', fontWeight: 800 }}>Non-Coffee & Juice</h3>
        <div className="sw-drink-list sw-animate-fade-in sw-animate-delay-3">
          
          <div className="sw-drink-item">
            <h4 className="sw-drink-title">Italian Soda</h4>
            <div className="sw-drink-prices">
              <div className="sw-price-pill"><span className="sw-size">12oz</span><span className="sw-price">$4.50</span></div>
              <div className="sw-price-pill"><span className="sw-size">16oz</span><span className="sw-price">$5.25</span></div>
              <div className="sw-price-pill"><span className="sw-size">20oz</span><span className="sw-price">$6.00</span></div>
              <div className="sw-price-pill"><span className="sw-size">24oz</span><span className="sw-price">$6.75</span></div>
            </div>
          </div>

          <div className="sw-drink-item">
            <h4 className="sw-drink-title">Redbull Italian Soda</h4>
            <div className="sw-drink-prices">
              <div className="sw-price-pill"><span className="sw-size">12oz</span><span className="sw-price">$5.50</span></div>
              <div className="sw-price-pill"><span className="sw-size">16oz</span><span className="sw-price">$6.50</span></div>
              <div className="sw-price-pill"><span className="sw-size">20oz</span><span className="sw-price">$7.50</span></div>
              <div className="sw-price-pill"><span className="sw-size">24oz</span><span className="sw-price">$8.25</span></div>
            </div>
          </div>

          <div className="sw-drink-item">
            <h4 className="sw-drink-title">Fruit Smoothie</h4>
            <div className="sw-drink-prices">
              <div className="sw-price-pill"><span className="sw-size">12oz</span><span className="sw-price">$4.00</span></div>
              <div className="sw-price-pill"><span className="sw-size">16oz</span><span className="sw-price">$4.50</span></div>
              <div className="sw-price-pill"><span className="sw-size">20oz</span><span className="sw-price">$5.00</span></div>
              <div className="sw-price-pill"><span className="sw-size">24oz</span><span className="sw-price">$5.50</span></div>
            </div>
          </div>

          <div className="sw-drink-item">
            <h4 className="sw-drink-title">Juice (Orange, Apple)</h4>
            <div className="sw-drink-prices">
              <div className="sw-price-pill"><span className="sw-size">12oz</span><span className="sw-price">$2.50</span></div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
