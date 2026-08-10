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
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'spotlight'

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

    return result;
  }, [products, categoryParam, queryParam]);

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
    <main style={{ padding: '8rem 0', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--platinum)' }}>
        could not load program index — {error}
      </p>
    </main>
  );

  return (
    <main className="ceremony-program">
      <div className="container">
        {/* Header */}
        <div className="ceremony-program__header">
          <span className="ceremony-program__subtitle">
            {queryParam ? `search query: "${queryParam}"` : 'the ceremonial program'}
          </span>
          <h1 className="ceremony-program__title">
            {categoryParam === 'All' ? 'Program Index' : categoryParam.toLowerCase()}
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: 'var(--platinum)', opacity: 0.7, marginTop: '8px' }}>
            {filtered.length} releases cataloged in order of unveiling
          </p>
        </div>

        {/* Filters */}
        <div className="ceremony-program__filters">
          {queryParam && (
            <button 
              onClick={handleClearSearch}
              className="ceremony-program__filter-btn"
              style={{ background: 'var(--garnet)', color: 'var(--porcelain)' }}
            >
              clear search ×
            </button>
          )}

          {allCategoryNames.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`ceremony-program__filter-btn ${cat === categoryParam ? 'is-active' : ''}`}
            >
              {cat.toLowerCase()}
            </button>
          ))}

          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setViewMode('list')}
              className={`ceremony-program__filter-btn ${viewMode === 'list' ? 'is-active' : ''}`}
            >
              program list
            </button>
            <button 
              onClick={() => setViewMode('spotlight')}
              className={`ceremony-program__filter-btn ${viewMode === 'spotlight' ? 'is-active' : ''}`}
            >
              spotlight track
            </button>
          </div>
        </div>

        <div className="scepter-line" style={{ marginBottom: '2rem' }}></div>

        {/* View Mode Switch: Ceremonial List vs Spotlight */}
        {viewMode === 'list' ? (
          <div>
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} layout="row" />
            ))}
          </div>
        ) : (
          <div>
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} layout="spotlight" />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
