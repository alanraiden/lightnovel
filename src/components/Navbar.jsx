import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { googleLogin } from '../services/api';
import './Navbar.css';

export default function Navbar() {
  const { user, token, loginWithToken, logout } = useAuth();
  const [searchQuery, setSearchQuery]   = useState('');
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginError, setLoginError]     = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate    = useNavigate();
  const googleBtnRef = useRef(null);
  const clientId    = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Initialize Google once when modal opens
  useEffect(() => {
    if (!showLoginModal) return;
    setLoginError('');

    function initGoogle() {
      if (!window.google || !googleBtnRef.current) return;
      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredential,
          ux_mode: 'popup',
        });
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: 'filled_black',
          size: 'large',
          shape: 'rectangular',
          width: 280,
          text: 'signin_with',
          logo_alignment: 'center',
        });
      } catch (e) {
        console.error('Google init error:', e);
        setLoginError('Google Sign-In failed to load. Please refresh.');
      }
    }

    // Wait for Google script + DOM
    if (window.google) {
      setTimeout(initGoogle, 50);
    } else {
      // Poll until google script loads
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (window.google) { clearInterval(interval); setTimeout(initGoogle, 50); }
        if (attempts > 20) { clearInterval(interval); setLoginError('Google Sign-In unavailable. Check your internet connection.'); }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [showLoginModal]);

  async function handleCredential(response) {
    if (!response?.credential) {
      setLoginError('No credential received. Please try again.');
      return;
    }
    setLoginLoading(true);
    setLoginError('');
    try {
      const data = await googleLogin(response.credential);
      if (data.error) throw new Error(data.error);
      loginWithToken(data.token, data.user);
      setShowLoginModal(false);
      setLoginLoading(false);
    } catch (err) {
      console.error('Login error:', err);
      setLoginError('Sign-in failed: ' + (err.message || 'Please try again.'));
      setLoginLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/browse?q=' + encodeURIComponent(searchQuery));
      setSearchQuery('');
    }
  }

  function openModal() {
    setShowLoginModal(true);
    setLoginError('');
    setLoginLoading(false);
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
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/browse" className="nav-link">Browse</Link>
            <Link to="/genres" className="nav-link">Genres</Link>
            <Link to="/rankings" className="nav-link">Rankings</Link>
            <Link to="/updates" className="nav-link">Updates</Link>
          </div>

          <form className="navbar-search" onSubmit={handleSearch}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input type="text" placeholder="Search title, author, tags..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </form>

          <div className="navbar-actions">
            <a href="https://ko-fi.com/idenwebstudio" target="_blank" rel="noopener noreferrer" className="kofi-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.623.782-.623.782s-.01 7.537-.01 11.306c0 3.704 2.498 4.557 4.722 4.557h9.975c3.5 0 6.12-2.13 6.12-5.553 0-1.768-.917-3.22-2.108-4.142z"/></svg>
              <span>Support</span>
            </a>

            {user ? (
              <div className="user-menu-wrap">
                <button className="user-avatar-btn" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  {user.avatar
                    ? <img src={user.avatar} alt={user.name} className="user-avatar-img" referrerPolicy="no-referrer" />
                    : <div className="user-avatar-placeholder">{user.name?.[0]}</div>
                  }
                </button>
                {userMenuOpen && (
                  <div className="user-dropdown">
                    <div className="dropdown-user-info">
                      <div className="dropdown-user-name">{user.name}</div>
                      <div className="dropdown-user-email">{user.email}</div>
                      <div style={{fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--accent-purple)', marginTop:'2px'}}>{user.role}</div>
                    </div>
                    <div className="dropdown-divider"/>
                    {user.role === 'admin' && (
                      <Link to="/dashboard" onClick={() => setUserMenuOpen(false)}>Dashboard</Link>
                    )}
                    <div className="dropdown-divider"/>
                    <button className="dropdown-logout" onClick={() => { logout(); setUserMenuOpen(false); }}>Sign Out</button>
                  </div>
                )}
              </div>
            ) : (
              <button className="sign-in-btn" onClick={openModal}>
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Sign In
              </button>
            )}

            <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
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
              <Link to="/" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/browse" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Browse</Link>
              <Link to="/genres" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Genres</Link>
              <Link to="/rankings" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Rankings</Link>
              <Link to="/updates" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Updates</Link>
              {user?.role === 'admin' && <Link to="/dashboard" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Dashboard</Link>}
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-backdrop" onClick={() => setShowLoginModal(false)}>
          <div className="login-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowLoginModal(false)}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            <div className="login-logo">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="var(--accent-orange)"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="var(--accent-purple)" strokeWidth="1.5"/>
              </svg>
            </div>

            <h2 className="login-title">Welcome to idenwebstudio</h2>
            <p className="login-subtitle">Sign in to bookmark novels and track your reading progress.</p>

            <div className="login-google-wrap">
              {loginLoading ? (
                <div className="login-loading">
                  <div className="login-spinner" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <div ref={googleBtnRef} style={{minHeight:'44px', display:'flex', alignItems:'center', justifyContent:'center'}} />
              )}

              {!clientId && (
                <div className="login-env-warning">
                  VITE_GOOGLE_CLIENT_ID is not set in environment variables.
                </div>
              )}

              {loginError && (
                <div className="login-error-msg">{loginError}</div>
              )}
            </div>

            <div className="login-footer-note">
              By signing in you agree to our Terms of Service and Privacy Policy.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
