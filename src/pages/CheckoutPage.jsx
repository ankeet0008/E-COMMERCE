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
    const generatedOrderNum = 'AKD-' + Math.floor(100000 + Math.random() * 900000);
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
            ORDER CONFIRMED
          </p>
          <h1 className="font-display-lg-mobile text-2xl md:text-3xl font-medium text-on-surface mb-3">
            Thank you for shopping with us!
          </h1>
          <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
            Your order <strong>{orderNumber}</strong> has been received by Ankit Ki Dukan. We are preparing your furniture and curated pieces with the utmost care.
          </p>

          <div className="bg-surface-container-low p-6 rounded-2xl text-left text-xs text-on-surface-variant flex flex-col gap-2 mb-8 border border-outline-variant/30">
            <div className="flex justify-between">
              <span>Order Number:</span>
              <span className="font-semibold text-on-surface">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Delivery:</span>
              <span className="font-semibold text-on-surface">3-5 Business Days</span>
            </div>
            <div className="flex justify-between">
              <span>Confirmation sent to:</span>
              <span className="font-semibold text-on-surface">Your provided email</span>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex px-8 py-3.5 bg-primary text-on-primary rounded-full font-medium hover:bg-primary-container transition-colors shadow-sm text-sm"
          >
            Back to Homepage
          </Link>
        </div>
      </main>
    );
  }

  if (count === 0) {
    return (
      <main className="pt-36 pb-32 text-center px-4 max-w-md mx-auto">
        <span className="material-symbols-outlined text-5xl text-outline mb-4">shopping_bag</span>
        <h1 className="font-headline-md text-2xl font-medium text-on-surface mb-2">No items in your bag</h1>
        <p className="text-sm text-on-surface-variant mb-8">
          Please select items from our collection before proceeding to checkout.
        </p>
        <Link
          to="/browse"
          className="inline-flex px-8 py-3 bg-primary text-on-primary rounded-full font-medium hover:bg-primary-container transition-colors text-sm"
        >
          Explore Collection
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
            STEP 2 OF 2
          </p>
          <h1 className="font-display-lg-mobile text-3xl md:text-4xl font-medium text-on-surface">
            Checkout & Shipping
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Customer & Shipping Form (Left 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Contact Information */}
            <div className="bg-surface-container-low p-6 md:p-8 rounded-3xl border border-outline-variant/30">
              <h2 className="font-headline-sm text-lg font-semibold text-on-surface mb-4">
                1. Contact Information
              </h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Email address for order updates *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 bg-surface rounded-xl border border-outline-variant/50 text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-surface-container-low p-6 md:p-8 rounded-3xl border border-outline-variant/30">
              <h2 className="font-headline-sm text-lg font-semibold text-on-surface mb-4">
                2. Delivery Address
              </h2>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex"
                      className="w-full px-4 py-3 bg-surface rounded-xl border border-outline-variant/50 text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Taylor"
                      className="w-full px-4 py-3 bg-surface rounded-xl border border-outline-variant/50 text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Street Address & Apartment *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="742 Evergreen Terrace, Apt 4"
                    className="w-full px-4 py-3 bg-surface rounded-xl border border-outline-variant/50 text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                      Postal Code / PIN *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="10001"
                      className="w-full px-4 py-3 bg-surface rounded-xl border border-outline-variant/50 text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="New York"
                      className="w-full px-4 py-3 bg-surface rounded-xl border border-outline-variant/50 text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-surface-container-low p-6 md:p-8 rounded-3xl border border-outline-variant/30">
              <h2 className="font-headline-sm text-lg font-semibold text-on-surface mb-4">
                3. Payment Method
              </h2>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-outline-variant/50 cursor-pointer hover:border-primary transition-colors">
                  <input type="radio" name="payment" defaultChecked className="text-primary focus:ring-primary" />
                  <span className="font-medium text-sm text-on-surface">Credit / Debit Card (Visa, Mastercard, Amex)</span>
                </label>
                <label className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-outline-variant/50 cursor-pointer hover:border-primary transition-colors">
                  <input type="radio" name="payment" className="text-primary focus:ring-primary" />
                  <span className="font-medium text-sm text-on-surface">PayPal / UPI / Digital Wallets</span>
                </label>
                <label className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-outline-variant/50 cursor-pointer hover:border-primary transition-colors">
                  <input type="radio" name="payment" className="text-primary focus:ring-primary" />
                  <span className="font-medium text-sm text-on-surface">Net Banking & Pay Later</span>
                </label>
              </div>
            </div>
          </div>

          {/* Live Order Summary (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-surface-container-low p-6 md:p-8 rounded-3xl border border-outline-variant/30 sticky top-28">
            <h2 className="font-headline-sm text-lg font-semibold text-on-surface mb-6 pb-4 border-b border-outline-variant/40">
              Your Order ({count})
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
                        <p className="text-xs text-on-surface-variant">Qty: {item.qty}</p>
                      </div>
                    </div>
                    <span className="font-medium text-on-surface">{formatPrice(price * item.qty)}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 text-sm border-b border-outline-variant/40 pb-6 mb-6">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span className="text-on-surface font-medium">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-primary">
                  <span>Discount</span>
                  <span className="font-medium">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-on-surface-variant">
                <span>Shipping</span>
                <span className="text-on-surface font-medium">
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-on-surface-variant text-xs">
                <span>incl. Taxes (GST 18%)</span>
                <span>{formatPrice(gstAmount)}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline mb-8">
              <span className="font-headline-sm text-base font-semibold text-on-surface">Total</span>
              <span className="font-headline-md text-2xl font-bold text-on-surface">
                {formatPrice(grandTotal)}
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary text-on-primary text-center rounded-full font-medium hover:bg-primary-container transition-colors shadow-sm block text-sm cursor-pointer"
            >
              Place Order Now
            </button>

            <p className="text-[11px] text-on-surface-variant/70 text-center mt-4 leading-normal">
              By placing your order, you agree to our Terms & Conditions and Privacy Policy.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
