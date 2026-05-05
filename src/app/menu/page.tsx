import Image from 'next/image';

export default function Menu() {
  return (
    <main style={{ paddingBottom: '2rem', paddingTop: '2rem' }}>
      <div className="smash-waffle-container" id="menu">
        <div className="sw-location-header">
          <div>
            <h2 style={{ marginBottom: '0.5rem' }}>Our Menu</h2>
            <p style={{ color: 'var(--sw-text-muted)', margin: 0 }}>Currently serving the Deer Park area.</p>
          </div>
          <div>
            <select className="sw-location-select" id="location-selector" defaultValue="deer-park">
              <option value="deer-park">📍 Deer Park, WA (Main)</option>
              <option value="mobile-1" disabled>🚚 Mobile Unit 1 (Coming Soon)</option>
            </select>
          </div>
        </div>

        <div className="sw-menu-grid">
          {/* Item 1 */}
          <div className="sw-menu-card sw-animate-fade-in sw-animate-delay-1">
            <img className="sw-card-image" src="https://images.unsplash.com/photo-1562376552-0d160a2f9fc4?q=80&w=600&auto=format&fit=crop" alt="Breakfast SMASH Waffle" />
            <div className="sw-card-content">
              <div className="sw-card-header">
                <h3 className="sw-item-title">Breakfast SMASH Waffle</h3>
                <span className="sw-item-price">$15.00</span>
              </div>
              <p className="sw-item-desc">Our most popular item! Bacon, Egg, Cheese, and Tater Tots. Green Onion Garnish. Sour Cream or Salsa on the side. (No Waffle Batter)</p>
              <button className="sw-btn sw-btn-primary">Customize & Add</button>
            </div>
          </div>

          {/* Item 2 */}
          <div className="sw-menu-card sw-animate-fade-in sw-animate-delay-2">
            <img className="sw-card-image" src="https://images.unsplash.com/photo-1512151624467-f4e9121a50a1?q=80&w=600&auto=format&fit=crop" alt="Signature Waffles" />
            <div className="sw-card-content">
              <div className="sw-card-header">
                <h3 className="sw-item-title">Signature Waffles</h3>
                <span className="sw-item-price">$12.00</span>
              </div>
              <p className="sw-item-desc">Choose from: Apple Pie, Blueberry/Lemon, Breezy’s Berry’s, Banana/Almond Butter/Honey, Churro, PB&J, Nutella, or Strawberry/Chocolate.</p>
              <button className="sw-btn sw-btn-primary">Customize & Add</button>
            </div>
          </div>

          {/* Item 3 */}
          <div className="sw-menu-card sw-animate-fade-in sw-animate-delay-3">
            <img className="sw-card-image" src="https://images.unsplash.com/photo-1504113888839-1c8eb50233d3?q=80&w=600&auto=format&fit=crop" alt="Coffee" />
            <div className="sw-card-content">
              <div className="sw-card-header">
                <h3 className="sw-item-title">Coffee & Drinks</h3>
                <span className="sw-item-price">$3.00+</span>
              </div>
              <p className="sw-item-desc">Enjoy the best coffee while meeting with a friend or family! Available hot or iced with an optional extra shot.</p>
              <button className="sw-btn sw-btn-primary">Customize & Add</button>
            </div>
          </div>
        </div>
      </div>

      {/* Coffee Menu Section */}
      <div className="smash-waffle-container" style={{ marginTop: '2rem' }}>
        <div className="sw-location-header">
          <h2 style={{ marginBottom: '0.5rem' }}>Refreshments Pricing</h2>
          <p style={{ color: 'var(--sw-text-muted)', margin: 0 }}>Locally roasted beans. Available hot or iced. (Extra Shot: $1.00)</p>
        </div>

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
                <td><strong>Latte / Mocha / Macchiato</strong></td>
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
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
