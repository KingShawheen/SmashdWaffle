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
        <div className="sw-table-container sw-animate-fade-in sw-animate-delay-3">
          <table className="sw-pricing-table">
            <thead>
              <tr>
                <th>Drink</th>
                <th>12oz</th>
                <th>16oz</th>
                <th>20oz</th>
                <th>24oz</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Americano</strong></td>
                <td>$3.00</td>
                <td>$3.50</td>
                <td>$4.00</td>
                <td>$4.50</td>
              </tr>
              <tr>
                <td><strong>Longpour</strong></td>
                <td>$2.50</td>
                <td>$3.00</td>
                <td>$3.50</td>
                <td>$4.00</td>
              </tr>
              <tr>
                <td><strong>Latte / Mocha / Macchiato / Chai</strong></td>
                <td>$4.00</td>
                <td>$4.50</td>
                <td>$5.00</td>
                <td>$5.50</td>
              </tr>
              <tr>
                <td><strong>Big Train Latte (Iced)</strong></td>
                <td>$4.50</td>
                <td>$5.00</td>
                <td>$5.50</td>
                <td>$6.00</td>
              </tr>
              <tr>
                <td><strong>Tea</strong></td>
                <td>$2.00</td>
                <td>$2.50</td>
                <td>$3.00</td>
                <td>$3.50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Non-Coffee Menu Section */}
      <div className="smash-waffle-container" style={{ marginTop: '3rem' }}>
        <h3 style={{ marginBottom: '1rem', fontWeight: 800 }}>Non-Coffee & Juice</h3>
        <div className="sw-table-container sw-animate-fade-in sw-animate-delay-3">
          <table className="sw-pricing-table">
            <thead>
              <tr>
                <th>Drink</th>
                <th>12oz</th>
                <th>16oz</th>
                <th>20oz</th>
                <th>24oz</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Italian Soda</strong></td>
                <td>$4.50</td>
                <td>$5.25</td>
                <td>$6.00</td>
                <td>$6.75</td>
              </tr>
              <tr>
                <td><strong>Redbull Italian Soda</strong></td>
                <td>$5.50</td>
                <td>$6.50</td>
                <td>$7.50</td>
                <td>$8.25</td>
              </tr>
              <tr>
                <td><strong>Fruit Smoothie</strong></td>
                <td>$4.00</td>
                <td>$4.50</td>
                <td>$5.00</td>
                <td>$5.50</td>
              </tr>
              <tr>
                <td><strong>Juice (Orange, Apple)</strong></td>
                <td>$2.50</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
