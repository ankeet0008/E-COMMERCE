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
  const [sortBy, setSortBy] = useState('name');

  const allCategoryNames = ['All', ...categories.map(c => c.name)];

  const filtered = useMemo(() => {
    let result = [...products];
    
    if (categoryParam !== 'All') {
      result = result.filter(p => p.category === categoryParam);
    }
    
    if (queryParam) {
      const q = queryParam.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
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
      case 'stock':
        result.sort((a, b) => b.stock - a.stock);
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
    <main>
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--charcoal)', opacity: 0.6 }}>
          Could not load inventory — {error}
        </p>
      </div>
    </main>
  );

  return (
    <main>
      <div className="container">
        <div className="ledger-header">
          <div className="ledger-header__top">
            <h1 className="ledger-header__title">
              {queryParam ? `Search: "${queryParam}"` : (categoryParam === 'All' ? 'All Items' : categoryParam)}
            </h1>
            <span className="ledger-header__count">{filtered.length} items</span>
          </div>
          <div className="ledger-header__controls">
            {queryParam && (
              <button className="filter-chip is-active" onClick={handleClearSearch} style={{ backgroundColor: 'var(--rust-red)', borderColor: 'var(--rust-red)' }}>
                Clear Search ×
              </button>
            )}
            {allCategoryNames.map(cat => (
              <button
                key={cat}
                className={`filter-chip ${cat === categoryParam ? 'is-active' : ''}`}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </button>
            ))}
            <div className="ledger-header__divider" />
            <select
              className="sort-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              aria-label="Sort products"
            >
              <option value="name">Sort: A–Z</option>
              <option value="price-asc">Sort: Price ↑</option>
              <option value="price-desc">Sort: Price ↓</option>
              <option value="stock">Sort: Stock</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="product-grid">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </main>
  );
}
