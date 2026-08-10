import { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../data/CartContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getCount } = useCart();
  const receiptRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const count = getCount();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = new FormData(e.target).get('q').trim();
    if (q) {
      navigate(`/browse?q=${encodeURIComponent(q)}`);
      setMobileOpen(false);
      e.target.reset();
    }
  };

  return (
    <nav className="nav" aria-label="Main navigation">
      <div className="container nav__inner">
        <Link to="/" className="nav__brand">The General Store</Link>

        <button
          className={`nav__toggle ${mobileOpen ? 'is-open' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav__links ${mobileOpen ? 'is-open' : ''}`}>
          <Link
            to="/"
            className={`nav__link ${isActive('/') && !isActive('/browse') ? 'nav__link--active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            Directory
          </Link>
          <Link
            to="/browse"
            className={`nav__link ${isActive('/browse') ? 'nav__link--active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            Browse all
          </Link>

          <form className="nav__search" onSubmit={handleSearch}>
            <input type="text" name="q" placeholder="Search..." className="nav__search-input" aria-label="Search products" />
            <button type="submit" className="nav__search-btn" aria-label="Submit search">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
          <Link
            to="/cart"
            className="nav__cart-btn"
            aria-label="Shopping bag"
            onClick={() => setMobileOpen(false)}
          >
            <svg className="nav__cart-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinejoin="round"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {count > 0 && <span className="nav__cart-count">{count}</span>}
            <div ref={receiptRef} className="nav__cart-receipt"></div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
