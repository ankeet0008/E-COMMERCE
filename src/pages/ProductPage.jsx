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
    <main>
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--charcoal)', opacity: 0.6 }}>
          Could not load product — {error}
        </p>
      </div>
    </main>
  );

  const product = getProduct(id);

  if (!product) {
    return (
      <main>
        <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--charcoal)', opacity: 0.6 }}>
            This item could not be found. It may have been removed from our inventory.
          </p>
          <Link to="/" className="btn btn--primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
            Back to directory
          </Link>
        </div>
      </main>
    );
  }

  const price = product.sale ? product.salePrice : product.price;
  const relatedProducts = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addItem(product.id, qty);
    const receipt = document.querySelector('.nav__cart-receipt');
    if (receipt) {
      receipt.classList.remove('is-printing');
      void receipt.offsetWidth;
      receipt.classList.add('is-printing');
      setTimeout(() => receipt.classList.remove('is-printing'), 350);
    }
  };

  return (
    <main>
      <div className="product-detail">
        <div className="container">
          <div className="product-detail__layout">
            {/* Image */}
            <div className="product-detail__image">
              <img src={product.image} alt={product.name} />
            </div>

            {/* Info */}
            <div className="product-detail__info">
              <div className="product-detail__breadcrumb">
                <Link to="/">Directory</Link>
                <span>/</span>
                <Link to={`/browse?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
                <span>/</span>
                <span>{product.name}</span>
              </div>

              {product.sale && (
                <span className="product-card__sale" style={{ position: 'static', display: 'inline-block', marginBottom: 12 }}>
                  Sale
                </span>
              )}

              <h1 className="product-detail__name">{product.name}</h1>
              <div className="product-detail__price">
                {product.sale && (
                  <span style={{ textDecoration: 'line-through', opacity: 0.4, marginRight: 12, fontSize: '1rem' }}>
                    {formatPrice(product.price)}
                  </span>
                )}
                {formatPrice(price)}
              </div>

              <p className="product-detail__desc">{product.description}</p>

              {/* Spec sheet */}
              <div className="spec-sheet">
                <div className="spec-sheet__row">
                  <span className="spec-sheet__label">SKU</span>
                  <span className="spec-sheet__value">{product.sku}</span>
                </div>
                {product.brand && (
                  <div className="spec-sheet__row">
                    <span className="spec-sheet__label">Brand</span>
                    <span className="spec-sheet__value">{product.brand}</span>
                  </div>
                )}
                <div className="spec-sheet__row">
                  <span className="spec-sheet__label">Dimensions</span>
                  <span className="spec-sheet__value">{product.dimensions}</span>
                </div>
                <div className="spec-sheet__row">
                  <span className="spec-sheet__label">Weight</span>
                  <span className="spec-sheet__value">{product.weight}</span>
                </div>
                <div className="spec-sheet__row">
                  <span className="spec-sheet__label">In Stock</span>
                  <span className="spec-sheet__value spec-sheet__value--stock">{product.stock}</span>
                </div>
                {product.rating && (
                  <div className="spec-sheet__row">
                    <span className="spec-sheet__label">Rating</span>
                    <span className="spec-sheet__value">{product.rating.toFixed(1)} / 5</span>
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div className="qty-selector">
                <button className="qty-selector__btn" onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
                <span className="qty-selector__value">{qty}</span>
                <button className="qty-selector__btn" onClick={() => setQty(q => q + 1)} aria-label="Increase quantity">+</button>
              </div>

              <br />
              <button className="btn btn--primary" onClick={handleAdd}>
                Add to bag — {formatPrice(price * qty)}
              </button>
            </div>
          </div>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <div className="category-rail" style={{ paddingTop: 'var(--space-3xl)', marginTop: 'var(--space-xl)' }}>
              <div className="section-header">
                <h2 className="section-header__title">More in {product.category}</h2>
                <Link to={`/browse?category=${encodeURIComponent(product.category)}`} className="section-header__link">
                  View all →
                </Link>
              </div>
              <div className="category-rail__scroll">
                {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
