// ============================================================
// MENU-DATA.JS
//
// Real data for the app: categories, tiffin service cards, and
// the actual dish catalog. This is where you (or Alina) update
// menu items, prices, and add new vendors later.
//
// Every dish has a `vendor` field ('guruji' for now) so more
// kitchens can be added later without restructuring anything.
//
// ⚠ PRICES MARKED assumed:true were not on any menu photo and
// were estimated to match similar dishes — confirm these with
// Alina before treating them as final:
//   - Aloo-Poha
//   - Bread Pakoda, Aloo Paratha (breakfast items with no listed price)
//   - The 6 day-wise lunch specials (Sun–Sat)
//   - Rajma Chawal, Aloo Sabzi, Bhindi Sabzi (the 3 best sellers —
//     not on any printed menu at all, added because Alina named
//     them directly)
//   - Thali vs Chef's Thali were listed at two different prices
//     (₹120 vs ₹100) across the images — kept as two separate
//     items for now since it's unclear if they're the same dish
// ============================================================

const HEPICURE_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
  { id: 'snacks', label: 'Snacks' },
];

const HEPICURE_TIFFIN_SERVICES = [
  { id: 'tf-breakfast', name: 'Morning Tiffin', desc: 'Breakfast, delivered before 8 AM daily.', price: 'From ₹80/meal', cat: 'breakfast' },
  { id: 'tf-lunch', name: 'Office Lunch Box', desc: 'Full thali, delivered to your desk by 1 PM.', price: 'From ₹100/meal', cat: 'lunch' },
  { id: 'tf-dinner', name: 'Evening Dabba', desc: 'Light dinner, delivered by 8 PM.', price: 'From ₹100/meal', cat: 'dinner' },
  { id: 'tf-snacks', name: 'Snack Box', desc: 'Evening bites, delivered with your 4 PM chai.', price: 'From ₹80/box', cat: 'snacks' },
  { id: 'tf-all', name: 'All-Day Plan', desc: 'Breakfast, lunch & dinner in one subscription.', price: 'From ₹300/day', cat: 'all' },
];

const HEPICURE_MENU = [

  /* ---------------- BEST SELLERS (named directly by Alina, not on printed menu — prices assumed) ---------------- */
  { id: 'gj-rajma-chawal', image: 'images/rajma-chawal.png', vendor: 'guruji', name: 'Rajma Chawal', desc: 'Kidney bean curry with steamed rice.', price: 100, type: 'veg', category: 'lunch', swatch: '', emoji: '🍛', bestSeller: true, assumed: true },
  { id: 'gj-aloo-sabzi', image: 'images/aloo-sabzi.png', vendor: 'guruji', name: 'Aloo Sabzi', desc: 'Home-style potato curry.', price: 80, type: 'veg', category: 'lunch', swatch: '2', emoji: '🥔', bestSeller: true, assumed: true },
  { id: 'gj-bhindi-sabzi', image: 'images/bhindi-sabzi.png', vendor: 'guruji', name: 'Bhindi Sabzi', desc: 'Okra tossed with onion and spices.', price: 80, type: 'veg', category: 'lunch', swatch: '3', emoji: '🍲', bestSeller: true, assumed: true },

  /* ---------------- BREAKFAST ---------------- */
  { id: 'gj-moong-chila', image: 'images/moong-dal-chila.png', vendor: 'guruji', name: 'Moong Dal Chila', desc: 'Savoury moong dal pancakes, 4 pieces.', price: 100, type: 'veg', category: 'breakfast', swatch: '', emoji: '🥞' },
  { id: 'gj-besan-chila', image: 'images/besan-chila.png', vendor: 'guruji', name: 'Besan Chila', desc: 'Gram flour pancakes, 4 pieces.', price: 80, type: 'veg', category: 'breakfast', swatch: '2', emoji: '🥞' },
  { id: 'gj-idli-sambar', image: 'images/idli-sambar.png', vendor: 'guruji', name: 'Idli Sambar', desc: 'Steamed rice cakes with sambar, 4 pieces.', price: 100, type: 'veg', category: 'breakfast', swatch: '3', emoji: '🍚' },
  { id: 'gj-sandwich', image: 'images/sandwich.png', vendor: 'guruji', name: 'Sandwich', desc: 'Grilled veg sandwich, 4 pieces.', price: 100, type: 'veg', category: 'breakfast', swatch: '', emoji: '🥪' },
  { id: 'gj-appe', image: 'images/appe.png', vendor: 'guruji', name: 'Appe', desc: 'Steamed rice & lentil dumplings, 2 pieces.', price: 100, type: 'veg', category: 'breakfast', swatch: '2', emoji: '🧆' },
  { id: 'gj-poha', image: 'images/poha.png', vendor: 'guruji', name: 'Poha', desc: 'Flattened rice tempered with peanuts & curry leaves.', price: 80, type: 'veg', category: 'breakfast', swatch: '3', emoji: '🍚', assumed: true },
  { id: 'gj-bread-pakoda', image: 'images/bread-pakoda.png', vendor: 'guruji', name: 'Bread Pakoda', desc: 'Spiced potato-stuffed bread fritters.', price: 80, type: 'veg', category: 'breakfast', swatch: '', emoji: '🍞', assumed: true },
  { id: 'gj-aloo-paratha', image: 'images/aloo-paratha.png', vendor: 'guruji', name: 'Aloo Paratha', desc: 'Stuffed potato flatbread, served with curd.', price: 90, type: 'veg', category: 'breakfast', swatch: '2', emoji: '🫓', assumed: true },

  /* ---------------- LUNCH ---------------- */
  { id: 'gj-thali', image: 'images/thali.png', vendor: 'guruji', name: 'Thali', desc: 'Sabzi + dal + roti + salad + raita.', price: 120, type: 'veg', category: 'lunch', swatch: '', emoji: '🍽️' },
  { id: 'gj-chefs-thali', image: 'images/chefs-thali.png', vendor: 'guruji', name: "Chef's Thali", desc: 'Chef\'s special daily thali.', price: 100, type: 'veg', category: 'lunch', swatch: '2', emoji: '🍽️' },
  { id: 'gj-moong-khichdi', image: 'images/moong-khichdi.png', vendor: 'guruji', name: 'Moong Daal Khichdi', desc: 'One-pot moong dal and rice, lightly spiced.', price: 80, type: 'veg', category: 'lunch', swatch: '3', emoji: '🍚' },
  { id: 'gj-dahi-tadka', image: 'images/dahi-tadka.png', vendor: 'guruji', name: 'Dahi Tadka Sabji', desc: 'Yogurt-based curry with a light tempering.', price: 60, type: 'veg', category: 'lunch', swatch: '', emoji: '🍲' },
  { id: 'gj-chilly-paneer', image: 'images/chilly-paneer.png', vendor: 'guruji', name: 'Chilly Paneer', desc: 'Paneer tossed in a spicy chilly sauce.', price: 100, type: 'veg', category: 'lunch', swatch: '2', emoji: '🧀' },
  { id: 'gj-chilly-mushroom', image: 'images/chilly-mushroom.png', vendor: 'guruji', name: 'Chilly Mushroom', desc: 'Mushroom tossed in a spicy chilly sauce.', price: 80, type: 'veg', category: 'lunch', swatch: '3', emoji: '🍄' },
  { id: 'gj-crispy-corn', image: 'images/crispy-corn.png', vendor: 'guruji', name: 'Crispy Corn', desc: 'Golden fried corn, tossed in spices.', price: 120, type: 'veg', category: 'lunch', swatch: '', emoji: '🌽' },
  { id: 'gj-sun-special', image: 'images/rajma-chawal.png', vendor: 'guruji', name: 'Sunday Special: Rajma Chawal', desc: 'Rajma chawal with 4 roti & salad.', price: 100, type: 'veg', category: 'lunch', swatch: '2', emoji: '🍛', assumed: true },
  { id: 'gj-mon-special', image: 'images/dal-chawal.png', vendor: 'guruji', name: 'Monday Special: Dal Chawal', desc: 'Dal chawal with 4 roti & salad.', price: 100, type: 'veg', category: 'lunch', swatch: '3', emoji: '🍛', assumed: true },
  { id: 'gj-tue-special', image: 'images/kaale-chane.png', vendor: 'guruji', name: 'Tuesday Special: Kaale Chane', desc: 'Kaale chane with 4 roti & salad.', price: 100, type: 'veg', category: 'lunch', swatch: '', emoji: '🍛', assumed: true },
  { id: 'gj-wed-special', image: 'images/dal-makhni.png', vendor: 'guruji', name: 'Wednesday Special: Dal Makhni', desc: 'Dal makhni with chawal, 4 roti & salad.', price: 100, type: 'veg', category: 'lunch', swatch: '2', emoji: '🍛', assumed: true },
  { id: 'gj-thu-special', image: 'images/kadhi-chawal.png', vendor: 'guruji', name: 'Thursday Special: Kadhi Chawal', desc: 'Kadhi chawal with 4 roti & salad.', price: 100, type: 'veg', category: 'lunch', swatch: '3', emoji: '🍛', assumed: true },
  { id: 'gj-fri-special', image: 'images/sambhar-chawal.png', vendor: 'guruji', name: 'Friday Special: Sambhar Chawal', desc: 'Sambhar chawal served with idli.', price: 100, type: 'veg', category: 'lunch', swatch: '', emoji: '🍛', assumed: true },
  { id: 'gj-sat-special', image: 'images/chole-chawal.png', vendor: 'guruji', name: 'Saturday Special: Chole Chawal', desc: 'Chole chawal with 4 roti & salad.', price: 100, type: 'veg', category: 'lunch', swatch: '2', emoji: '🍛', assumed: true },

  /* ---------------- DINNER ---------------- */
  { id: 'gj-dinner-thali', image: 'images/dinner-thali.png', vendor: 'guruji', name: 'Dinner Thali', desc: 'Dal + sabzi + roti + chawal + salad/raita.', price: 120, type: 'veg', category: 'dinner', swatch: '', emoji: '🍽️', assumed: true },

  /* ---------------- SNACKS ---------------- */
  { id: 'gj-aloo-poha', image: 'images/aloo-poha.png', vendor: 'guruji', name: 'Aloo-Poha', desc: 'Flattened rice with potatoes, peanuts & spices.', price: 80, type: 'veg', category: 'snacks', swatch: '', emoji: '🍚', assumed: true },

];