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
  const count = getCount();
  
  const { subtotal, discountAmount, gstAmount, shipping, grandTotal } = getCartTotals(products);

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    setConfirmed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <main><Spinner /></main>;

  if (confirmed) {
    return (
      <main>
        <div className="container">
          <div className="confirmation">
            <div className="confirmation__icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="confirmation__title">Order placed</h2>
            <p className="confirmation__text">
              Your order has been received. We will pack it carefully and ship it your way shortly.
            </p>
            <Link to="/" className="btn btn--primary">Back to the directory</Link>
          </div>
        </div>
      </main>
    );
  }

  if (count === 0) {
    return (
      <main>
        <div className="container" style={{ textAlign: 'center', padding: 'var(--space-4xl) 0' }}>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--charcoal)', opacity: 0.6, marginBottom: 'var(--space-xl)' }}>
            Your bag is empty — add some items before checking out.
          </p>
          <Link to="/" className="btn btn--primary">Browse the directory</Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container">
        <div className="page-heading">
          <h1 className="page-heading__title">Check out</h1>
          <p className="page-heading__sub">Secure checkout</p>
        </div>

        <form className="checkout__layout" onSubmit={handleSubmit}>
          <div>
            <div className="checkout__form-section">
              <h2 className="checkout__section-title">Contact</h2>
              <div className="form-grid">
                <div className="form-group form-group--full">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input className="form-input" type="email" id="email" placeholder="your@email.com" required />
                </div>
              </div>
            </div>

            <div className="checkout__form-section">
              <h2 className="checkout__section-title">Shipping address</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="first-name">First name</label>
                  <input className="form-input" type="text" id="first-name" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="last-name">Last name</label>
                  <input className="form-input" type="text" id="last-name" required />
                </div>
                <div className="form-group form-group--full">
                  <label className="form-label" htmlFor="address">Address</label>
                  <input className="form-input" type="text" id="address" placeholder="Street address" required />
                </div>
                <div className="form-group form-group--full">
                  <label className="form-label" htmlFor="address-2">Apartment, suite, etc.</label>
                  <input className="form-input" type="text" id="address-2" placeholder="Optional" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="city">City</label>
                  <input className="form-input" type="text" id="city" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="state">State</label>
                  <input className="form-input" type="text" id="state" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="zip">ZIP code</label>
                  <input className="form-input" type="text" id="zip" placeholder="00000" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone</label>
                  <input className="form-input" type="tel" id="phone" placeholder="+1" />
                </div>
              </div>
            </div>

            <div className="checkout__form-section">
              <h2 className="checkout__section-title">Payment</h2>
              <div className="form-grid">
                <div className="form-group form-group--full">
                  <label className="form-label" htmlFor="card-number">Card number</label>
                  <input className="form-input" type="text" id="card-number" placeholder="1234 5678 9012 3456" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="expiry">Expiry</label>
                  <input className="form-input" type="text" id="expiry" placeholder="MM / YY" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="cvv">CVV</label>
                  <input className="form-input" type="text" id="cvv" placeholder="123" required />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn--primary btn--full">Place order</button>
            <div style={{ textAlign: 'center', marginTop: 'var(--space-md)' }}>
              <Link to="/cart" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--charcoal)', opacity: 0.6 }}>
                Return to bag
              </Link>
            </div>
          </div>

          <div className="order-summary">
            <h2 className="order-summary__title">Order summary</h2>
            {items.map(item => {
              const product = getProduct(item.id);
              if (!product) return null;
              const price = product.sale ? product.salePrice : product.price;
              return (
                <div key={item.id} className="order-summary__item">
                  <span>{product.name} × {item.qty}</span>
                  <span>{formatPrice(price * item.qty)}</span>
                </div>
              );
            })}
            <div style={{ marginTop: 'var(--space-md)', paddingTop: 'var(--space-sm)', borderTop: '1px solid var(--mist)' }}>
              <div className="order-summary__item">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="order-summary__item" style={{ color: 'var(--rust-red)' }}>
                  <span>Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="order-summary__item">
                <span>GST (18%)</span>
                <span>{formatPrice(gstAmount)}</span>
              </div>
              <div className="order-summary__item">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
            </div>
            <div className="order-summary__total">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
