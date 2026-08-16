import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../data/CartContext';
import { useProducts } from '../data/ProductsContext';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getCount } = useCart();
  const { categories } = useProducts();
  const count = getCount();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navCategories = [
    { name: 'Alle Produkte', path: '/browse' },
    { name: 'Sofas', path: '/browse?category=Sofas' },
    { name: 'Sessel', path: '/browse?category=Sessel' },
    { name: 'Stühle', path: '/browse?category=Stühle' },
    { name: 'Esstische', path: '/browse?category=Esstische' },
    { name: 'Teppiche', path: '/browse?category=Teppiche' },
    { name: 'Spiegel', path: '/browse?category=Spiegel' },
    { name: 'Aufbewahrung', path: '/browse?category=Aufbewahrung' },
    { name: 'Betten', path: '/browse?category=Betten' },
    { name: 'Esstisch-Sets', path: '/browse?category=Esstisch-Sets' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#fcf9f8]/85 backdrop-blur-md flex justify-between items-center h-20 px-[20px] md:px-[64px] transition-all duration-300 border-b border-outline-variant/30">
        {/* Left: Menu Drawer Toggle */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setDrawerOpen(true)}
            className="text-on-surface-variant hover:text-primary transition-colors duration-300 p-2 rounded-full hover:bg-surface-container"
            aria-label="Navigation Menu"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
        </div>

        {/* Center: Brand Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="inline-block">
            <span className="font-display-lg text-[28px] md:text-[36px] tracking-tighter text-on-surface font-semibold select-none">
              SKANVI
            </span>
          </Link>
        </div>

        {/* Right: Search & Shopping Bag */}
        <div className="flex items-center gap-2 md:gap-4 text-on-surface-variant">
          <button 
            onClick={() => setSearchOpen(!searchOpen)}
            className="hover:text-primary transition-colors duration-300 p-2 rounded-full hover:bg-surface-container"
            aria-label="Suche"
          >
            <span className="material-symbols-outlined text-[24px]">search</span>
          </button>
          
          <Link 
            to="/cart"
            className="hover:text-primary transition-colors duration-300 relative p-2 rounded-full hover:bg-surface-container flex items-center justify-center"
            aria-label="Warenkorb"
          >
            <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            {count > 0 && (
              <span className="absolute top-1 right-1 bg-primary text-on-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {count}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Slide-in Navigation Drawer */}
      {drawerOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex transition-opacity duration-300"
          onClick={() => setDrawerOpen(false)}
        >
          <div 
            className="w-full max-w-sm bg-surface h-full shadow-2xl p-6 md:p-8 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex justify-between items-center pb-6 border-b border-outline-variant/40">
                <span className="font-display-lg text-2xl font-bold tracking-tighter text-on-surface">SKANVI</span>
                <button 
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="py-6">
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-4 tracking-wider">
                  Kategorien
                </p>
                <nav className="flex flex-col gap-3">
                  {navCategories.map((cat) => (
                    <Link
                      key={cat.name}
                      to={cat.path}
                      onClick={() => setDrawerOpen(false)}
                      className="font-headline-sm text-[17px] text-on-surface hover:text-primary py-2 px-3 rounded-lg hover:bg-surface-container flex items-center justify-between transition-colors"
                    >
                      <span>{cat.name}</span>
                      <span className="material-symbols-outlined text-sm text-outline">chevron_right</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            <div className="pt-6 border-t border-outline-variant/30 text-sm text-on-surface-variant">
              <p className="font-medium text-on-surface mb-1">Skanvi Living</p>
              <p className="text-xs text-secondary">Räume, die sich nach dir anfühlen. Editorial Minimalism for Slow Living.</p>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar Overlay */}
      {searchOpen && (
        <div 
          className="fixed top-20 left-0 w-full z-40 bg-surface/95 backdrop-blur-md border-b border-outline-variant/40 py-4 px-margin-mobile md:px-margin-desktop shadow-sm animate-fade-in"
        >
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-outline">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Wonach suchst du? (z.B. Sofa, Sessel, Teppich, Spiegel)..."
                className="w-full pl-12 pr-28 py-3.5 bg-surface-container rounded-full text-on-surface placeholder:text-on-surface-variant/60 outline-none focus:ring-2 focus:ring-primary text-sm md:text-base border border-transparent"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 px-5 py-2 bg-primary text-on-primary rounded-full text-sm font-medium hover:bg-primary-container transition-colors"
              >
                Suchen
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
