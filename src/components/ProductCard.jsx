import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../data/CartContext';
import { formatPrice } from '../data/api';

export default function ProductCard({ product, showAction = false, className = '' }) {
  const { addItem } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const isOutOfStock = product.stock === 0 || product.status === 'Ausverkauft';
  const price = product.sale ? product.salePrice : product.price;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addItem(product.id, 1);
    }
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(prev => !prev);
  };

  return (
    <div className={`group flex flex-col gap-3 relative ${className}`}>
      {/* Product Image Box */}
      <Link 
        to={`/product/${product.id}`}
        className="relative w-full aspect-[4/5] bg-surface-container rounded-lg overflow-hidden block"
      >
        <img
          src={product.image || product.images?.[0]}
          alt={product.name}
          loading="lazy"
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Stock Status Badge */}
        <div className="absolute top-2.5 left-2.5 bg-surface/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] uppercase font-semibold tracking-wider">
          <span className={isOutOfStock ? 'text-status-oos' : 'text-status-available'}>
            {isOutOfStock ? 'Ausverkauft' : 'Lieferbar'}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          aria-label={isWishlisted ? "Aus Wunschliste entfernen" : "Zur Wunschliste hinzufügen"}
          className="absolute top-2.5 right-2.5 w-8 h-8 bg-surface/75 backdrop-blur-md rounded-full flex items-center justify-center text-on-surface hover:text-primary transition-colors hover:bg-surface"
        >
          <span className={`material-symbols-outlined text-[18px] ${isWishlisted ? 'fill text-[#93000a]' : ''}`}>
            {isWishlisted ? 'favorite' : 'favorite_border'}
          </span>
        </button>
      </Link>

      {/* Product Details */}
      <div className="flex flex-col flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-body-md text-body-md text-on-surface mb-1 group-hover:text-primary transition-colors font-medium">
            {product.name}
          </h3>
        </Link>
        <p className="font-price text-price text-on-surface-variant font-medium">
          {product.category === 'Sofas' ? 'Ab ' : ''}{formatPrice(price)}
        </p>

        {showAction && (
          <div className="mt-3 flex gap-2">
            <Link
              to={`/product/${product.id}`}
              className="w-full py-2.5 border border-outline-variant text-center rounded-full text-sm font-medium text-on-surface hover:bg-surface-container hover:border-outline transition-colors"
            >
              Details ansehen
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
