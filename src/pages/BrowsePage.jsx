import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../data/ProductsContext';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

export default function BrowsePage() {
  const { products, categories, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const queryParam = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState('lot');

  const allCategoryNames = ['All', ...categories.map(c => c.name)];

  const filtered = useMemo(() => {
    let result = [...products];

    if (categoryParam !== 'All') {
      result = result.filter(p => p.category === categoryParam);
    }

    if (queryParam) {
      const q = queryParam.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        result.sort((a, b) => (a.sale ? a.salePrice : a.price) - (b.sale ? b.salePrice : b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.sale ? b.salePrice : b.price) - (a.sale ? a.salePrice : a.price));
        break;
      case 'lot':
      default:
        result.sort((a, b) => a.id - b.id);
        break;
    }

    return result;
  }, [products, categoryParam, queryParam, sortBy]);

  const handleCategoryClick = (cat) => {
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleClearSearch = () => {
    searchParams.delete('q');
    setSearchParams(searchParams);
  };

  if (loading) return <main><Spinner /></main>;
  if (error) return (
    <main style={{ padding: '6rem 0', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--ivory)' }}>
        The Archive is temporarily inaccessible — {error}
      </p>
    </main>
  );

  return (
    <main style={{ paddingBottom: '6rem' }}>
      <div className="container" style={{ paddingTop: '4rem' }}>
        {/* Header Placard */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="royal-section-header__tag">CHAMBER DIRECTORY</span>
          <h1 className="royal-section-header__title">
            {queryParam ? `Search Archives: "${queryParam}"` : (categoryParam === 'All' ? 'The Complete Royal Collection' : categoryParam)}
          </h1>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', opacity: 0.8, marginTop: '8px' }}>
            Cataloged lots currently available for acquisition ({filtered.length} items registered)
          </p>
        </div>

        {/* Filter Bar & Sort */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem', borderBottom: '1px solid rgba(168,130,60,0.25)', paddingBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {queryParam && (
              <button 
                onClick={handleClearSearch}
                style={{ background: 'var(--burgundy)', color: 'var(--ivory)', padding: '6px 14px', fontFamily: 'var(--font-sans)', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}
              >
                Clear Search ×
              </button>
            )}
            {allCategoryNames.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                style={{
                  background: cat === categoryParam ? 'var(--brass)' : 'transparent',
                  color: cat === categoryParam ? 'var(--emerald-dark)' : 'var(--ivory)',
                  border: '1px solid var(--brass)',
                  padding: '6px 16px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  transition: 'all 300ms'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              background: 'var(--emerald-dark)',
              color: 'var(--brass)',
              border: '1px solid var(--brass)',
              padding: '6px 14px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              outline: 'none'
            }}
          >
            <option value="lot">Sort: Lot Number</option>
            <option value="name">Sort: Title A–Z</option>
            <option value="price-asc">Sort: Valuation ↑</option>
            <option value="price-desc">Sort: Valuation ↓</option>
          </select>
        </div>

        {/* Gallery Wall Grid */}
        <div className="royal-gallery-grid">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </main>
  );
}
