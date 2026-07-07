// ============================================================
// HOME.JS
// ============================================================

const HEPICURE_WHATSAPP_NUMBER = '917300748429'; // +91 73007 48429, no + or spaces for wa.me links

let state = {
  search: '',
  category: 'all',  // all | breakfast | lunch | dinner | snacks
};

const HEPICURE_CART_KEY = 'hepicure_cart';

let cart = {}; // { itemId: qty }
try {
  cart = JSON.parse(localStorage.getItem(HEPICURE_CART_KEY) || '{}');
} catch (e) {
  cart = {};
}

function hepicureSaveCart() {
  localStorage.setItem(HEPICURE_CART_KEY, JSON.stringify(cart));
}

hepicureRequireAuth((user) => {
  document.getElementById('greeting').textContent = `Hungry, ${user.displayName ? user.displayName.split(' ')[0] : 'there'}?`;
  document.getElementById('user-name').textContent = user.displayName || user.email;
  document.getElementById('user-photo').src = user.photoURL || 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(user.email || 'U');
});

/* ---------- tiffin service catalog (top row of cards) ---------- */
function tiffinCard(t) {
  return `
    <div class="tiffin-card">
      <span class="tiffin-mark on-dark sm"></span>
      <div class="t-name">${t.name}</div>
      <div class="t-desc">${t.desc}</div>
      <div class="t-price">${t.price}</div>
      <button class="t-cta" onclick="hepicureJumpToCategory('${t.cat}')">View menu →</button>
    </div>`;
}
document.getElementById('tiffin-row').innerHTML = HEPICURE_TIFFIN_SERVICES.map(tiffinCard).join('');

function hepicureJumpToCategory(cat) {
  state.category = cat;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
  renderMenu();
  document.getElementById('menu-title').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ---------- build category tabs ---------- */
const tabsEl = document.getElementById('tabs');
HEPICURE_CATEGORIES.forEach(cat => {
  const btn = document.createElement('button');
  btn.className = 'tab-btn' + (cat.id === 'all' ? ' active' : '');
  btn.textContent = cat.label;
  btn.dataset.cat = cat.id;
  btn.addEventListener('click', () => {
    state.category = cat.id;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu();
  });
  tabsEl.appendChild(btn);
});

/* ---------- search ---------- */
document.getElementById('search-input').addEventListener('input', (e) => {
  state.search = e.target.value.trim().toLowerCase();
  renderBestSellers();
  renderMenu();
});

/* ---------- card builders ---------- */
function markHtml() {
  return `<span class="mark"></span>`; // menu is fully veg for now
}

// Renders a dish photo if item.image is set; falls back to the emoji
// swatch automatically if the image is missing or fails to load.
function foodVisual(item, extraStyle) {
  if (!item.image) {
    return `<div class="food-swatch bg${item.swatch}" style="${extraStyle}">${item.emoji}</div>`;
  }
  return `
    <div class="food-visual" style="${extraStyle}">
      <img
        src="${item.image}"
        alt="${item.name}"
        class="food-photo"
        data-emoji="${item.emoji}"
        data-swatch="${item.swatch}"
        data-style="${extraStyle.replace(/"/g, '&quot;')}"
        onerror="hepicureImgFallback(this)"
      />
    </div>`;
}

// Called automatically when a dish photo fails to load; swaps the
// broken <img> back out for the plain emoji tile (built via safe DOM
// APIs, not string HTML, so there are no quoting bugs).
function hepicureImgFallback(img) {
  const wrapper = img.parentElement;
  if (!wrapper) return;
  const swatch = document.createElement('div');
  swatch.className = 'food-swatch bg' + (img.dataset.swatch || '');
  swatch.setAttribute('style', img.dataset.style || '');
  swatch.textContent = img.dataset.emoji || '';
  wrapper.replaceWith(swatch);
}

function bestSellerCard(item) {
  const inCart = cart[item.id] || 0;
  return `
    <div class="bs-card">
      <span class="stamp">Best seller</span>
      ${foodVisual(item, '')}
      <div class="bs-body">
        <div class="row1">${markHtml()}<span class="name">${item.name}</span></div>
        <div class="price">₹${item.price}</div>
      </div>
      <button class="add-btn ${inCart ? 'added' : ''}" style="width:100%;margin-top:8px;" onclick="hepicureAddToCart('${item.id}')">${inCart ? `In cart (${inCart})` : 'Add'}</button>
    </div>`;
}

function menuCard(item) {
  const inCart = cart[item.id] || 0;
  return `
    <div class="menu-card">
      ${foodVisual(item, 'width:100%;height:100px;')}
      <div class="top-row">${markHtml()}<span class="name" style="flex:1;">${item.name}</span></div>
      <div class="desc">${item.desc}</div>
      <div class="bottom-row">
        <span class="price">₹${item.price}</span>
        <button class="add-btn ${inCart ? 'added' : ''}" onclick="hepicureAddToCart('${item.id}')">${inCart ? `In cart (${inCart})` : 'Add'}</button>
      </div>
    </div>`;
}

/* ---------- render best sellers (hidden while searching, so search results are what's on top) ---------- */
function renderBestSellers() {
  const title = document.getElementById('bestseller-title');
  const row = document.getElementById('bestseller-row');

  if (state.search) {
    title.style.display = 'none';
    row.style.display = 'none';
    return;
  }
  title.style.display = '';
  row.style.display = '';

  const items = HEPICURE_MENU.filter(i => i.bestSeller);
  row.innerHTML = items.map(bestSellerCard).join('');
}

/* ---------- render main menu grid based on state ---------- */
function renderMenu() {
  let items = HEPICURE_MENU.slice();
  const isSearching = !!state.search;

  if (isSearching) {
    // Search looks across the whole menu, not just the current tab —
    // so you always find the dish no matter what tab you were last on.
    items = items.filter(i => i.name.toLowerCase().includes(state.search) || i.desc.toLowerCase().includes(state.search));
  } else {
    if (state.category !== 'all') items = items.filter(i => i.category === state.category);
  }

  const grid = document.getElementById('menu-grid');
  const title = document.getElementById('menu-title');
  const eyebrow = document.getElementById('menu-eyebrow');
  const browseSections = document.getElementById('browse-sections');

  // While searching, everything except matching results steps out of the way
  browseSections.style.display = isSearching ? 'none' : '';

  if (isSearching) {
    eyebrow.textContent = 'Search results';
    title.textContent = `"${state.search}"`;
  } else {
    const catLabel = HEPICURE_CATEGORIES.find(c => c.id === state.category)?.label || 'All dishes';
    title.textContent = state.category === 'all' ? 'All dishes' : catLabel;
    eyebrow.textContent = items.length + ' dish' + (items.length === 1 ? '' : 'es');
  }

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <span class="mark lg"></span>
        <div>Nothing matches that search yet — try another dish or clear the filter.</div>
      </div>`;
    return;
  }

  grid.innerHTML = items.map(menuCard).join('');
}

/* ============================================================
   CART — persists across tabs/search (it's just a plain object
   that stays alive in memory the whole time you're on the page,
   the menu just re-renders around it), plus an itemized drawer
   like Amazon's cart where you can adjust qty or remove items.
   ============================================================ */
function hepicureAddToCart(itemId) {
  cart[itemId] = (cart[itemId] || 0) + 1;
  hepicureSaveCart();
  renderBestSellers();
  renderMenu();
  renderCartBar();
  renderCartDrawer();
}

function hepicureChangeQty(itemId, delta) {
  const next = (cart[itemId] || 0) + delta;
  if (next <= 0) {
    delete cart[itemId];
  } else {
    cart[itemId] = next;
  }
  hepicureSaveCart();
  renderBestSellers();
  renderMenu();
  renderCartBar();
  renderCartDrawer();
}

function hepicureRemoveFromCart(itemId) {
  delete cart[itemId];
  hepicureSaveCart();
  renderBestSellers();
  renderMenu();
  renderCartBar();
  renderCartDrawer();
}

function hepicureCartTotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = HEPICURE_MENU.find(i => i.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);
}

function hepicureCartCount() {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

function renderCartBar() {
  const bar = document.getElementById('cart-bar');
  const badge = document.getElementById('cart-icon-badge');
  const count = hepicureCartCount();

  badge.textContent = count;
  badge.classList.toggle('hidden', count === 0);

  if (count === 0) {
    bar.classList.remove('visible');
    hepicureToggleCartDrawer(false);
    return;
  }
  document.getElementById('cart-count').textContent = count + (count === 1 ? ' item' : ' items');
  document.getElementById('cart-total').textContent = '₹' + hepicureCartTotal();
  bar.classList.add('visible');
}

function cartDrawerRow(itemId, qty) {
  const item = HEPICURE_MENU.find(i => i.id === itemId);
  if (!item) return '';
  return `
    <div class="cart-row">
      ${foodVisual(item, 'width:52px;height:52px;flex:none;border-radius:10px;font-size:22px;')}
      <div class="cart-row-info">
        <div class="cart-row-name">${item.name}</div>
        <div class="cart-row-price">₹${item.price} each</div>
      </div>
      <div class="cart-row-qty">
        <button onclick="hepicureChangeQty('${item.id}', -1)">−</button>
        <span>${qty}</span>
        <button onclick="hepicureChangeQty('${item.id}', 1)">+</button>
      </div>
      <button class="cart-row-remove" onclick="hepicureRemoveFromCart('${item.id}')" aria-label="Remove">✕</button>
    </div>`;
}

function renderCartDrawer() {
  const list = document.getElementById('cart-drawer-list');
  const entries = Object.entries(cart);

  if (entries.length === 0) {
    list.innerHTML = `<div class="empty-state" style="padding:40px 20px;">Your cart is empty.</div>`;
  } else {
    list.innerHTML = entries.map(([id, qty]) => cartDrawerRow(id, qty)).join('');
  }
  document.getElementById('cart-drawer-total-amt').textContent = '₹' + hepicureCartTotal();
}

function hepicureToggleCartDrawer(open) {
  document.getElementById('cart-drawer').classList.toggle('open', open);
  document.getElementById('cart-drawer-overlay').classList.toggle('open', open);
}

function hepicureCheckoutWhatsApp() {
  const lines = Object.entries(cart).map(([id, qty]) => {
    const item = HEPICURE_MENU.find(i => i.id === id);
    if (!item) return null;
    return `${qty}x ${item.name} - ₹${item.price * qty}`;
  }).filter(Boolean);

  const message =
    `Hi! I'd like to order from Hepicure:\n\n` +
    lines.join('\n') +
    `\n\nTotal: ₹${hepicureCartTotal()}` +
    `\n\n(Please share your delivery address to confirm.)`;

  const url = `https://wa.me/${HEPICURE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

renderBestSellers();
renderMenu();
renderCartBar();
renderCartDrawer();