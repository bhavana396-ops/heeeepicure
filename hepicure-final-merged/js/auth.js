// ============================================================
// AUTH.JS
//
// Real, verified sign-in via Supabase (100% free — email magic
// link + Google both run on Supabase's free tier, no card
// needed, no per-user cost).
//
// Phone number: collected as plain info (no OTP/SMS), since
// verified SMS always costs money with every provider. It's
// saved locally so you have it for order updates, but it does
// NOT create an account by itself — use email or Google to
// actually sign in.
//
// "Skip for now" stays as a local guest session, no backend
// involved.
// ============================================================

const HEPICURE_GUEST_KEY = 'hepicure_guest_session'; // used for skip / phone-collected-but-not-signed-in
const HEPICURE_PHONE_KEY = 'hepicure_phone';

function hepicureShowError(msg) {
  const box = document.getElementById('login-error');
  if (!box) return;
  box.textContent = msg;
  box.style.display = 'block';
  const note = document.getElementById('login-note');
  if (note) note.style.display = 'none';
}

function hepicureShowNote(msg) {
  const note = document.getElementById('login-note');
  if (!note) return;
  note.textContent = msg;
  note.style.display = 'block';
  const err = document.getElementById('login-error');
  if (err) err.style.display = 'none';
}

/* ---------- EMAIL (real, via Supabase magic link) ---------- */
async function hepicureContinueEmail() {
  const input = document.getElementById('email-input');
  const value = input.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(value)) {
    hepicureShowError('Enter a valid email address to continue.');
    return;
  }

  const btn = event ? event.target : null;
  if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

  const { error } = await supabaseClient.auth.signInWithOtp({
    email: value,
    options: { emailRedirectTo: window.location.origin + window.location.pathname.replace('index.html', 'home.html') }
  });

  if (btn) { btn.disabled = false; btn.textContent = 'Continue'; }

  if (error) {
    hepicureShowError(error.message || 'Could not send the sign-in link. Try again.');
    return;
  }
  hepicureShowNote(`Check ${value} for a sign-in link. Open it on this device to continue.`);
}

/* ---------- GOOGLE (real, via Supabase OAuth) ---------- */
async function hepicureContinueGoogle() {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + window.location.pathname.replace('index.html', 'home.html') }
  });
  if (error) hepicureShowError(error.message || 'Google sign-in failed. Try again.');
  // on success, Supabase redirects to Google then back to home.html automatically
}

/* ---------- PHONE (collected only, not verified, not an account) ---------- */
function hepicureContinuePhone() {
  const input = document.getElementById('phone-input');
  const value = input.value.trim();
  const digitsOnly = value.replace(/\D/g, '');

  if (digitsOnly.length < 10) {
    hepicureShowError('Enter a valid phone number to continue.');
    return;
  }
  localStorage.setItem(HEPICURE_PHONE_KEY, value);
  localStorage.setItem(HEPICURE_GUEST_KEY, JSON.stringify({ type: 'phone', name: value }));
  window.location.href = 'home.html';
}

/* ---------- SKIP ---------- */
function hepicureSkip() {
  localStorage.setItem(HEPICURE_GUEST_KEY, JSON.stringify({ type: 'guest', name: 'Guest' }));
  window.location.href = 'home.html';
}

/* ---------- shared session check ---------- */
// Returns a normalized user object: { displayName, email, photoURL, phone, type }
async function hepicureResolveUser() {
  const { data } = await supabaseClient.auth.getSession();
  const session = data && data.session;

  if (session && session.user) {
    const u = session.user;
    const meta = u.user_metadata || {};
    return {
      type: 'supabase',
      displayName: meta.full_name || meta.name || (u.email ? u.email.split('@')[0] : 'there'),
      email: u.email || '',
      photoURL: meta.avatar_url || meta.picture || null,
      phone: localStorage.getItem(HEPICURE_PHONE_KEY) || ''
    };
  }

  const guestRaw = localStorage.getItem(HEPICURE_GUEST_KEY);
  if (guestRaw) {
    try {
      const guest = JSON.parse(guestRaw);
      return {
        type: guest.type,
        displayName: guest.name || 'Guest',
        email: '',
        photoURL: null,
        phone: localStorage.getItem(HEPICURE_PHONE_KEY) || ''
      };
    } catch (e) { /* fall through */ }
  }

  return null;
}

/* ---------- called on home.html / subscription.html / track-order.html ---------- */
function hepicureRequireAuth(onReady) {
  hepicureResolveUser().then((user) => {
    if (!user) {
      window.location.href = 'index.html';
      return;
    }
    if (typeof onReady === 'function') onReady(user);
  });
}

async function hepicureSignOut() {
  await supabaseClient.auth.signOut();
  localStorage.removeItem(HEPICURE_GUEST_KEY);
  localStorage.removeItem(HEPICURE_PHONE_KEY);
  localStorage.removeItem('hepicure_cart');
  window.location.href = 'index.html';
}

/* ---------- if already signed in, skip straight past login.html ---------- */
function hepicureRedirectIfSignedIn() {
  hepicureResolveUser().then((user) => {
    if (user) window.location.href = 'home.html';
  });
}
