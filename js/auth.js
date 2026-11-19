

/* ==========================================================
   NBFI — Shared Auth Module
   Include on every page:
   <script src="../js/auth.js"></script>
   ========================================================== */

const SESSION_KEY = 'nbfi_session';

/* Fake user DB — replace with real backend later */
const USERS = [
    {
        email : 'chiduwemisiguzo@gmail.com',
        name : 'Pearl',
        password : 'Password123',
        role : 'user'
    }
];

/* ---- Session helpers ---- */
function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    email: user.email,
    name:  user.name,
    role:  user.role || 'User',
    loggedInAt: Date.now()
  }));
}

function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); }
  catch { return null; }
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function isLoggedIn() {
  return getSession() !== null;
}

/* ---- Login / logout ---- */
function login(email, password) {
  const user = USERS.find(
    u => u.email.toLowerCase() === email.trim().toLowerCase()
      && u.password === password
  );
  if (!user) return { ok: false, error: 'Invalid email or password.' };
  saveSession(user);
  return { ok: true, user };
}

function logout(redirectTo = '/html/login.html') {
  clearSession();
  window.location.href = redirectTo;
}

/* ---- Route guard — call on protected pages ---- */
function requireAuth(redirectTo = '/html/login.html') {
  if (!isLoggedIn()) {
    window.location.href = redirectTo;
    return false;
  }
  return true;
}

/* ---- Update navbar dynamically ---- */
function renderNavAuth() {
  const container = document.querySelector('.nav-buttons');
  if (!container) return;

  const session = getSession();

  if (session) {
    container.innerHTML = `
      <button class="petition-btn">
        <a href="petition.html">Submit Petition</a>
      </button>
      <button class="login-btn">
        <a href="/user/user-dashboard.html">
          <i class="fa-solid fa-user"></i> ${session.name.split(' ')[0]}
        </a>
      </button>
    `;

  } else {
    container.innerHTML = `
      <button class="petition-btn">
        <a href="petition.html">Submit Petition</a>
      </button>
      <button class="login-btn">
        <a href="login.html">Login</a>
      </button>
    `;
  }
}

/* Auto-run on DOM ready */
document.addEventListener('DOMContentLoaded', renderNavAuth);