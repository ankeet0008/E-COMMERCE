import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../data/ProductsContext';
import { useCart } from '../data/CartContext';
import { formatPrice } from '../data/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

export default function ProductPage() {
  const { id } = useParams();
  const { getProduct, getProductsByCategory, loading, error } = useProducts();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  if (loading) return <main><Spinner /></main>;
  if (error) return (
    <main style={{ padding: '6rem 0', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--ivory)' }}>
        Could not retrieve cataloged lot — {error}
      </p>
    </main>
  );

  const product = getProduct(id);

  if (!product) {
    return (
      <main style={{ padding: '6rem 0', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--ivory)' }}>
          This lot is no longer registered in the active collection.
        </p>
        <Link to="/browse" className="royal-hero__cta" style={{ marginTop: '2rem' }}>
          Return to Galleries
        </Link>
      </main>
    );
  }

  const price = product.sale ? product.salePrice : product.price;
  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const handleAcquire = () => {
    addItem(product.id, qty);
  };

  const lotNumber = `LOT NO. ${String(product.id * 17 + 100).padStart(3, '0')}`;

  return (
    <main className="royal-lot-page">
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', letterSpacing: '0.2em', color: 'var(--brass)', textTransform: 'uppercase', marginBottom: '2rem' }}>
          <Link to="/">The Emporium</Link> / <Link to={`/browse?category=${encodeURIComponent(product.category)}`}>{product.category}</Link> / <span>{lotNumber}</span>
        </div>

        <div className="royal-lot-layout">
          {/* Framed Image */}
          <div>
            <div className="royal-frame" style={{ height: '480px' }}>
              <div className="royal-frame__inner" style={{ height: '100%' }}>
                <img src={product.image} alt={product.name} />
              </div>
            </div>
          </div>

          {/* Auction Lot Description */}
          <div className="royal-lot-info">
            <div className="royal-lot-header">
              <span className="royal-lot-number">{lotNumber} · {product.category.toUpperCase()}</span>
              <h1 className="royal-lot-title">{product.name}</h1>
              <div className="royal-lot-price">
                {product.sale && (
                  <span style={{ textDecoration: 'line-through', opacity: 0.4, marginRight: '12px', fontSize: '1.2rem' }}>
                    {formatPrice(product.price)}
                  </span>
                )}
                {formatPrice(price)}
              </div>
            </div>

            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--smoke)', opacity: 0.9 }}>
              {product.description}
            </p>

            <div className="royal-lot-specs">
              <div className="royal-lot-spec-row">
                <label>SKU Registry</label>
                <span>{product.sku}</span>
              </div>
              {product.brand && (
                <div className="royal-lot-spec-row">
                  <label>Atelier Origin</label>
                  <span>{product.brand}</span>
                </div>
              )}
              <div className="royal-lot-spec-row">
                <label>Dimensions</label>
                <span>{product.dimensions}</span>
              </div>
              <div className="royal-lot-spec-row">
                <label>Weight</label>
                <span>{product.weight}</span>
              </div>
              <div className="royal-lot-spec-row">
                <label>Inventory Status</label>
                <span>{product.stock} Pieces Available</span>
              </div>
            </div>

            {/* Quantity Selector & Acquire CTA */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '2rem' }}>
              <div style={{ display: 'inline-flex', border: '1px solid var(--parchment)', background: 'var(--ivory)' }}>
                <button 
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{ padding: '10px 16px', color: 'var(--smoke)', fontFamily: 'var(--font-sans)' }}
                >
                  −
                </button>
                <span style={{ padding: '10px 16px', color: 'var(--smoke)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>{qty}</span>
                <button 
                  onClick={() => setQty(q => q + 1)}
                  style={{ padding: '10px 16px', color: 'var(--smoke)', fontFamily: 'var(--font-sans)' }}
                >
                  +
                </button>
              </div>

              <button className="royal-lot-cta" onClick={handleAcquire} style={{ flex: 1 }}>
                Reserve For Collection — {formatPrice(price * qty)}
              </button>
            </div>
          </div>
        </div>

        {/* Related Lots */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '6rem', paddingTop: '4rem', borderTop: '1px solid rgba(168,130,60,0.3)' }}>
            <div className="royal-section-header">
              <span className="royal-section-header__tag">COMPLEMENTARY LOTS</span>
              <h2 className="royal-section-header__title">Also In {product.category}</h2>
            </div>
            <div className="royal-gallery-grid">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
