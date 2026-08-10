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
      <main style={{ padding: '6rem 0' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div className="royal-ledger" style={{ textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--brass)', color: 'var(--emerald-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', fontSize: '1.5rem', fontWeight: 700 }}>
              ✓
            </div>
            <h1 className="royal-ledger__title">Reservation Confirmed</h1>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', margin: '1rem 0 2rem 0', fontSize: '1.1rem' }}>
              Your order has been cataloged under Royal Warrant registry. Our master packers will carefully inspect and dispatch your pieces under private seal.
            </p>
            <Link to="/" className="royal-lot-cta" style={{ display: 'inline-block' }}>
              Return to The Entrance
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (count === 0) {
    return (
      <main style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="container">
          <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--ivory)', fontSize: '1.2rem', marginBottom: '2rem' }}>
            No lots reserved — please select pieces from our chambers prior to checkout.
          </p>
          <Link to="/browse" className="royal-hero__cta">
            Explore Galleries
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: '4rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        <div className="royal-ledger">
          <div className="royal-ledger__header">
            <h1 className="royal-ledger__title">Private Dispatch Checkout</h1>
            <p className="royal-ledger__subtitle">Secured Registry Entry</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-crest)', fontSize: '1.4rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--parchment)', paddingBottom: '6px' }}>
                Recipient & Address
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.18em', color: 'var(--brass-dark)', textTransform: 'uppercase' }}>Email Address</label>
                  <input type="email" required style={{ width: '100%', padding: '10px', border: '1px solid var(--smoke)', background: '#FFF', fontFamily: 'var(--font-serif)', fontSize: '1rem', marginTop: '4px', outline: 'none' }} placeholder="lord.cheney@houseofreps.org" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.18em', color: 'var(--brass-dark)', textTransform: 'uppercase' }}>First Name</label>
                    <input type="text" required style={{ width: '100%', padding: '10px', border: '1px solid var(--smoke)', background: '#FFF', fontFamily: 'var(--font-serif)', fontSize: '1rem', marginTop: '4px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.18em', color: 'var(--brass-dark)', textTransform: 'uppercase' }}>Last Name</label>
                    <input type="text" required style={{ width: '100%', padding: '10px', border: '1px solid var(--smoke)', background: '#FFF', fontFamily: 'var(--font-serif)', fontSize: '1rem', marginTop: '4px', outline: 'none' }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.18em', color: 'var(--brass-dark)', textTransform: 'uppercase' }}>Residence / Estate Address</label>
                  <input type="text" required style={{ width: '100%', padding: '10px', border: '1px solid var(--smoke)', background: '#FFF', fontFamily: 'var(--font-serif)', fontSize: '1rem', marginTop: '4px', outline: 'none' }} placeholder="14 Kensington Palace Gardens" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.18em', color: 'var(--brass-dark)', textTransform: 'uppercase' }}>City</label>
                    <input type="text" required style={{ width: '100%', padding: '10px', border: '1px solid var(--smoke)', background: '#FFF', fontFamily: 'var(--font-serif)', fontSize: '1rem', marginTop: '4px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.18em', color: 'var(--brass-dark)', textTransform: 'uppercase' }}>Postal Code</label>
                    <input type="text" required style={{ width: '100%', padding: '10px', border: '1px solid var(--smoke)', background: '#FFF', fontFamily: 'var(--font-serif)', fontSize: '1rem', marginTop: '4px', outline: 'none' }} />
                  </div>
                </div>
              </div>

              <h2 style={{ fontFamily: 'var(--font-crest)', fontSize: '1.4rem', margin: '2rem 0 1.25rem 0', borderBottom: '1px solid var(--parchment)', paddingBottom: '6px' }}>
                Payment Method
              </h2>
              <div>
                <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.18em', color: 'var(--brass-dark)', textTransform: 'uppercase' }}>Card Number</label>
                <input type="text" required placeholder="•••• •••• •••• 4820" style={{ width: '100%', padding: '10px', border: '1px solid var(--smoke)', background: '#FFF', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginTop: '4px', outline: 'none' }} />
              </div>

              <button type="submit" className="royal-lot-cta" style={{ marginTop: '2rem', display: 'block' }}>
                Authorize Dispatch — {formatPrice(grandTotal)}
              </button>
            </div>

            {/* Order Summary Side */}
            <div style={{ background: 'var(--parchment)', padding: '2rem', borderRadius: '2px', height: 'fit-content' }}>
              <h3 style={{ fontFamily: 'var(--font-crest)', fontSize: '1.3rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '8px' }}>
                Summary of Reserved Lots
              </h3>
              
              {items.map(item => {
                const product = getProduct(item.id);
                if (!product) return null;
                const price = product.sale ? product.salePrice : product.price;
                return (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontFamily: 'var(--font-serif)', fontSize: '0.95rem' }}>
                    <span>{product.name} × {item.qty}</span>
                    <span style={{ fontWeight: 600 }}>{formatPrice(price * item.qty)}</span>
                  </div>
                );
              })}

              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontFamily: 'var(--font-serif)' }}>
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', color: 'var(--burgundy)', fontFamily: 'var(--font-serif)' }}>
                    <span>Warrant Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontFamily: 'var(--font-serif)' }}>
                  <span>Statutory GST (18%)</span>
                  <span>{formatPrice(gstAmount)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontFamily: 'var(--font-serif)' }}>
                  <span>Royal Carriage</span>
                  <span>{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0 0', borderTop: '1px solid var(--smoke)', marginTop: '12px', fontFamily: 'var(--font-crest)', fontSize: '1.3rem', fontWeight: 600 }}>
                <span>Grand Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
