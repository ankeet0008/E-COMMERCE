import { Link } from 'react-router-dom';
import { useCart } from '../data/CartContext';
import { formatPrice } from '../data/api';

export default function ProductCard({ product, layout = 'spotlight' }) {
  const { addItem } = useCart();
  const price = product.sale ? product.salePrice : product.price;

  const handleSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id);
  };

  // Program list row layout
  if (layout === 'row') {
    return (
      <div className="ceremony-row">
        <span className="ceremony-row__num">0{product.id}</span>
        <h3 className="ceremony-row__title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <span className="ceremony-row__desc">
          {product.brand ? `${product.brand.toLowerCase()} release` : `${product.category.toLowerCase()} series`}
        </span>
        <span className="ceremony-row__price">{formatPrice(price)}</span>
        <button onClick={handleSelect} className="spotlight-section__action" style={{ marginLeft: '1.5rem' }}>
          + select
        </button>
      </div>
    );
  }

  // Full-screen procession spotlight card layout
  return (
    <section className="spotlight-section">
      <div className="spotlight-section__content">
        {product.sale && <span className="garnet-tag">limited release</span>}

        <Link to={`/product/${product.id}`} className="spotlight-section__img-wrap">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80';
            }}
          />
        </Link>

        <div className="spotlight-section__meta">
          <div>
            <span className="spotlight-section__tag">
              {product.brand ? product.brand.toLowerCase() : product.category.toLowerCase()}
            </span>
            <h3 className="spotlight-section__title">
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h3>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div className="spotlight-section__price">{formatPrice(price)}</div>
            <button onClick={handleSelect} className="spotlight-section__action">
              + select piece
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
