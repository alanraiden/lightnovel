import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { googleLogin } from '../services/api';
import './Navbar.css';

export default function Navbar() {
  const { user, token, loginWithToken, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const googleBtnRef = useRef(null);

  // Initialize Google Sign-In button inside modal
  useEffect(() => {
    if (!showLoginModal) return;
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId || !window.google) return;
    const timer = setTimeout(() => {
      if (!googleBtnRef.current) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleResponse,
      });
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: 'filled_black',
        size: 'large',
        shape: 'rectangular',
        width: 280,
        text: 'signin_with',
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [showLoginModal]);

  async function handleGoogleResponse(response) {
    try {
      const data = await googleLogin(response.credential);
      loginWithToken(data.token, data.user);
      setShowLoginModal(false);
    } catch (err) {
      console.error('Login failed', err);
    }
  }

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
                    ? <img src={user.avatar} alt={user.name} className="user-avatar-img" />
                    : <div className="user-avatar-placeholder">{user.name?.[0]}</div>
                  }
                </button>
                {userMenuOpen && (
                  <div className="user-dropdown">
                    <div className="dropdown-user-info">
                      <div className="dropdown-user-name">{user.name}</div>
                      <div className="dropdown-user-email">{user.email}</div>
                    </div>
                    <div className="dropdown-divider"/>
                    <Link to="/dashboard" onClick={() => setUserMenuOpen(false)}>Author Dashboard</Link>
                    <Link to="/bookmarks" onClick={() => setUserMenuOpen(false)}>Bookmarks</Link>
                    <div className="dropdown-divider"/>
                    <button className="dropdown-logout" onClick={() => { logout(); setUserMenuOpen(false); }}>Sign Out</button>
                  </div>
                )}
              </div>
            ) : (
              <button className="sign-in-btn" onClick={() => setShowLoginModal(true)}>
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
              {user && <Link to="/dashboard" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Dashboard</Link>}
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
              <div ref={googleBtnRef} />
              {!import.meta.env.VITE_GOOGLE_CLIENT_ID && (
                <div className="login-env-warning">
                  Add VITE_GOOGLE_CLIENT_ID to your .env file to enable Google Sign-In
                </div>
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
