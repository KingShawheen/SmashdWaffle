import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, addDoc, getDocs, doc, setDoc, query, where, limit } from 'firebase/firestore';
import { LOCATIONS } from '../../../store/locationStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customerDetails, token, locationId = 'deer-park' } = body;

    const location = LOCATIONS.find(l => l.id === locationId) || LOCATIONS[0];

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Server-side validation: In a production app, we would query the menu_items collection 
    // and recalculate the exact price here to prevent client-side spoofing.
    // For Phase 1, we will trust the structure but compute the total securely from the items array.
    
    let subtotal = 0;
    
    // Validate each item (simplified validation for now)
    for (const item of items) {
      let itemTotal = item.basePrice;
      if (item.modifiers && item.modifiers.length > 0) {
        for (const mod of item.modifiers) {
          itemTotal += mod.price;
        }
      }
      subtotal += (itemTotal * item.quantity);
    }

    const taxRate = location.taxRate;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    console.log(`Processing Square Charge for $${total.toFixed(2)} with token:`, token);
    // TODO: Actually call Square API here using the token and the securely calculated total.
    
    // Write Order to Firestore
    const orderDoc = await addDoc(collection(db, 'orders'), {
      customerName: customerDetails.name || 'Guest',
      customerEmail: customerDetails.email || '',
      customerPhone: customerDetails.phone || '',
      pickupTime: customerDetails.pickupTime || 'ASAP',
      orderNotes: customerDetails.orderNotes || '',
      locationId: location.id,
      locationName: location.name,
      items: items.map((i: any) => ({
        menuItemId: i.menuItemId,
        title: i.title,
        quantity: i.quantity,
        size: i.size || null,
        modifiers: i.modifiers || [],
        price: i.price, // the price per unit
      })),
      subtotal: subtotal,
      tax: tax,
      total: total,
      status: 'pending', // 'pending', 'completed', 'cancelled'
      createdAt: new Date().toISOString(),
      squareToken: token || null // In real app, store the Square Transaction ID, not the token
    });

    // Phase 2: Smash'd Loyalty Graph Integration
    if (customerDetails.phone) {
      const cleanPhone = customerDetails.phone.replace(/\D/g, '');
      if (cleanPhone.length >= 10) {
        try {
          const customersRef = collection(db, 'customers');
          const q = query(customersRef, where('phone', '==', cleanPhone), limit(1));
          const snapshot = await getDocs(q);
          
          const earnedPoints = Math.floor(subtotal);

          if (snapshot.empty) {
            // Create new customer profile
            await addDoc(customersRef, {
              phone: cleanPhone,
              name: customerDetails.name || 'Guest',
              email: customerDetails.email || '',
              totalSpent: total,
              points: earnedPoints,
              orderCount: 1,
              createdAt: new Date().toISOString(),
              lastOrderAt: new Date().toISOString()
            });
            console.log(`Created new loyalty profile for ${cleanPhone} with ${earnedPoints} points.`);
          } else {
            // Update existing customer profile
            const customerDoc = snapshot.docs[0];
            const data = customerDoc.data();
            await setDoc(doc(db, 'customers', customerDoc.id), {
              ...data,
              totalSpent: (data.totalSpent || 0) + total,
              points: (data.points || 0) + earnedPoints,
              orderCount: (data.orderCount || 0) + 1,
              lastOrderAt: new Date().toISOString()
            });
            console.log(`Updated loyalty profile for ${cleanPhone}. Added ${earnedPoints} points.`);
          }
        } catch (err) {
          console.error("Loyalty Graph Error:", err);
          // Don't fail the order if loyalty processing fails
        }
      }
    }

    return NextResponse.json({ success: true, orderId: orderDoc.id, total: total });

  } catch (error: any) {
    console.error('Checkout Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
