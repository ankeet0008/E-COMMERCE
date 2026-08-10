import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../data/CartContext';

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { getCount } = useCart();
  const count = getCount();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/browse?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery('');
    }
  };

  return (
    <header className="spotlight-nav">
      <div className="spotlight-nav__inner">
        {/* Left: Quiet Procession Trigger */}
        <div className="spotlight-nav__left">
          <Link to="/browse" className="spotlight-nav__link">
            the procession
          </Link>
        </div>

        {/* Center: Signature Platinum Wax-Seal Emblem */}
        <div className="spotlight-nav__center">
          <Link to="/" className="wax-seal" title="The Unveiling — Ceremony & Restraint">
            <svg className="wax-seal-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 6V18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          </Link>
        </div>

        {/* Right: Search & Selections */}
        <div className="spotlight-nav__right">
          <button 
            className="spotlight-nav__link" 
            onClick={() => setSearchOpen(!searchOpen)}
            style={{ cursor: 'pointer' }}
          >
            search
          </button>

          <Link to="/cart" className="spotlight-nav__link">
            your selections
            {count > 0 && <span className="spotlight-nav__badge">{count}</span>}
          </Link>
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div style={{ background: 'var(--imperial)', padding: '1.25rem 0', borderBottom: '1px solid var(--platinum-border)' }}>
          <div className="container">
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input 
                type="text" 
                placeholder="search the limited releases..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                style={{ flex: 1, background: 'transparent', border: 'none', borderBottom: '1px solid var(--platinum)', color: 'var(--porcelain)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', outline: 'none', padding: '6px 0' }}
                autoFocus
              />
              <button type="submit" className="spotlight-nav__link">reveal</button>
              <button type="button" onClick={() => setSearchOpen(false)} className="spotlight-nav__link" style={{ opacity: 0.6 }}>close</button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
