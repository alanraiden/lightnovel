import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { googleLogin, emailLogin, emailSignup } from '../services/api';
import './Navbar.css';

// ── Auth Modal ────────────────────────────────────────────────────────────────
function AuthModal({ onClose, loginWithToken }) {
  const [tab, setTab]           = useState('signin'); // signin | signup
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');
  const googleBtnRef = useRef(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Init Google button
  useEffect(() => {
    setError(''); setSuccess('');
    if (!clientId) return;

    function init() {
      if (!window.google || !googleBtnRef.current) return;
      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleCredential,
          ux_mode: 'popup',
        });
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: 'outline',
          size: 'large',
          shape: 'rectangular',
          width: 300,
          text: tab === 'signup' ? 'signup_with' : 'signin_with',
          logo_alignment: 'left',
        });
      } catch (e) { console.error('Google init error', e); }
    }

    if (window.google) { setTimeout(init, 80); }
    else {
      let n = 0;
      const iv = setInterval(() => {
        n++;
        if (window.google) { clearInterval(iv); setTimeout(init, 80); }
        if (n > 25) clearInterval(iv);
      }, 200);
      return () => clearInterval(iv);
    }
  }, [tab]);

  async function handleGoogleCredential(response) {
    if (!response?.credential) { setError('No credential received. Try again.'); return; }
    setGoogleLoading(true); setError('');
    try {
      const data = await googleLogin(response.credential);
      loginWithToken(data.token, data.user);
      onClose();
    } catch (err) { setError(err.message || 'Google sign-in failed.'); }
    setGoogleLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    try {
      if (tab === 'signup') {
        if (!name.trim()) { setError('Please enter your name.'); setLoading(false); return; }
        const data = await emailSignup(name.trim(), email.trim(), password);
        setSuccess('Account created! Signing you in...');
        setTimeout(() => { loginWithToken(data.token, data.user); onClose(); }, 900);
      } else {
        const data = await emailLogin(email.trim(), password);
        loginWithToken(data.token, data.user);
        onClose();
      }
    } catch (err) { setError(err.message || 'Authentication failed.'); }
    setLoading(false);
  }

  function switchTab(t) {
    setTab(t); setError(''); setSuccess('');
    setName(''); setEmail(''); setPassword('');
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="login-modal" onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button className="modal-close" onClick={onClose}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {/* Logo */}
        <div className="login-logo">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="var(--accent-orange)"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="var(--accent-purple)" strokeWidth="1.5"/>
          </svg>
          <span style={{fontFamily:'var(--font-display)', fontSize:'1rem', fontWeight:700, color:'var(--text-primary)'}}>
            iden<span style={{color:'var(--accent-orange)'}}>webstudio</span>
          </span>
        </div>

        {/* Title */}
        <h2 className="login-title">
          {tab === 'signin' ? 'Welcome back' : 'Create account'}
        </h2>
        <p className="login-subtitle">
          {tab === 'signin'
            ? 'Sign in to bookmark novels and track your progress.'
            : 'Join idenwebstudio and start reading today.'}
        </p>

        {/* Email / Password form — PRIMARY */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {tab === 'signup' && (
            <div className="auth-field">
              <label>Username</label>
              <input
                type="text" placeholder="Your display name"
                value={name} onChange={e => setName(e.target.value)}
                required autoComplete="username"
              />
            </div>
          )}
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email" placeholder="you@email.com"
              value={email} onChange={e => setEmail(e.target.value)}
              required autoComplete="email"
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <div className="auth-pass-wrap">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder={tab === 'signup' ? 'Min. 6 characters' : 'Enter your password'}
                value={password} onChange={e => setPassword(e.target.value)}
                required minLength={tab === 'signup' ? 6 : 1}
                autoComplete={tab === 'signup' ? 'new-password' : 'current-password'}
              />
              <button type="button" className="pass-toggle" onClick={() => setShowPass(s => !s)} tabIndex={-1}>
                {showPass
                  ? <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
          </div>

          {error   && <div className="auth-error">⚠ {error}</div>}
          {success && <div className="auth-success">✓ {success}</div>}

          <button type="submit" className="auth-submit-btn" disabled={loading || googleLoading}>
            {loading
              ? <span className="btn-loading"><span className="btn-spinner"/>Please wait...</span>
              : tab === 'signin' ? 'Sign In' : 'Create Account'
            }
          </button>
        </form>

        {/* Switch tab link */}
        <div className="auth-switch">
          {tab === 'signin'
            ? <>Don't have an account? <button onClick={() => switchTab('signup')}>Sign Up</button></>
            : <>Already have an account? <button onClick={() => switchTab('signin')}>Sign In</button></>
          }
        </div>

        {/* Divider */}
        <div className="auth-divider"><span>or</span></div>

        {/* Google — SECONDARY */}
        <div className="auth-google-wrap">
          {googleLoading
            ? <div className="login-loading"><div className="login-spinner"/><span>Connecting to Google...</span></div>
            : <div ref={googleBtnRef} style={{minHeight:'44px', display:'flex', alignItems:'center', justifyContent:'center', width:'100%'}}/>
          }
          {!clientId && <div className="login-env-warning">Google Sign-In not configured</div>}
        </div>

        <p className="login-footer-note">
          By continuing you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const { user, loginWithToken, logout } = useAuth();
  const [searchQuery, setSearchQuery]   = useState('');
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showAuth, setShowAuth]         = useState(false);
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/browse?q=' + encodeURIComponent(searchQuery));
      setSearchQuery('');
    }
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner container">
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="var(--accent-orange)"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="var(--accent-purple)" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            <span className="logo-text">iden<span className="logo-accent">webstudio</span></span>
          </Link>

          <div className="navbar-links">
            <Link to="/"         className="nav-link">Home</Link>
            <Link to="/browse"   className="nav-link">Browse</Link>
            <Link to="/genres"   className="nav-link">Genres</Link>
            <Link to="/rankings" className="nav-link">Rankings</Link>
            <Link to="/updates"  className="nav-link">Updates</Link>
          </div>

          <form className="navbar-search" onSubmit={handleSearch}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              type="text" placeholder="Search novels..."
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            />
          </form>

          <div className="navbar-actions">
            <a href="https://ko-fi.com/idenwebstudio" target="_blank" rel="noopener noreferrer" className="kofi-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.623.782-.623.782s-.01 7.537-.01 11.306c0 3.704 2.498 4.557 4.722 4.557h9.975c3.5 0 6.12-2.13 6.12-5.553 0-1.768-.917-3.22-2.108-4.142z"/></svg>
              <span>Support</span>
            </a>

            {user ? (
              <div className="user-menu-wrap">
                <button className="user-avatar-btn" onClick={() => setUserMenuOpen(o => !o)}>
                  {user.avatar
                    ? <img src={user.avatar} alt={user.name} className="user-avatar-img" referrerPolicy="no-referrer"/>
                    : <div className="user-avatar-placeholder">{user.name?.[0]?.toUpperCase()}</div>
                  }
                </button>
                {userMenuOpen && (
                  <div className="user-dropdown">
                    <div className="dropdown-user-info">
                      <div className="dropdown-user-name">{user.name}</div>
                      <div className="dropdown-user-email">{user.email}</div>
                      <div style={{fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--accent-purple)', marginTop:'2px', textTransform:'uppercase'}}>{user.role}</div>
                    </div>
                    <div className="dropdown-divider"/>
                    {user.role === 'admin' && (
                      <Link to="/dashboard" onClick={() => setUserMenuOpen(false)}>Dashboard</Link>
                    )}
                    <Link to="/bookmarks" onClick={() => setUserMenuOpen(false)} style={{display:'flex', alignItems:'center', gap:'8px'}}>
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                      My Bookmarks
                    </Link>
                    <div className="dropdown-divider"/>
                    <button className="dropdown-logout" onClick={() => { logout(); setUserMenuOpen(false); }}>Sign Out</button>
                  </div>
                )}
              </div>
            ) : (
              <button className="sign-in-btn" onClick={() => setShowAuth(true)}>
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Sign In
              </button>
            )}

            <button className="mobile-menu-btn" onClick={() => setMobileOpen(o => !o)}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="mobile-menu">
            <div className="container">
              <form className="mobile-search" onSubmit={handleSearch}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </form>
              <Link to="/"         className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/browse"   className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Browse</Link>
              <Link to="/genres"   className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Genres</Link>
              <Link to="/rankings" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Rankings</Link>
              <Link to="/updates"  className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Updates</Link>
              {user?.role === 'admin' && (
                <Link to="/dashboard" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              )}
              {user && (
                <Link to="/bookmarks" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>🔖 My Bookmarks</Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} loginWithToken={loginWithToken} />}
    </>
  );
}
