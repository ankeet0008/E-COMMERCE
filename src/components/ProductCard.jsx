import { Link } from 'react-router-dom';
import { useCart } from '../data/CartContext';
import { formatPrice } from '../data/api';

function SwingTagHoleSVG() {
  return (
    <svg width="40" height="28" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0 L20 8" stroke="var(--mist)" strokeWidth="1"/>
      <circle cx="20" cy="14" r="5" stroke="var(--mist)" strokeWidth="1" fill="var(--paper-dark)"/>
      <circle cx="20" cy="14" r="2" fill="var(--paper)"/>
      <path d="M15 14 C15 8, 12 4, 8 2" stroke="var(--mist)" strokeWidth="0.75" fill="none" strokeDasharray="2 2"/>
      <path d="M25 14 C25 8, 28 4, 32 2" stroke="var(--mist)" strokeWidth="0.75" fill="none" strokeDasharray="2 2"/>
    </svg>
  );
}

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const price = product.sale ? product.salePrice : product.price;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id);
    // Trigger receipt animation
    const receipt = document.querySelector('.nav__cart-receipt');
    if (receipt) {
      receipt.classList.remove('is-printing');
      void receipt.offsetWidth;
      receipt.classList.add('is-printing');
      setTimeout(() => receipt.classList.remove('is-printing'), 350);
    }
  };

  return (
    <article className="product-card" data-product-id={product.id}>
      <div className="product-card__hole"><SwingTagHoleSVG /></div>
      <span className="product-card__category">{product.category}</span>
      {product.sale && <span className="product-card__sale">Sale</span>}

      <Link to={`/product/${product.id}`} className="product-card__image">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
          }}
        />
      </Link>

      <div className="product-card__body">
        <div className="product-card__sku">{product.sku}</div>
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__price">
          {product.sale && (
            <span className="product-card__price--old">{formatPrice(product.price)}</span>
          )}
          {formatPrice(price)}
        </div>
        <div className="product-card__actions">
          <Link to={`/product/${product.id}`} className="product-card__link">View item</Link>
          <button
            className="product-card__add"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to bag`}
          >
            Add to bag
          </button>
        </div>
      </div>
    </article>
  );
}
