import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../data/CartContext';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { getCount } = useCart();
  const count = getCount();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/browse?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery('');
    }
  };

  return (
    <header className="royal-header">
      {/* Top Warrant Banner */}
      <div className="royal-header__top-banner">
        <span>By Appointment Purveyors of Fine Objects · Royal Court Warrant Est. 1884</span>
      </div>

      <div className="royal-header__inner">
        {/* Left: Room Directory Drawer Trigger */}
        <div className="royal-header__left">
          <button 
            className="royal-header__drawer-btn"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open Room Directory"
          >
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5"/>
              <line y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="1.5"/>
              <line y1="11" x2="18" y2="11" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>The Chambers</span>
          </button>
        </div>

        {/* Center: Monogram Crest & Brand Title */}
        <div className="royal-header__center">
          <Link to="/" className="royal-header__brand">
            <svg className="royal-header__crest-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 3L25 12H15L20 3Z" fill="currentColor"/>
              <path d="M10 16H30V18H10V16Z" fill="currentColor"/>
              <path d="M12 20H28V35H12V20Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M16 26C16 23.7909 17.7909 22 20 22C22.2091 22 24 23.7909 24 26V35H16V26Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2"/>
              <circle cx="20" cy="9" r="1.5" fill="currentColor"/>
            </svg>
            <span className="royal-header__title">THE ROYAL EMPORIUM</span>
            <span className="royal-header__warrant">BY APPOINTMENT — EST. 1884</span>
          </Link>
        </div>

        {/* Right: Search & Reserved Items Badge */}
        <div className="royal-header__right">
          <button 
            className="royal-header__icon-btn" 
            onClick={() => setSearchOpen(!searchOpen)}
            title="Search Archives"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7"/>
              <line x1="16.5" y1="16.5" x2="22" y2="22"/>
            </svg>
          </button>

          <Link to="/browse" className="royal-header__icon-btn" title="View All Galleries">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
          </Link>

          <Link to="/cart" className="royal-header__icon-btn" title="Reserved Pieces">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {count > 0 && <span className="royal-header__reserved-badge">{count}</span>}
          </Link>
        </div>
      </div>

      {/* Drawer Overlay for Room Navigation */}
      {drawerOpen && (
        <div className="royal-drawer" onClick={() => setDrawerOpen(false)}>
          <div className="royal-drawer__content" onClick={e => e.stopPropagation()}>
            <div className="royal-drawer__header">
              <span>EMPORIUM ROOM DIRECTORY</span>
              <button onClick={() => setDrawerOpen(false)} style={{ color: 'var(--brass)' }}>✕</button>
            </div>
            <nav className="royal-drawer__links">
              <Link to="/" className="royal-drawer__link" onClick={() => setDrawerOpen(false)}>
                <span>I.</span> Grand Entrance & Courtyard
              </Link>
              <Link to="/browse" className="royal-drawer__link" onClick={() => setDrawerOpen(false)}>
                <span>II.</span> The Complete Collection
              </Link>
              <Link to="/browse?category=Beauty" className="royal-drawer__link" onClick={() => setDrawerOpen(false)}>
                <span>III.</span> The Royal Apothecary
              </Link>
              <Link to="/browse?category=Fragrances" className="royal-drawer__link" onClick={() => setDrawerOpen(false)}>
                <span>IV.</span> The Perfumer’s Cabinet
              </Link>

              <Link to="/cart" className="royal-drawer__link" onClick={() => setDrawerOpen(false)}>
                <span>V.</span> Reserved Pieces ({count})
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Search Bar Overlay */}
      {searchOpen && (
        <div className="royal-search">
          <div className="container">
            <form onSubmit={handleSearch} className="royal-search__form">
              <input 
                type="text" 
                placeholder="Search the royal collection by lot, material, or provenance..." 
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="royal-search__input"
                autoFocus
              />
              <button type="submit" className="royal-search__submit">Search Archives</button>
              <button type="button" onClick={() => setSearchOpen(false)} className="royal-search__submit" style={{ opacity: 0.6 }}>Close</button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
