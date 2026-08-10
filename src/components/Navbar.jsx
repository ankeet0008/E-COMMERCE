import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../data/CartContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const count = getCount();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isHome = location.pathname === '/';

  return (
    <header className={`luxury-header ${isHome ? 'luxury-header--hero' : ''}`}>
      <div className="luxury-header__inner">
        {/* Left: Luxury Menu trigger */}
        <div className="luxury-header__left">
          <button 
            className="luxury-header__menu-btn" 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            <span className="luxury-header__menu-icon">
              <span></span>
              <span></span>
            </span>
            <span className="luxury-header__menu-text">Menu</span>
          </button>
        </div>

        {/* Center: Luxury Logo Crest & Brand Title */}
        <div className="luxury-header__center">
          <Link to="/" className="luxury-header__brand">
            <svg className="luxury-header__crest" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4L24.5 13H15.5L20 4Z" fill="currentColor"/>
              <path d="M12 16H28V18H12V16Z" fill="currentColor"/>
              <path d="M14 20H26V34H14V20Z" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="20" cy="27" r="3" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M20 4V36" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2"/>
            </svg>
            <span className="luxury-header__title">ATELIER & CO.</span>
            <span className="luxury-header__subtitle">MAISON FLAGSTORE</span>
          </Link>
        </div>

        {/* Right: Sleek Action Icons */}
        <div className="luxury-header__right">
          <button 
            className="luxury-header__action-btn"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
            title="Search"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="16.5" y1="16.5" x2="22" y2="22"></line>
            </svg>
          </button>

          <Link to="/browse" className="luxury-header__action-btn" title="Explore Catalog">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </Link>

          <Link to="/cart" className="luxury-header__action-btn luxury-header__bag" title="Shopping Bag">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {count > 0 && <span className="luxury-header__bag-count">{count}</span>}
          </Link>
        </div>
      </div>

      {/* Expanded Quick Navigation Overlay */}
      {mobileOpen && (
        <div className="luxury-nav-overlay" onClick={() => setMobileOpen(false)}>
          <div className="luxury-nav-overlay__content" onClick={e => e.stopPropagation()}>
            <div className="luxury-nav-overlay__header">
              <span>EXPLORE DEPARTMENTS</span>
              <button onClick={() => setMobileOpen(false)}>✕</button>
            </div>
            <nav className="luxury-nav-overlay__links">
              <Link to="/" onClick={() => setMobileOpen(false)}>
                <span>01</span> Home & Atelier
              </Link>
              <Link to="/browse" onClick={() => setMobileOpen(false)}>
                <span>02</span> All Collections
              </Link>
              <Link to="/browse?category=Beauty" onClick={() => setMobileOpen(false)}>
                <span>03</span> Beauty & Apothecary
              </Link>
              <Link to="/browse?category=Fragrances" onClick={() => setMobileOpen(false)}>
                <span>04</span> Fine Fragrances
              </Link>
              <Link to="/browse?category=Furniture" onClick={() => setMobileOpen(false)}>
                <span>05</span> Maison Furniture
              </Link>
              <Link to="/cart" onClick={() => setMobileOpen(false)}>
                <span>06</span> Your Selection ({count})
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Glassmorphic Top Search Bar */}
      {searchOpen && (
        <div className="luxury-search-bar">
          <div className="container">
            <form onSubmit={handleSearchSubmit} className="luxury-search-bar__form">
              <input 
                type="text" 
                placeholder="Search luxury inventory, collections, materials..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit">SEARCH</button>
              <button type="button" onClick={() => setSearchOpen(false)}>CANCEL</button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
