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
      <main className="porcelain-page">
        <div className="container" style={{ maxWidth: '640px' }}>
          <div className="porcelain-card" style={{ textAlign: 'center' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#12101C', color: 'var(--porcelain)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', fontSize: '1.2rem' }}>
              ✓
            </div>
            <h1 className="porcelain-title">Authorization Confirmed</h1>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#4A4654', margin: '1rem 0 2rem 0', lineHeight: 1.7 }}>
              Your order has been recorded. Your selected pieces are currently being prepared for private dispatch.
            </p>
            <Link to="/" className="porcelain-btn">
              return to unveiling
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (count === 0) {
    return (
      <main style={{ padding: '8rem 0', textAlign: 'center' }}>
        <div className="container">
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--platinum)', marginBottom: '2rem' }}>
            no selections held — please select pieces from the procession prior to checkout.
          </p>
          <Link to="/browse" className="spotlight-detail__cta" style={{ maxWidth: '240px', margin: '0 auto' }}>
            browse index
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="porcelain-page">
      <div className="container" style={{ maxWidth: '960px' }}>
        <div className="porcelain-card">
          <div style={{ textAlign: 'center', marginBottom: '3rem', borderBottom: '1px solid #E2DFC6', paddingBottom: '2rem' }}>
            <h1 className="porcelain-title">Acquisition Checkout</h1>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.2em', color: '#6A6475', textTransform: 'lowercase' }}>
              practical authorization entry
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#12101C', marginBottom: '1.25rem' }}>
                Delivery Details
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', letterSpacing: '0.15em', color: '#5A5666', textTransform: 'lowercase' }}>email address</label>
                  <input type="email" required style={{ width: '100%', padding: '10px', border: '1px solid #C8C5BD', background: '#FFF', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', marginTop: '4px', outline: 'none' }} placeholder="your@email.com" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', letterSpacing: '0.15em', color: '#5A5666', textTransform: 'lowercase' }}>first name</label>
                    <input type="text" required style={{ width: '100%', padding: '10px', border: '1px solid #C8C5BD', background: '#FFF', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', marginTop: '4px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', letterSpacing: '0.15em', color: '#5A5666', textTransform: 'lowercase' }}>last name</label>
                    <input type="text" required style={{ width: '100%', padding: '10px', border: '1px solid #C8C5BD', background: '#FFF', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', marginTop: '4px', outline: 'none' }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', letterSpacing: '0.15em', color: '#5A5666', textTransform: 'lowercase' }}>shipping address</label>
                  <input type="text" required style={{ width: '100%', padding: '10px', border: '1px solid #C8C5BD', background: '#FFF', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', marginTop: '4px', outline: 'none' }} />
                </div>
              </div>

              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#12101C', margin: '2rem 0 1.25rem 0' }}>
                Payment Method
              </h2>
              <div>
                <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', letterSpacing: '0.15em', color: '#5A5666', textTransform: 'lowercase' }}>card number</label>
                <input type="text" required placeholder="•••• •••• •••• 4820" style={{ width: '100%', padding: '10px', border: '1px solid #C8C5BD', background: '#FFF', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginTop: '4px', outline: 'none' }} />
              </div>

              <button type="submit" className="porcelain-btn" style={{ marginTop: '2rem', width: '100%', textAlign: 'center' }}>
                confirm authorization — {formatPrice(grandTotal)}
              </button>
            </div>

            {/* Side Summary */}
            <div style={{ background: '#F8F6F2', padding: '2rem', border: '1px solid #E2DFC6', height: 'fit-content' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: '#12101C', marginBottom: '1rem', borderBottom: '1px solid #E2DFC6', paddingBottom: '8px' }}>
                Selected Pieces
              </h3>

              {items.map(item => {
                const product = getProduct(item.id);
                if (!product) return null;
                const price = product.sale ? product.salePrice : product.price;
                return (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontFamily: 'var(--font-sans)', fontSize: '0.85rem' }}>
                    <span>{product.name} × {item.qty}</span>
                    <span style={{ fontWeight: 600 }}>{formatPrice(price * item.qty)}</span>
                  </div>
                );
              })}

              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E2DFC6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontFamily: 'var(--font-sans)', fontSize: '0.85rem' }}>
                  <span>subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', color: 'var(--garnet)', fontFamily: 'var(--font-sans)', fontSize: '0.85rem' }}>
                    <span>voucher exemption</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontFamily: 'var(--font-sans)', fontSize: '0.85rem' }}>
                  <span>statutory gst (18%)</span>
                  <span>{formatPrice(gstAmount)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontFamily: 'var(--font-sans)', fontSize: '0.85rem' }}>
                  <span>carriage</span>
                  <span>{shipping === 0 ? 'complimentary' : formatPrice(shipping)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0 0', borderTop: '1px solid #12101C', marginTop: '12px', fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#12101C' }}>
                <span>grand total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
