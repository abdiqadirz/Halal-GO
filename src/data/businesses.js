// src/data/businesses.js
export const businesses = [
  {
    id: 'muna_halal',
    username: 'muna_halal',
    password: 'password',
    type: 'restaurant',
    businessName: 'Muna Halal Restaurant',
    address: '1352 3rd Ave SE, Rochester, MN 55904',
    coordinates: [44.0178, -92.4524],
    description: 'Family-owned East African/Somali restaurant operating for over 25 years',
    businessHours: 'Daily 7:00 AM - 9:00 PM',
    phone: '(507) 123-4567',
    menu: [
      { name: 'Somali Breakfast Platter', price: '$12.99', description: 'Traditional Somali breakfast with anjero' },
      { name: 'Goat Rice Platter', price: '$15.99', description: 'Tender goat meat served with seasoned rice' }
    ]
  },
  {
    id: 'lazeez_rest',
    username: 'lazeez_rest',
    password: 'password',
    type: 'restaurant',
    businessName: 'Lazeez Restaurant & Catering',
    address: '303 Elton Hills Dr NW, Rochester, MN 55901',
    coordinates: [44.0340, -92.4736],
    description: 'Authentic Middle Eastern halal cuisine',
    businessHours: 'Daily 10:00 AM - 10:00 PM',
    phone: '(507) 282-2822',
    menu: [
      { name: 'Mixed Grill Platter', price: '$18.99', description: 'Assortment of grilled meats with rice' },
      { name: 'Shawarma Wrap', price: '$9.99', description: 'Choice of meat wrapped in fresh pita bread' }
    ]
  }
];