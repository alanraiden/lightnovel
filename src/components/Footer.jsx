import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="var(--accent-orange)"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="var(--accent-purple)" strokeWidth="1.5"/>
              </svg>
              <span>iden<span style={{color:'var(--accent-orange)'}}>webstudio</span></span>
            </div>
            <p className="footer-tagline">Your gateway to infinite worlds. Discover, read, and lose yourself in thousands of light novels.</p>
            <a href="https://ko-fi.com/idenwebstudio" target="_blank" rel="noopener noreferrer" className="kofi-footer-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.623.782-.623.782s-.01 7.537-.01 11.306c0 3.704 2.498 4.557 4.722 4.557h9.975c3.5 0 6.12-2.13 6.12-5.553 0-1.768-.917-3.22-2.108-4.142.005-.005.94-1.267 1.07-2.356z"/>
              </svg>
              Support on Ko-fi
            </a>
          </div>

          <div className="footer-links-group">
            <div className="footer-links-title">Explore</div>
            <Link to="/browse">Browse All</Link>
            <Link to="/genres">Genres</Link>
            <Link to="/rankings">Rankings</Link>
            <Link to="/updates">Latest Updates</Link>
          </div>

          <div className="footer-links-group">
            <div className="footer-links-title">Authors</div>
            <Link to="/dashboard">Author Dashboard</Link>
            <Link to="/dashboard/upload">Upload Chapter</Link>
            <a href="#">Guidelines</a>
            <a href="#">Content Policy</a>
          </div>

          <div className="footer-links-group">
            <div className="footer-links-title">Platform</div>
            <a href="#">About Us</a>
            <a href="#">Contact</a>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/privacy">Terms of Service</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 idenwebstudio. All rights reserved.</p>
          <p>Powered by <span style={{color:'var(--accent-purple)'}}>idenwebstudio</span></p>
        </div>
      </div>
    </footer>
  );
}
