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
    <main className="selections-cart">
      <div className="container">
        <div className="selections-cart__header">
          <h1 className="selections-cart__title">Your Selections</h1>
          <p className="selections-cart__subtitle">
            {count === 0 ? 'no pieces selected' : `${count} piece${count !== 1 ? 's' : ''} currently held`}
          </p>
        </div>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--platinum)', opacity: 0.8, marginBottom: '2rem' }}>
              no pieces currently selected from the procession.
            </p>
            <Link to="/browse" className="spotlight-detail__cta" style={{ maxWidth: '240px', margin: '0 auto' }}>
              browse procession
            </Link>
          </div>
        ) : (
          <div>
            {/* List */}
            <div style={{ marginBottom: '3rem' }}>
              {items.map(item => {
                const product = getProduct(item.id);
                if (!product) return null;
                const price = product.sale ? product.salePrice : product.price;

                return (
                  <div key={item.id} className="selections-row">
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--porcelain)' }}>
                        {product.name}
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', letterSpacing: '0.15em', color: 'var(--garnet)', textTransform: 'lowercase', marginTop: '4px', cursor: 'pointer' }}
                      >
                        remove piece ×
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button 
                        onClick={() => updateQty(product.id, item.qty - 1)}
                        style={{ padding: '2px 8px', border: '1px solid var(--platinum-border)', color: 'var(--porcelain)' }}
                      >
                        −
                      </button>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--porcelain)' }}>{item.qty}</span>
                      <button 
                        onClick={() => updateQty(product.id, item.qty + 1)}
                        style={{ padding: '2px 8px', border: '1px solid var(--platinum-border)', color: 'var(--porcelain)' }}
                      >
                        +
                      </button>
                    </div>

                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--porcelain)' }}>
                      {formatPrice(price * item.qty)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Voucher Input */}
            <div style={{ padding: '1.5rem', background: 'var(--imperial)', marginBottom: '2.5rem', border: '1px solid var(--platinum-border)' }}>
              {coupon ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--porcelain)' }}>
                    voucher applied: <strong>{coupon}</strong>
                  </span>
                  <button onClick={removeCoupon} style={{ color: 'var(--garnet)', fontFamily: 'var(--font-sans)', fontSize: '0.72rem' }}>remove</button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="text"
                    placeholder="voucher code (e.g. DIS23)"
                    value={couponInput}
                    onChange={e => { setCouponInput(e.target.value); setCouponError(false); }}
                    style={{ flex: 1, padding: '8px 12px', background: 'transparent', border: '1px solid var(--platinum)', color: 'var(--porcelain)', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', outline: 'none' }}
                  />
                  <button type="submit" className="spotlight-detail__cta" style={{ width: 'auto', padding: '8px 20px' }}>
                    apply
                  </button>
                </form>
              )}
              {couponError && <div style={{ color: 'var(--garnet)', fontSize: '0.75rem', marginTop: '6px' }}>invalid voucher code</div>}
            </div>

            {/* Totals Breakdown */}
            <div style={{ borderTop: '1px solid var(--platinum-border)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--platinum)' }}>
                <span>subtotal valuation</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', color: 'var(--garnet)', fontFamily: 'var(--font-sans)', fontSize: '0.85rem' }}>
                  <span>voucher exemption</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--platinum)' }}>
                <span>statutory gst (18%)</span>
                <span>{formatPrice(gstAmount)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--platinum)' }}>
                <span>carriage</span>
                <span>{shipping === 0 ? 'complimentary (over ₹2,000)' : formatPrice(shipping)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 0 0', borderTop: '1px solid var(--platinum)', marginTop: '12px', fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--porcelain)' }}>
                <span>total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <div style={{ marginTop: '3rem' }}>
              <Link to="/checkout" className="spotlight-detail__cta" style={{ display: 'block', textAlign: 'center' }}>
                proceed to checkout →
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
