import { Link } from 'react-router-dom';
import { useCart } from '../data/CartContext';
import { formatPrice } from '../data/api';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const price = product.sale ? product.salePrice : product.price;

  const handleReserve = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id);
  };

  // Generate an authentic Lot number based on ID
  const lotNumber = `LOT NO. ${String(product.id * 17 + 100).padStart(3, '0')}`;
  const provenanceText = product.brand 
    ? `${product.brand} Atelier · Crafted in small numbers`
    : `${product.category} Chamber · Hand-selected piece`;

  return (
    <article className="royal-card">
      {/* Aged Brass Picture Frame Signature Element */}
      <Link to={`/product/${product.id}`} className="royal-frame">
        <div className="royal-frame__inner">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80';
            }}
          />
        </div>
      </Link>

      {/* Museum Placard Caption */}
      <div className="museum-placard">
        <span className="museum-placard__lot">{lotNumber}</span>
        <h3 className="museum-placard__title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <span className="museum-placard__provenance">{provenanceText}</span>
        <div className="museum-placard__footer">
          <span className="museum-placard__price">{formatPrice(price)}</span>
          <button 
            className="museum-placard__action" 
            onClick={handleReserve}
            aria-label={`Reserve ${product.name}`}
          >
            Reserve Piece
          </button>
        </div>
      </div>
    </article>
  );
}
