import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../data/CartContext';
import { useProducts } from '../data/ProductsContext';
import { formatPrice } from '../data/api';
import Spinner from '../components/Spinner';

export default function CartPage() {
  const { items, removeItem, updateQty, getCartTotals, getCount, coupon, applyCoupon, removeCoupon } = useCart();
  const { products, loading, getProduct } = useProducts();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState(false);
  const count = getCount();

  const { subtotal, discountAmount, gstAmount, shipping, grandTotal } = getCartTotals(products);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (!success) {
      setCouponError(true);
    } else {
      setCouponError(false);
      setCouponInput('');
    }
  };

  if (loading) {
    return (
      <main className="pt-32 pb-20 flex justify-center items-center min-h-[60vh]">
        <Spinner />
      </main>
    );
  }

  return (
    <main className="pt-28 pb-section-gap">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">
            DEINE AUSWAHL
          </p>
          <h1 className="font-display-lg-mobile text-3xl md:text-4xl font-medium text-on-surface">
            Warenkorb ({count})
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-surface-container-low rounded-3xl p-8 max-w-xl mx-auto">
            <span className="material-symbols-outlined text-5xl text-outline mb-4">shopping_bag</span>
            <h2 className="font-headline-md text-xl font-medium text-on-surface mb-2">Dein Warenkorb ist leer</h2>
            <p className="text-sm text-on-surface-variant mb-8">
              Entdecke handverlesene Möbel und Accessoires für dein Zuhause.
            </p>
            <Link
              to="/browse"
              className="inline-flex px-8 py-3.5 bg-primary text-on-primary rounded-full font-medium hover:bg-primary-container transition-colors shadow-sm"
            >
              Kollektion entdecken
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Items List (Left 8 Cols) */}
            <div className="lg:col-span-8 flex flex-col divide-y divide-outline-variant/40">
              {items.map((item) => {
                const product = getProduct(item.id);
                if (!product) return null;
                const price = product.sale ? product.salePrice : product.price;

                return (
                  <div key={item.id} className="py-6 flex gap-4 md:gap-6 first:pt-0">
                    <Link
                      to={`/product/${product.id}`}
                      className="w-24 h-28 md:w-32 md:h-36 bg-surface-container rounded-xl overflow-hidden shrink-0"
                    >
                      <img
                        src={product.image || product.images?.[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <span className="text-xs uppercase text-on-surface-variant font-semibold tracking-wider">
                              {product.category}
                            </span>
                            <Link to={`/product/${product.id}`}>
                              <h3 className="font-body-lg text-base md:text-lg font-medium text-on-surface hover:text-primary transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                          </div>
                          <span className="font-price font-medium text-base md:text-lg text-on-surface">
                            {formatPrice(price * item.qty)}
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-1">
                          Einzelpreis: {formatPrice(price)}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        {/* Quantity Stepper */}
                        <div className="inline-flex items-center bg-surface-container rounded-full p-0.5 border border-outline-variant/40">
                          <button
                            onClick={() => updateQty(product.id, item.qty - 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface text-on-surface text-sm"
                            aria-label="Menge reduzieren"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-xs font-semibold">{item.qty}</span>
                          <button
                            onClick={() => updateQty(product.id, item.qty + 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface text-on-surface text-sm"
                            aria-label="Menge erhöhen"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove Item */}
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-xs text-on-surface-variant hover:text-error flex items-center gap-1 transition-colors"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                          <span className="hidden sm:inline">Entfernen</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary (Right 4 Cols) */}
            <div className="lg:col-span-4 bg-surface-container-low p-6 md:p-8 rounded-3xl border border-outline-variant/30 sticky top-28">
              <h2 className="font-headline-sm text-lg font-semibold text-on-surface mb-6 pb-4 border-b border-outline-variant/40">
                Bestellübersicht
              </h2>

              {/* Coupon Form */}
              <div className="mb-6">
                {coupon ? (
                  <div className="p-3 bg-[#e5f2df] rounded-xl flex justify-between items-center text-xs text-primary font-medium">
                    <span>Gutschein aktiv: <strong>{coupon}</strong></span>
                    <button onClick={removeCoupon} className="hover:underline text-error">Entfernen</button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Gutscheincode (z.B. SKANVI15)"
                      value={couponInput}
                      onChange={(e) => { setCouponInput(e.target.value); setCouponError(false); }}
                      className="flex-1 px-4 py-2.5 bg-surface text-on-surface text-xs rounded-full border border-outline-variant/60 outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-primary text-on-primary rounded-full text-xs font-medium hover:bg-primary-container transition-colors"
                    >
                      Einlösen
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-xs text-error mt-1 pl-2">Ungültiger Gutscheincode</p>
                )}
              </div>

              {/* Cost Calculations */}
              <div className="flex flex-col gap-3 text-sm border-b border-outline-variant/40 pb-6 mb-6">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Zwischensumme</span>
                  <span className="text-on-surface font-medium">{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>Rabatt</span>
                    <span className="font-medium">-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-on-surface-variant">
                  <span>Versandkosten</span>
                  <span className="text-on-surface font-medium">
                    {shipping === 0 ? 'Kostenlos' : formatPrice(shipping)}
                  </span>
                </div>

                <div className="flex justify-between text-on-surface-variant text-xs">
                  <span>inkl. 19% MwSt.</span>
                  <span>{formatPrice(gstAmount)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline mb-8">
                <span className="font-headline-sm text-base font-semibold text-on-surface">Gesamtbetrag</span>
                <span className="font-headline-md text-2xl font-bold text-on-surface">
                  {formatPrice(grandTotal)}
                </span>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="w-full py-4 bg-primary text-on-primary text-center rounded-full font-medium hover:bg-primary-container transition-colors shadow-sm block text-sm"
              >
                Zur Kasse gehen
              </Link>

              <div className="mt-4 text-center">
                <Link to="/browse" className="text-xs text-on-surface-variant hover:text-primary underline">
                  Weiter einkaufen
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
