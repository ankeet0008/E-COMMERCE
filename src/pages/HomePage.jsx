import { Link } from 'react-router-dom';
import { useProducts } from '../data/ProductsContext';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

export default function HomePage() {
  const { products, loading, error } = useProducts();

  if (loading) return <main><Spinner /></main>;
  if (error) return (
    <main style={{ padding: '8rem 0', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--platinum)', opacity: 0.8 }}>
        the ceremony is temporarily delayed — {error}
      </p>
    </main>
  );

  const processionItems = products.slice(0, 6);

  return (
    <main>
      {/* ============================================================
          HERO — THE UNVEILING
          ============================================================ */}
      <section className="unveiling-hero">
        <div className="wax-seal unveiling-hero__seal">
          <svg className="wax-seal-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 6V18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </svg>
        </div>

        <h1 className="unveiling-hero__title">
          One object at a time. <br />
          Presented for a limited time.
        </h1>

        <p className="unveiling-hero__subtitle">
          scroll to enter the procession
        </p>
      </section>

      <div className="scepter-line"></div>

      {/* ============================================================
          THE PROCESSION — Full-Viewport Spotlit Single Objects
          ============================================================ */}
      <div className="procession-track">
        {processionItems.map((product) => (
          <ProductCard key={product.id} product={product} layout="spotlight" />
        ))}
      </div>

      {/* Footer Ceremonial Trigger */}
      <section style={{ padding: '6rem 0', textAlign: 'center', background: 'var(--imperial)' }}>
        <div className="container">
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', letterSpacing: '0.22em', color: 'var(--platinum)', textTransform: 'lowercase', marginBottom: '1.5rem' }}>
            view the complete ceremonial index
          </p>
          <Link to="/browse" className="spotlight-detail__cta" style={{ maxWidth: '280px', margin: '0 auto' }}>
            enter program index →
          </Link>
        </div>
      </section>
    </main>
  );
}
