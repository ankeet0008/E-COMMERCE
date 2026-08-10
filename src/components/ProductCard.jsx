import { Link } from 'react-router-dom';
import { useCart } from '../data/CartContext';
import { formatPrice } from '../data/api';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const price = product.sale ? product.salePrice : product.price;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id);
  };

  return (
    <article className="luxury-product-card">
      {product.sale && <span className="luxury-product-card__badge">ATELIER SALE</span>}

      <Link to={`/product/${product.id}`} className="luxury-product-card__img-container">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80';
          }}
        />
        <div className="luxury-product-card__quick-add">
          <button onClick={handleAdd}>+ ADD TO SELECTION</button>
        </div>
      </Link>

      <div className="luxury-product-card__meta">
        <span className="luxury-product-card__brand">{product.brand || product.category}</span>
        <h3 className="luxury-product-card__title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="luxury-product-card__price">
          {product.sale && (
            <span className="luxury-product-card__price--old">{formatPrice(product.price)}</span>
          )}
          <span>{formatPrice(price)}</span>
        </div>
      </div>
    </article>
  );
}
