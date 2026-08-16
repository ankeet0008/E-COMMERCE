import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../data/CartContext';
import { useProducts } from '../data/ProductsContext';
import { formatPrice } from '../data/api';
import Spinner from '../components/Spinner';

export default function CheckoutPage() {
  const { items, getCartTotals, getCount, clearCart } = useCart();
  const { products, loading, getProduct } = useProducts();
  const [confirmed, setConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const count = getCount();

  const { subtotal, discountAmount, gstAmount, shipping, grandTotal } = getCartTotals(products);

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedOrderNum = 'SKV-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(generatedOrderNum);
    clearCart();
    setConfirmed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <main className="pt-32 pb-20 flex justify-center items-center min-h-[60vh]">
        <Spinner />
      </main>
    );
  }

  if (confirmed) {
    return (
      <main className="pt-36 pb-32">
        <div className="px-margin-mobile md:px-margin-desktop max-w-lg mx-auto text-center">
          <div className="w-16 h-16 bg-[#e5f2df] text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-3xl">check</span>
          </div>

          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">
            BESTELLUNG ERFOLGREICH
          </p>
          <h1 className="font-display-lg-mobile text-2xl md:text-3xl font-medium text-on-surface mb-3">
            Vielen Dank für dein Vertrauen!
          </h1>
          <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
            Deine Bestellung mit der Nummer <strong>{orderNumber}</strong> wurde aufgenommen. Wir bereiten deine Möbel und Wohnstücke mit größter Sorgfalt für den Versand vor.
          </p>

          <div className="bg-surface-container-low p-6 rounded-2xl text-left text-xs text-on-surface-variant flex flex-col gap-2 mb-8 border border-outline-variant/30">
            <div className="flex justify-between">
              <span>Bestellnummer:</span>
              <span className="font-semibold text-on-surface">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Voraussichtliche Lieferung:</span>
              <span className="font-semibold text-on-surface">3-5 Werktage</span>
            </div>
            <div className="flex justify-between">
              <span>Bestätigung versendet an:</span>
              <span className="font-semibold text-on-surface">Deine angegebene E-Mail</span>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex px-8 py-3.5 bg-primary text-on-primary rounded-full font-medium hover:bg-primary-container transition-colors shadow-sm text-sm"
          >
            Zurück zur Startseite
          </Link>
        </div>
      </main>
    );
  }

  if (count === 0) {
    return (
      <main className="pt-36 pb-32 text-center px-4 max-w-md mx-auto">
        <span className="material-symbols-outlined text-5xl text-outline mb-4">shopping_bag</span>
        <h1 className="font-headline-md text-2xl font-medium text-on-surface mb-2">Keine Artikel im Warenkorb</h1>
        <p className="text-sm text-on-surface-variant mb-8">
          Bitte wähle vor dem Checkout Produkte aus unserer Kollektion aus.
        </p>
        <Link
          to="/browse"
          className="inline-flex px-8 py-3 bg-primary text-on-primary rounded-full font-medium hover:bg-primary-container transition-colors text-sm"
        >
          Kollektion entdecken
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-section-gap">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">
            SCHRITT 2 VON 2
          </p>
          <h1 className="font-display-lg-mobile text-3xl md:text-4xl font-medium text-on-surface">
            Kasse & Versand
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Customer & Shipping Form (Left 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Contact Information */}
            <div className="bg-surface-container-low p-6 md:p-8 rounded-3xl border border-outline-variant/30">
              <h2 className="font-headline-sm text-lg font-semibold text-on-surface mb-4">
                1. Kontaktdaten
              </h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    E-Mail-Adresse für Bestellbestätigung *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@beispiel.de"
                    className="w-full px-4 py-3 bg-surface rounded-xl border border-outline-variant/50 text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-surface-container-low p-6 md:p-8 rounded-3xl border border-outline-variant/30">
              <h2 className="font-headline-sm text-lg font-semibold text-on-surface mb-4">
                2. Lieferadresse
              </h2>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                      Vorname *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Anna"
                      className="w-full px-4 py-3 bg-surface rounded-xl border border-outline-variant/50 text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                      Nachname *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Müller"
                      className="w-full px-4 py-3 bg-surface rounded-xl border border-outline-variant/50 text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Straße & Hausnummer *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Lindenallee 14"
                    className="w-full px-4 py-3 bg-surface rounded-xl border border-outline-variant/50 text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                      Postleitzahl *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="10115"
                      className="w-full px-4 py-3 bg-surface rounded-xl border border-outline-variant/50 text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                      Stadt *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Berlin"
                      className="w-full px-4 py-3 bg-surface rounded-xl border border-outline-variant/50 text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-surface-container-low p-6 md:p-8 rounded-3xl border border-outline-variant/30">
              <h2 className="font-headline-sm text-lg font-semibold text-on-surface mb-4">
                3. Zahlungsart
              </h2>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-outline-variant/50 cursor-pointer hover:border-primary transition-colors">
                  <input type="radio" name="payment" defaultChecked className="text-primary focus:ring-primary" />
                  <span className="font-medium text-sm text-on-surface">Kreditkarte (Visa, Mastercard, Amex)</span>
                </label>
                <label className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-outline-variant/50 cursor-pointer hover:border-primary transition-colors">
                  <input type="radio" name="payment" className="text-primary focus:ring-primary" />
                  <span className="font-medium text-sm text-on-surface">PayPal / Express Checkout</span>
                </label>
                <label className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-outline-variant/50 cursor-pointer hover:border-primary transition-colors">
                  <input type="radio" name="payment" className="text-primary focus:ring-primary" />
                  <span className="font-medium text-sm text-on-surface">Klarna (Rechnung & Ratenkauf)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Live Order Summary (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-surface-container-low p-6 md:p-8 rounded-3xl border border-outline-variant/30 sticky top-28">
            <h2 className="font-headline-sm text-lg font-semibold text-on-surface mb-6 pb-4 border-b border-outline-variant/40">
              Deine Bestellung ({count})
            </h2>

            <div className="flex flex-col gap-4 max-h-72 overflow-y-auto hide-scrollbar pr-1 mb-6 border-b border-outline-variant/40 pb-6">
              {items.map((item) => {
                const product = getProduct(item.id);
                if (!product) return null;
                const price = product.sale ? product.salePrice : product.price;

                return (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-on-surface line-clamp-1">{product.name}</p>
                        <p className="text-xs text-on-surface-variant">Menge: {item.qty}</p>
                      </div>
                    </div>
                    <span className="font-medium text-on-surface">{formatPrice(price * item.qty)}</span>
                  </div>
                );
              })}
            </div>

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
                <span>Versand</span>
                <span className="text-on-surface font-medium">
                  {shipping === 0 ? 'Kostenlos' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-on-surface-variant text-xs">
                <span>inkl. 19% MwSt.</span>
                <span>{formatPrice(gstAmount)}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline mb-8">
              <span className="font-headline-sm text-base font-semibold text-on-surface">Gesamtbetrag</span>
              <span className="font-headline-md text-2xl font-bold text-on-surface">
                {formatPrice(grandTotal)}
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary text-on-primary text-center rounded-full font-medium hover:bg-primary-container transition-colors shadow-sm block text-sm cursor-pointer"
            >
              Jetzt zahlungspflichtig bestellen
            </button>

            <p className="text-[11px] text-on-surface-variant/70 text-center mt-4 leading-normal">
              Mit deiner Bestellung erklärst du dich mit unseren AGB und den Datenschutzbestimmungen einverstanden.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
