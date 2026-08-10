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
    <main style={{ padding: '8rem 0', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--platinum)' }}>
        release not found — {error}
      </p>
    </main>
  );

  const product = getProduct(id);

  if (!product) {
    return (
      <main style={{ padding: '8rem 0', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--platinum)', marginBottom: '2rem' }}>
          this piece is no longer in the active procession.
        </p>
        <Link to="/browse" className="spotlight-detail__cta" style={{ maxWidth: '240px', margin: '0 auto' }}>
          return to index
        </Link>
      </main>
    );
  }

  const price = product.sale ? product.salePrice : product.price;
  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 3);

  const handleAcquire = () => {
    addItem(product.id, qty);
  };

  return (
    <main className="spotlight-detail">
      <div className="container">
        <div className="spotlight-detail__layout">
          {/* Spotlit Image */}
          <div className="spotlight-detail__img-container">
            <img src={product.image} alt={product.name} />
          </div>

          {/* Sparse Declarative Copy */}
          <div className="spotlight-detail__info">
            <span className="spotlight-detail__subtitle">
              release 0{product.id} · {product.category.toLowerCase()}
            </span>
            
            <h1 className="spotlight-detail__title">{product.name}</h1>
            
            <div className="spotlight-detail__price">{formatPrice(price)}</div>

            {/* Short Spaced Declarative Sentences */}
            <div className="spotlight-detail__body-text">
              <p style={{ marginBottom: '1.25rem' }}>
                One release. {product.stock || 40} pieces crafted.
              </p>
              <p style={{ marginBottom: '1.25rem' }}>
                {product.description}
              </p>
              {product.brand && (
                <p style={{ marginBottom: '1.25rem' }}>
                  Presented by {product.brand}.
                </p>
              )}
              <p>
                Dimensions: {product.dimensions}. Weight: {product.weight}.
              </p>
            </div>

            {/* Quantity & CTA */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '2.5rem' }}>
              <div style={{ display: 'inline-flex', border: '1px solid var(--platinum-border)', background: 'var(--midnight)' }}>
                <button 
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{ padding: '10px 16px', color: 'var(--porcelain)', fontFamily: 'var(--font-sans)' }}
                >
                  −
                </button>
                <span style={{ padding: '10px 16px', color: 'var(--porcelain)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>{qty}</span>
                <button 
                  onClick={() => setQty(q => q + 1)}
                  style={{ padding: '10px 16px', color: 'var(--porcelain)', fontFamily: 'var(--font-sans)' }}
                >
                  +
                </button>
              </div>

              <button className="spotlight-detail__cta" onClick={handleAcquire} style={{ flex: 1 }}>
                select piece — {formatPrice(price * qty)}
              </button>
            </div>
          </div>
        </div>

        {/* Next Unveilings */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '7rem', paddingTop: '4rem', borderTop: '1px solid var(--platinum-border)' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.22em', color: 'var(--platinum)', textTransform: 'lowercase', textAlign: 'center', marginBottom: '2.5rem' }}>
              subsequent unveilings in {product.category.toLowerCase()}
            </p>
            <div>
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} layout="row" />)}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
