// auth-nav.js — updates the nav avatar chip based on Supabase auth state.
// Loaded as <script type="module" src="auth-nav.js"> on every page.
import { onAuth } from './supabase.js';

onAuth(function ({ user, profile }) {
  var chip   = document.getElementById('av-chip');
  var circle = document.getElementById('av-circle');
  var label  = document.getElementById('av-handle-text');
  if (!chip || !circle || !label) return;

  if (profile && profile.handle) {
    chip.href = 'user.html?handle=' + encodeURIComponent(profile.handle);
    chip.setAttribute('aria-label', '@' + profile.handle);
    label.textContent = profile.handle;
    if (profile.avatar_url) {
      circle.innerHTML =
        '<img src="' + profile.avatar_url + '" alt="" ' +
        'style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;">';
    } else {
      circle.textContent = profile.handle[0].toUpperCase();
    }
  } else if (user) {
    chip.href = 'user.html';
    chip.setAttribute('aria-label', 'Set up profile');
    circle.textContent = (user.email || 'U')[0].toUpperCase();
    label.textContent = 'profile';
  } else {
    chip.href = 'user.html';
    chip.setAttribute('aria-label', 'Sign in');
    circle.textContent = '?';
    label.textContent = 'sign in';
  }
});
