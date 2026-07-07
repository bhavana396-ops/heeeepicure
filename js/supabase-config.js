// ============================================================
// SUPABASE CONFIG — fill this in with YOUR project's values.
// Both values below are safe to expose in frontend code (they
// are public/anon keys, not secrets).
//
// Where to get these:
// 1. Go to https://supabase.com/dashboard -> create a project
//    (free tier, no card needed)
// 2. Project settings (gear icon) -> API
// 3. Copy "Project URL" -> SUPABASE_URL below
// 4. Copy "anon public" key -> SUPABASE_ANON_KEY below
//
// To turn on Google sign-in (also free):
// 1. Authentication -> Providers -> Google -> Enable
// 2. You'll need a Google OAuth Client ID + Secret from
//    https://console.cloud.google.com -> APIs & Services ->
//    Credentials -> Create OAuth Client ID (Web application).
//    Add the "Callback URL" Supabase shows you as an
//    Authorized redirect URI on the Google side.
// 3. Authentication -> URL Configuration:
//    - Site URL: wherever you deploy this (e.g. your Vercel/
//      Netlify URL, or http://localhost:5500 while testing)
//    - Redirect URLs: add that same URL + "/home.html"
// ============================================================

const SUPABASE_URL = 'https://mxspeazihzpkuvnobcsm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_kdvAc52YywObsx-lVzoF_g_HYotzAqv';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
