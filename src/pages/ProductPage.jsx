import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../data/ProductsContext';
import { useCart } from '../data/CartContext';
import { formatPrice } from '../data/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

export default function ProductPage() {
  const { id } = useParams();
  const { getProduct, getProductsByCategory, loading } = useProducts();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  if (loading) {
    return (
      <main className="pt-32 pb-20 flex justify-center items-center min-h-[60vh]">
        <Spinner />
      </main>
    );
  }

  const product = getProduct(id);

  if (!product) {
    return (
      <main className="pt-36 pb-24 text-center px-4 max-w-lg mx-auto">
        <h1 className="font-headline-md text-2xl mb-3 font-medium">Produkt nicht gefunden</h1>
        <p className="text-on-surface-variant mb-6">Dieses Produkt ist nicht mehr im aktuellen Katalog verfügbar.</p>
        <Link 
          to="/browse"
          className="inline-flex px-8 py-3 bg-primary text-on-primary rounded-full font-medium hover:bg-primary-container transition-colors"
        >
          Zurück zur Kollektion
        </Link>
      </main>
    );
  }

  const price = product.sale ? product.salePrice : product.price;
  const isOutOfStock = product.stock === 0 || product.status === 'Ausverkauft';
  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const related = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product.id, qty);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  return (
    <main className="pt-28 pb-section-gap">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Breadcrumb */}
        <div className="text-label-caps text-on-surface-variant flex items-center gap-2 text-xs font-semibold tracking-wider uppercase mb-8">
          <Link to="/" className="hover:text-primary transition-colors">HOME</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <Link to="/browse" className="hover:text-primary transition-colors">SHOP ALL</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <Link to={`/browse?category=${encodeURIComponent(product.category)}`} className="hover:text-primary transition-colors">
            {product.category.toUpperCase()}
          </Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-on-surface truncate">{product.name}</span>
        </div>

        {/* Product Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20">
          {/* Images Gallery (Left) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative w-full aspect-[4/5] bg-surface-container rounded-2xl overflow-hidden shadow-xs">
              <img
                src={galleryImages[activeImageIdx] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-surface/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
                <span className={isOutOfStock ? 'text-status-oos' : 'text-status-available'}>
                  {isOutOfStock ? 'Ausverkauft' : 'Lieferbar'}
                </span>
              </div>
            </div>

            {/* Thumbnail selector if multiple images */}
            {galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden bg-surface-container border-2 transition-all shrink-0 ${
                      activeImageIdx === idx ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info & Actions (Right) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-2 tracking-wider">
              {product.category}
            </p>
            <h1 className="font-display-lg-mobile text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-on-surface mb-3">
              {product.name}
            </h1>
            
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-headline-md text-2xl md:text-3xl font-medium text-on-surface">
                {product.category === 'Sofas' ? 'Ab ' : ''}{formatPrice(price)}
              </span>
              {product.sale && (
                <span className="text-sm text-on-surface-variant line-through">
                  {formatPrice(product.price)}
                </span>
              )}
              <span className="text-xs text-on-surface-variant/80">inkl. MwSt.</span>
            </div>

            <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Product Specifications Table */}
            <div className="border-t border-b border-outline-variant/40 py-4 mb-8 flex flex-col gap-2 text-sm">
              <div className="flex justify-between py-1">
                <span className="text-on-surface-variant">Artikelnummer</span>
                <span className="font-medium text-on-surface">{product.sku}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-on-surface-variant">Maße</span>
                <span className="font-medium text-on-surface">{product.dimensions || '—'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-on-surface-variant">Gewicht</span>
                <span className="font-medium text-on-surface">{product.weight || '—'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-on-surface-variant">Verfügbarkeit</span>
                <span className={`font-medium ${isOutOfStock ? 'text-status-oos' : 'text-status-available'}`}>
                  {isOutOfStock ? 'Momentan vergriffen' : 'Auf Lager (Lieferzeit 3-5 Werktage)'}
                </span>
              </div>
            </div>

            {/* Quantity Stepper & Add to Bag Button */}
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex items-center bg-surface-container rounded-full p-1 border border-outline-variant/40">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface text-on-surface font-medium"
                  aria-label="Menge verringern"
                >
                  −
                </button>
                <span className="w-10 text-center font-medium text-sm">{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface text-on-surface font-medium"
                  aria-label="Menge erhöhen"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 py-4 px-6 rounded-full font-medium flex items-center justify-center gap-2 transition-all ${
                  isOutOfStock
                    ? 'bg-surface-dim text-on-surface-variant cursor-not-allowed'
                    : 'bg-primary text-on-primary hover:bg-primary-container shadow-sm'
                }`}
              >
                <span className="material-symbols-outlined text-xl">shopping_bag</span>
                <span>{isOutOfStock ? 'Ausverkauft' : `In den Warenkorb — ${formatPrice(price * qty)}`}</span>
              </button>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                aria-label="Wunschliste"
                className="w-12 h-12 rounded-full border border-outline-variant/50 flex items-center justify-center hover:bg-surface-container transition-colors"
              >
                <span className={`material-symbols-outlined text-xl ${isWishlisted ? 'fill text-[#93000a]' : 'text-on-surface'}`}>
                  {isWishlisted ? 'favorite' : 'favorite_border'}
                </span>
              </button>
            </div>

            {/* Added Toast Notification */}
            {addedToast && (
              <div className="p-3 bg-[#e5f2df] text-primary rounded-xl text-sm font-medium flex items-center gap-2 mb-6 animate-fade-in">
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>Artikel wurde zum Warenkorb hinzugefügt!</span>
                <Link to="/cart" className="underline font-bold ml-auto">Zum Warenkorb →</Link>
              </div>
            )}

            {/* Quick Guarantees */}
            <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-2 text-xs text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">local_shipping</span>
                <span>Kostenloser Standardversand ab 200 €</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">published_with_changes</span>
                <span>30 Tage unkomplizierte Rückgabe</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">shield_check</span>
                <span>Sicher verschlüsselte Zahlung</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {related.length > 0 && (
          <div className="pt-16 border-t border-outline-variant/30">
            <div className="mb-8">
              <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">
                DAS KÖNNTE DIR AUCH GEFALLEN
              </p>
              <h2 className="font-headline-md text-2xl font-medium text-on-surface">
                Passende Lieblingsstücke
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
