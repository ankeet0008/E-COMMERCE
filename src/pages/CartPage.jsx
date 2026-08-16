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

  if (loading) return <main><Spinner /></main>;

  return (
    <main className="royal-cart-container">
      <div className="container">
        <div className="royal-ledger">
          <div className="royal-ledger__header">
            <h1 className="royal-ledger__title">Ledger of Reserved Pieces</h1>
            <p className="royal-ledger__subtitle">
              {count === 0 ? 'No lots reserved' : `${count} Lot${count !== 1 ? 's' : ''} currently held for acquisition`}
            </p>
          </div>

          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '2rem' }}>
                Your private registry is empty. Explore our galleries to select pieces.
              </p>
              <Link to="/browse" className="royal-hero__cta">
                Browse The Galleries
              </Link>
            </div>
          ) : (
            <div>
              {/* Reserved Item List */}
              <div style={{ marginBottom: '2.5rem' }}>
                {items.map(item => {
                  const product = getProduct(item.id);
                  if (!product) return null;
                  const price = product.sale ? product.salePrice : product.price;

                  return (
                    <div key={item.id} className="royal-ledger__item">
                      <div>
                        <div className="royal-ledger__item-name">{product.name}</div>
                        <button
                          className="royal-ledger__item-remove"
                          onClick={() => removeItem(product.id)}
                        >
                          Release Hold ×
                        </button>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button 
                          onClick={() => updateQty(product.id, item.qty - 1)}
                          style={{ padding: '2px 8px', border: '1px solid var(--parchment)' }}
                        >
                          −
                        </button>
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', fontWeight: 600 }}>{item.qty}</span>
                        <button 
                          onClick={() => updateQty(product.id, item.qty + 1)}
                          style={{ padding: '2px 8px', border: '1px solid var(--parchment)' }}
                        >
                          +
                        </button>
                      </div>

                      <div style={{ textAlignment: 'right', fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600 }}>
                        {formatPrice(price * item.qty)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Coupon Code Section */}
              <div style={{ padding: '1.5rem', background: 'var(--parchment)', marginBottom: '2rem', borderRadius: '2px' }}>
                {coupon ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--smoke)' }}>
                      WARRANT PROMO APPLIED: <strong>{coupon}</strong>
                    </span>
                    <button onClick={removeCoupon} className="royal-ledger__item-remove" style={{ marginTop: 0 }}>Remove</button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '10px' }}>
                    <input 
                      type="text"
                      placeholder="Enter Royal Warrant / Discount Code (e.g. DIS23)"
                      value={couponInput}
                      onChange={e => { setCouponInput(e.target.value); setCouponError(false); }}
                      style={{ flex: 1, padding: '8px 12px', border: '1px solid var(--smoke)', background: '#FFF', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', outline: 'none' }}
                    />
                    <button type="submit" style={{ background: 'var(--emerald-dark)', color: 'var(--ivory)', padding: '8px 18px', fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                      Apply Code
                    </button>
                  </form>
                )}
                {couponError && <div style={{ color: 'var(--burgundy)', fontSize: '0.75rem', marginTop: '6px' }}>Invalid warrant code</div>}
              </div>

              {/* Totals Breakdown */}
              <div style={{ borderTop: '1px solid var(--parchment)', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontFamily: 'var(--font-serif)' }}>
                  <span>Subtotal Valuation</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', color: 'var(--burgundy)', fontFamily: 'var(--font-serif)' }}>
                    <span>Warrant Exemption (Discount)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontFamily: 'var(--font-serif)' }}>
                  <span>Statutory Duty (GST 18%)</span>
                  <span>{formatPrice(gstAmount)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontFamily: 'var(--font-serif)' }}>
                  <span>Royal Carriage Delivery</span>
                  <span>{shipping === 0 ? 'Complimentary (Over ₹2,000)' : formatPrice(shipping)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 0 0', borderTop: '1px solid var(--smoke)', marginTop: '12px', fontFamily: 'var(--font-crest)', fontSize: '1.4rem', fontWeight: 600 }}>
                  <span>Total Acquisition Valuation</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <div style={{ marginTop: '2.5rem' }}>
                <Link to="/checkout" className="royal-lot-cta" style={{ display: 'block', textAlign: 'center' }}>
                  Proceed To Private Checkout & Dispatch
                </Link>
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <Link to="/browse" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--smoke)', opacity: 0.7 }}>
                    ← Continue Examining Galleries
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
