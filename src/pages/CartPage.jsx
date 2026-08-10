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

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

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

  if (loading) return <main><Spinner /></main>;

  return (
    <main>
      <div className="container">
        <div className="page-heading">
          <h1 className="page-heading__title">Your bag</h1>
          <p className="page-heading__sub">
            {count === 0 ? 'No items' : `${count} item${count !== 1 ? 's' : ''}`}
          </p>
        </div>

        <div style={{ paddingBottom: 'var(--space-4xl)' }}>
          {items.length === 0 ? (
            <div className="receipt">
              <div className="receipt__empty">
                <p className="receipt__empty-text">
                  Nothing here yet — browse the directory to find something.
                </p>
                <Link to="/" className="btn btn--primary">Browse the directory</Link>
              </div>
              <div className="receipt__torn-edge" />
            </div>
          ) : (
            <div className="receipt">
              <div className="receipt__header">
                <div className="receipt__store-name">The General Store</div>
                <div className="receipt__date">{dateStr} · {timeStr}</div>
              </div>

              <div className="receipt__items">
                {items.map(item => {
                  const product = getProduct(item.id);
                  if (!product) return null;
                  const price = product.sale ? product.salePrice : product.price;

                  return (
                    <div key={item.id} className="receipt__item">
                      <div>
                        <span className="receipt__item-name">{product.name}</span>
                        <button
                          className="receipt__item-remove"
                          onClick={() => removeItem(product.id)}
                        >
                          remove
                        </button>
                      </div>
                      <div className="receipt__item-qty">
                        <button
                          className="receipt__item-qty-btn"
                          onClick={() => updateQty(product.id, item.qty - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="receipt__item-qty-value">{item.qty}</span>
                        <button
                          className="receipt__item-qty-btn"
                          onClick={() => updateQty(product.id, item.qty + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="receipt__item-price">{formatPrice(price * item.qty)}</span>
                    </div>
                  );
                })}
              </div>

              <div className="receipt__totals">
                <div style={{ paddingBottom: 'var(--space-md)', marginBottom: 'var(--space-md)', borderBottom: '1px dotted var(--mist)' }}>
                  {coupon ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
                        Coupon applied: <strong>{coupon}</strong>
                      </div>
                      <button className="receipt__item-remove" onClick={removeCoupon} style={{ marginLeft: 0 }}>Remove</button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="text" 
                        value={couponInput}
                        onChange={e => { setCouponInput(e.target.value); setCouponError(false); }}
                        placeholder="Discount code" 
                        className="form-input" 
                        style={{ flex: 1, padding: '6px 10px', fontSize: '0.8125rem' }} 
                      />
                      <button type="submit" className="btn btn--primary" style={{ padding: '6px 14px' }}>Apply</button>
                    </form>
                  )}
                  {couponError && <div style={{ color: 'var(--rust-red)', fontSize: '0.75rem', marginTop: '4px' }}>Invalid coupon code</div>}
                </div>

                <div className="receipt__total-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="receipt__total-row" style={{ color: 'var(--rust-red)' }}>
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="receipt__total-row">
                  <span>GST (18%)</span>
                  <span>{formatPrice(gstAmount)}</span>
                </div>
                <div className="receipt__total-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="receipt__total-row receipt__total-row--grand">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <div className="receipt__actions">
                <Link to="/checkout" className="btn btn--primary btn--full">Check out</Link>
                <Link to="/" className="receipt__continue">Continue browsing</Link>
              </div>
              <div className="receipt__torn-edge" />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
