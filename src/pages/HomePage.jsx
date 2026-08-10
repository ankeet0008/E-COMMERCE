import { Link } from 'react-router-dom';
import { useProducts } from '../data/ProductsContext';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

function generateTallyMarks(count) {
  const groups = Math.floor(count / 5);
  const remainder = count % 5;
  const marks = [];
  for (let g = 0; g < Math.min(groups, 6); g++) {
    for (let i = 0; i < 4; i++) marks.push('vertical');
    marks.push('diagonal');
  }
  for (let r = 0; r < Math.min(remainder, 4); r++) marks.push('vertical');
  return marks;
}

function DirectoryRow({ category, index, image }) {
  const tallyCount = Math.min(Math.ceil(category.totalStock / 10), 25);
  const tallyMarks = generateTallyMarks(tallyCount);

  return (
    <Link
      to={`/browse?category=${encodeURIComponent(category.name)}`}
      className="directory__row"
    >
      <div className="directory__row-left">
        <span className="directory__row-number">{String(index + 1).padStart(2, '0')}</span>
        {image && (
          <div className="directory__row-image">
            <img src={image} alt={category.name} loading="lazy" />
          </div>
        )}
        <span className="directory__row-name">{category.name}</span>
      </div>
      <div className="directory__row-right">
        <div className="directory__tally">
          {tallyMarks.map((type, i) => (
            <span
              key={i}
              className={`directory__tally-mark${type === 'diagonal' ? ' directory__tally-mark--diagonal' : ''}`}
            />
          ))}
        </div>
        <span className="directory__row-count">{category.totalStock} in stock</span>
        <span className="directory__row-arrow">→</span>
      </div>
    </Link>
  );
}

function CategoryRail({ categoryName, products }) {
  return (
    <section className="category-rail">
      <div className="section-header">
        <div>
          <span className="section-header__title">{categoryName}</span>
          <span className="section-header__count">{products.length} items</span>
        </div>
        <Link to={`/browse?category=${encodeURIComponent(categoryName)}`} className="section-header__link">
          View all →
        </Link>
      </div>
      <div className="category-rail__scroll">
        {products.slice(0, 6).map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

export default function HomePage() {
  const { products, categories, loading, error } = useProducts();

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

  // Pick the first 4 categories that have products for the rails
  const featuredCategories = categories.slice(0, 4);

  return (
    <main>
      <section className="directory" aria-label="Store directory">
        <div className="container">
          <h1 className="directory__title">Aisle directory</h1>
          <p className="directory__subtitle">Everything in stock, sorted by department</p>
          <div className="directory__grid">
            {categories.map((cat, i) => {
              const firstProduct = products.find(p => p.category === cat.name);
              const img = firstProduct ? firstProduct.image : null;
              return <DirectoryRow key={cat.name} category={cat} index={i} image={img} />;
            })}
          </div>
        </div>
      </section>

      <section className="container" aria-label="Featured categories">
        {featuredCategories.map(cat => {
          const catProducts = products.filter(p => p.category === cat.name);
          return (
            <CategoryRail key={cat.name} categoryName={cat.name} products={catProducts} />
          );
        })}
      </section>
    </main>
  );
}
