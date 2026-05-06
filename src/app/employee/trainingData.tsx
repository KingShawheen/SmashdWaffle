import React from 'react';

export const TRAINING_MODULES = [
  {
    id: "sop-opening-closing",
    title: "Store Opening & Closing Checklists",
    icon: "📋",
    description: "The absolute standard for opening the store and closing it down. No deviations permitted.",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h3 style={{ color: '#38bdf8', fontSize: '1.1rem', marginBottom: '0.5rem' }}>1. Opening Checklist (07:00 AM)</h3>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong style={{ color: 'white' }}>Security Check:</strong> Disarm the system, check for any forced entry.</li>
            <li><strong style={{ color: 'white' }}>Waffle Irons:</strong> Power on all 4 irons to exactly 375°F. Wait 15 minutes.</li>
            <li><strong style={{ color: 'white' }}>Espresso Machine:</strong> Purge the steam wands, run a blank shot to heat the portafilters.</li>
            <li><strong style={{ color: 'white' }}>Register:</strong> Open the Square POS, verify the cash drawer has exactly $150 in change.</li>
            <li><strong style={{ color: 'white' }}>Batter Prep:</strong> Pull the day's batter from the walk-in. Verify temp is under 40°F.</li>
          </ul>
        </div>
        <div>
          <h3 style={{ color: '#f472b6', fontSize: '1.1rem', marginBottom: '0.5rem' }}>2. Closing Checklist (04:00 PM)</h3>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong style={{ color: 'white' }}>Waffle Irons:</strong> Power down. Use wire brush and approved degreaser while still warm. Wipe dry.</li>
            <li><strong style={{ color: 'white' }}>Espresso Machine:</strong> Backflush with Cafiza. Soak steam wands. Dump the knock box.</li>
            <li><strong style={{ color: 'white' }}>Register:</strong> Close out the Square POS. Count the drawer, drop the deposit in the safe.</li>
            <li><strong style={{ color: 'white' }}>Floors & Surfaces:</strong> Sweep, mop with designated cleaner. Wipe all stainless steel with polish.</li>
            <li><strong style={{ color: 'white' }}>Security:</strong> Lock all doors, set the alarm.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: "sop-waffle-execution",
    title: "The Perfect SMASH (Recipe Standards)",
    icon: "🧇",
    description: "Styles of bacon, batter temperature, and grid timing. Flawless execution of our signature savory waffles.",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <p style={{ color: '#cbd5e1', fontStyle: 'italic', borderLeft: '3px solid #f59e0b', paddingLeft: '1rem' }}>
          Our waffle is our signature. It must be consistent whether ordered in Deer Park or a future location.
        </p>
        <div>
          <h3 style={{ color: '#f59e0b', fontSize: '1.1rem', marginBottom: '0.5rem' }}>1. Batter Handling</h3>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>Batter <strong>MUST be kept below 40°F</strong>. Do not leave batter out for more than 30 minutes.</li>
            <li>Ladle exactly 6oz of batter into the center of the iron.</li>
          </ul>
        </div>
        <div>
          <h3 style={{ color: '#f59e0b', fontSize: '1.1rem', marginBottom: '0.5rem' }}>2. The Savory Bacon SMASH</h3>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>Place exactly 4 half-strips of pre-cooked bacon directly onto the lower iron.</li>
            <li>Pour the 6oz batter directly OVER the bacon.</li>
            <li>Close the iron immediately. Timer set for 3 minutes 30 seconds.</li>
            <li>Remove with silicone tongs. The bacon must be visually embedded into the crust.</li>
          </ul>
        </div>
        <div>
          <h3 style={{ color: '#ef4444', fontSize: '1.1rem', marginBottom: '0.5rem' }}>3. Quality Assurance</h3>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>If a waffle tears, throw it away.</li>
            <li>If the cheese is not fully melted, place under the salamander for 15 seconds.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: "sop-barista",
    title: "Coffee Science & Extraction",
    icon: "☕️",
    description: "Mastering the perfect pull. Learn timing, temperature controls, and milk micro-foam techniques.",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h3 style={{ color: '#d97706', fontSize: '1.1rem', marginBottom: '0.5rem' }}>1. Dialing in the Espresso</h3>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong style={{ color: 'white' }}>Dose:</strong> 18 grams of ground coffee in the double basket.</li>
            <li><strong style={{ color: 'white' }}>Yield:</strong> 36 grams of liquid espresso.</li>
            <li><strong style={{ color: 'white' }}>Time:</strong> The shot must pull between 25-30 seconds.</li>
            <li style={{ color: '#fca5a5' }}><em>If the shot is too fast (under 25s), make the grind FINER.</em></li>
            <li style={{ color: '#fca5a5' }}><em>If the shot is too slow (over 30s), make the grind COARSER.</em></li>
          </ul>
        </div>
        <div>
          <h3 style={{ color: '#d97706', fontSize: '1.1rem', marginBottom: '0.5rem' }}>2. Milk Steaming (Microfoam)</h3>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>Purge the steam wand before and after every use.</li>
            <li>Keep the steam tip just below the surface of the milk to introduce air (the "paper tearing" sound).</li>
            <li>Submerge the tip to create a whirlpool and heat the milk to exactly 150°F (140°F for kids, 160°F for extra hot).</li>
            <li>Tap the pitcher on the counter to break large bubbles, swirl until it looks like wet paint.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: "sop-compliance",
    title: "WA State Health & Safety Compliance",
    icon: "🧼",
    description: "Cleanliness, cross-contamination, and strict adherence to Washington state food laws.",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h3 style={{ color: '#10b981', fontSize: '1.1rem', marginBottom: '0.5rem' }}>1. Temperature Logs</h3>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>All refrigeration units MUST be recorded every 4 hours.</li>
            <li>Walk-in must remain at 38°F or below.</li>
            <li>Freezer must remain at 0°F or below.</li>
          </ul>
        </div>
        <div>
          <h3 style={{ color: '#10b981', fontSize: '1.1rem', marginBottom: '0.5rem' }}>2. Cross Contamination</h3>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>NEVER use the same tongs for raw bacon and cooked waffles.</li>
            <li>Change gloves immediately after handling any raw ingredients, taking out the trash, or touching your face/hair.</li>
          </ul>
        </div>
        <div>
          <h3 style={{ color: '#10b981', fontSize: '1.1rem', marginBottom: '0.5rem' }}>3. Sanitizer Buckets</h3>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>Sani-buckets must be changed every 2 hours or when visibly soiled.</li>
            <li>Test strips must show 200ppm for Quat sanitizer.</li>
          </ul>
        </div>
      </div>
    )
  }
];
