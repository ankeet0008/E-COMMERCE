import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProducts } from '../data/ProductsContext';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

export default function BrowsePage() {
  const { products, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const queryParam = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState('featured');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const categoriesList = [
    'All',
    'Sofas',
    'Sessel',
    'Stühle',
    'Esstische',
    'Teppiche',
    'Spiegel',
    'Aufbewahrung',
    'Betten',
    'Esstisch-Sets'
  ];

  const filtered = useMemo(() => {
    let list = [...products];

    if (categoryParam !== 'All') {
      list = list.filter(
        p => p.category.toLowerCase() === categoryParam.toLowerCase()
      );
    }

    if (queryParam) {
      const q = queryParam.toLowerCase();
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => (a.sale ? a.salePrice : a.price) - (b.sale ? b.salePrice : b.price));
        break;
      case 'price-desc':
        list.sort((a, b) => (b.sale ? b.salePrice : b.price) - (a.sale ? a.salePrice : a.price));
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return list;
  }, [products, categoryParam, queryParam, sortBy]);

  const handleCategorySelect = (cat) => {
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleClearQuery = () => {
    searchParams.delete('q');
    setSearchParams(searchParams);
  };

  if (loading) {
    return (
      <main className="pt-32 pb-20 flex justify-center items-center min-h-[60vh]">
        <Spinner />
      </main>
    );
  }

  if (error) {
    return (
      <main className="pt-32 pb-20 text-center px-4">
        <p className="text-on-surface-variant font-medium">Die Produkte konnten momentan nicht geladen werden.</p>
      </main>
    );
  }

  const visibleProducts = filtered.slice(0, visibleCount);

  return (
    <main className="w-full pt-20">
      {/* Page Header & Filter/Sort Bar */}
      <section className="px-margin-mobile md:px-margin-desktop py-8 bg-surface-container-low border-b border-outline-variant/30">
        <div className="max-w-container-max mx-auto flex flex-col gap-4">
          {/* Breadcrumbs */}
          <div className="text-label-caps text-on-surface-variant flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
            <Link to="/" className="hover:text-primary transition-colors">HOME</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-on-surface">{categoryParam === 'All' ? 'SHOP ALL' : categoryParam.toUpperCase()}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-headline-md text-headline-md text-on-surface font-semibold">
                {queryParam ? `Suchergebnisse für "${queryParam}"` : (categoryParam === 'All' ? 'Alle Produkte' : categoryParam)}
              </h1>
              <p className="text-sm text-on-surface-variant mt-1">
                {filtered.length} {filtered.length === 1 ? 'Designstück' : 'Designstücke'} kuratiert für dein Zuhause
              </p>
            </div>

            {queryParam && (
              <button
                onClick={handleClearQuery}
                className="self-start md:self-auto text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors flex items-center gap-1"
              >
                <span>Filter löschen: {queryParam}</span>
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>

          {/* Category Chips Scroll */}
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pt-2 pb-1">
            {categoriesList.map((cat) => {
              const isActive = (cat === 'All' && categoryParam === 'All') || cat === categoryParam;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive 
                      ? 'bg-primary text-on-primary shadow-xs' 
                      : 'bg-surface border border-outline-variant/50 text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {cat === 'All' ? 'Alle' : cat}
                </button>
              );
            })}
          </div>

          {/* Filter / Sort Interactive Bar */}
          <div className="flex justify-between items-center mt-2 border-t border-outline-variant/40 pt-3">
            <button 
              onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
              className="flex items-center gap-2 text-on-surface font-body-md text-sm hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-base">tune</span>
              <span>Filter ({filtered.length})</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-on-surface-variant hidden sm:inline">Sortieren:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-surface text-on-surface text-xs font-medium border border-outline-variant/60 rounded-full px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="featured">Empfohlen</option>
                <option value="price-asc">Preis: Niedrig bis Hoch</option>
                <option value="price-desc">Preis: Hoch bis Niedrig</option>
                <option value="name">Alphabetisch (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-margin-mobile md:px-margin-desktop py-8 max-w-container-max mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-surface-container-low rounded-2xl p-8">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
            <p className="font-headline-sm text-lg text-on-surface mb-2 font-medium">Keine Produkte gefunden</p>
            <p className="text-sm text-on-surface-variant mb-6">Bitte versuche es mit einem anderen Suchbegriff oder Filter.</p>
            <button
              onClick={() => {
                searchParams.delete('category');
                searchParams.delete('q');
                setSearchParams(searchParams);
              }}
              className="px-6 py-2.5 bg-primary text-on-primary rounded-full text-sm font-medium hover:bg-primary-container transition-colors"
            >
              Alle Filter zurücksetzen
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {visibleCount < filtered.length && (
              <div className="mt-12 flex justify-center">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 8)}
                  className="border border-outline text-on-surface px-8 py-3 rounded-full font-body-md text-sm font-medium hover:bg-surface-variant transition-colors"
                >
                  Mehr laden ({filtered.length - visibleCount} weitere)
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Trust Indicators */}
      <section className="bg-surface-container-low py-12 px-margin-mobile md:px-margin-desktop border-t border-outline-variant/30 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-container-max mx-auto">
          <div className="text-center">
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-medium">
              Persönlich kuratiert
            </h4>
            <p className="text-on-surface-variant font-body-md text-sm">
              Designauswahl statt unübersichtlicher Masse
            </p>
          </div>
          <div className="text-center">
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-medium">
              Sicher einkaufen
            </h4>
            <p className="text-on-surface-variant font-body-md text-sm">
              Verlässliche Zahlarten und verschlüsselte Zahlung
            </p>
          </div>
          <div className="text-center">
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-medium">
              Transparent geliefert
            </h4>
            <p className="text-on-surface-variant font-body-md text-sm">
              Lieferzeit direkt am jeweiligen Produkt
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
