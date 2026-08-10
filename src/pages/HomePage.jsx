import { Link } from 'react-router-dom';
import { useProducts } from '../data/ProductsContext';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

export default function HomePage() {
  const { products, categories, loading, error } = useProducts();

  if (loading) return <main><Spinner /></main>;
  if (error) return (
    <main style={{ padding: '6rem 0', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--ivory)', opacity: 0.8 }}>
        The Royal Registry is temporarily unaccessible — {error}
      </p>
    </main>
  );

  // Pick hero product
  const heroProduct = products[0] || {
    id: 1,
    name: 'Hand-Engraved Brass Pocket Chronometer',
    category: 'The Study',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80'
  };

  // Rooms definition
  const rooms = categories.slice(0, 4).map((cat, idx) => {
    const catProducts = products.filter(p => p.category === cat.name);
    const roomImg = catProducts[0]?.images[0] || catProducts[0]?.image || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80';
    return {
      num: `CHAMBER 0${idx + 1}`,
      name: cat.name,
      count: cat.totalStock,
      image: roomImg
    };
  });

  return (
    <main>
      {/* ============================================================
          HERO — FULL BLEED CINEMATIC WITH HERALDIC CREST
          ============================================================ */}
      <section className="royal-hero">
        <img 
          src={heroProduct.images ? heroProduct.images[0] : heroProduct.image} 
          alt="Royal Emporium Hero Exhibit" 
          className="royal-hero__bg-image"
        />
        <div className="royal-hero__vignette"></div>

        <div className="royal-hero__content">
          {/* Centered Crest Anchor Mark */}
          <svg className="royal-hero__crest-hero" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 4L32 16H18L25 4Z" fill="currentColor"/>
            <path d="M12 21H38V24H12V21Z" fill="currentColor"/>
            <path d="M15 26H35V45H15V26Z" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M20 34C20 31.2386 22.2386 29 25 29C27.7614 29 30 31.2386 30 34V45H20V34Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="25" cy="11" r="2" fill="currentColor"/>
          </svg>

          <span className="royal-hero__warrant-tag">
            By Appointment to the Royal Court · Est. 1884
          </span>

          <h1 className="royal-hero__title">
            Objects of Exceptional <em>Provenance & Craft</em>
          </h1>

          <p className="royal-hero__subtitle">
            A private emporium stocking curated collections across apothecary, leatherware, fine stationery, and maison objects — offered in limited releases.
          </p>

          <Link to="/browse" className="royal-hero__cta">
            Explore The Galleries <span>→</span>
          </Link>
        </div>
      </section>

      {/* ============================================================
          ROOMS OF THE EMPORIUM (CHAMBERS)
          ============================================================ */}
      <section className="container royal-rooms">
        <div className="royal-section-header">
          <span className="royal-section-header__tag">BY APPOINTMENT</span>
          <h2 className="royal-section-header__title">The Chambers of the Emporium</h2>
        </div>

        <div className="royal-rooms__grid">
          {rooms.map((room) => (
            <Link 
              key={room.name} 
              to={`/browse?category=${encodeURIComponent(room.name)}`}
              className="royal-room-card"
            >
              <img src={room.image} alt={room.name} className="royal-room-card__image" loading="lazy" />
              <div className="royal-room-card__overlay">
                <span className="royal-room-card__num">{room.num}</span>
                <h3 className="royal-room-card__title">{room.name}</h3>
                <span className="royal-room-card__desc">{room.count} Cataloged Lots</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================
          THE GALLERY WALL
          ============================================================ */}
      <section className="container royal-gallery-wall">
        <div className="royal-section-header">
          <span className="royal-section-header__tag">EXHIBIT DIRECTORY</span>
          <h2 className="royal-section-header__title">Recent Acquisitions & Lot Releases</h2>
        </div>

        <div className="royal-gallery-grid">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ============================================================
          PROVENANCE EDITORIAL FEATURE BLOCK
          ============================================================ */}
      <section className="royal-feature">
        <div className="container">
          <div className="royal-feature__inner">
            <div className="royal-feature__text">
              <span className="royal-feature__tag">THE HERITAGE LEDGER</span>
              <h2 className="royal-feature__title">
                Hand-Selected with Uncompromising Rigor
              </h2>
              <p className="royal-feature__desc">
                For over a century, our maison has operated as a private vault for discerning collectors. Every object in our collection is acquired directly from master workshops, documented with verifiable provenance, and preserved for generations.
              </p>
              <Link to="/browse" className="royal-hero__cta">
                View All Cataloged Lots <span>→</span>
              </Link>
            </div>

            <div className="royal-frame" style={{ height: '420px' }}>
              <div className="royal-frame__inner" style={{ height: '100%' }}>
                <img 
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80" 
                  alt="Royal Atelier" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
