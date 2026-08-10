import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../data/ProductsContext';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

// Editorial fallback slides for the luxury hero carousel
const LUXURY_SLIDES = [
  {
    id: 101,
    title: 'The Tailored Suit',
    subtitle: 'Autumn-Winter 2026 Collection',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    category: 'Menswear'
  },
  {
    id: 102,
    title: 'High-Neck Cashmere Knit',
    subtitle: 'Pure Italian Thread',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    category: 'Womenswear'
  },
  {
    id: 103,
    title: 'Evening Formal Ensemble',
    subtitle: 'Handcrafted Atelier Series',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    category: 'Haute Couture'
  },
  {
    id: 104,
    title: 'Suede Outerwear & Denim',
    subtitle: 'Urban Atelier Essentials',
    image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=800&q=80',
    category: 'Outerwear'
  },
  {
    id: 105,
    title: 'Textured Wool Wrap',
    subtitle: 'Artisanal Weave',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    category: 'Accessories'
  }
];

export default function HomePage() {
  const { products, categories, loading, error } = useProducts();
  const [activeSlide, setActiveSlide] = useState(2); // Center slide initially
  const [promptText, setPromptText] = useState('');
  const navigate = useNavigate();

  // Combine API product thumbnails into luxury slide deck if available
  const carouselItems = products.length >= 5
    ? products.slice(0, 5).map((p, idx) => ({
        id: p.id,
        title: p.name,
        subtitle: p.brand || p.category,
        image: p.images[0] || p.image,
        category: p.category
      }))
    : LUXURY_SLIDES;

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
  };

  const handlePromptSubmit = (e) => {
    e.preventDefault();
    if (promptText.trim()) {
      navigate(`/browse?q=${encodeURIComponent(promptText.trim())}`);
    }
  };

  if (loading) return <main><Spinner /></main>;

  const featuredCategories = categories.slice(0, 4);

  return (
    <main className="luxury-main">
      {/* ============================================================
          LUXURY HERO SECTION (Brunello Cucinelli Inspired)
          ============================================================ */}
      <section className="luxury-hero">
        {/* Grid Wall Background Texture */}
        <div className="luxury-hero__bg-grid"></div>
        <div className="luxury-hero__vignette"></div>

        {/* Floating Interactive Product Track */}
        <div className="luxury-hero__carousel-container">
          <button 
            className="luxury-hero__nav-btn luxury-hero__nav-btn--prev"
            onClick={handlePrev}
            aria-label="Previous Item"
          >
            ‹
          </button>

          <div className="luxury-hero__track">
            {carouselItems.map((item, index) => {
              // Calculate offset from center active card
              const offset = index - activeSlide;
              let classNames = 'luxury-hero__card';
              if (offset === 0) classNames += ' is-active';
              else if (offset === -1 || (activeSlide === 0 && index === carouselItems.length - 1)) classNames += ' is-prev';
              else if (offset === 1 || (activeSlide === carouselItems.length - 1 && index === 0)) classNames += ' is-next';
              else classNames += ' is-far';

              return (
                <div 
                  key={item.id} 
                  className={classNames}
                  onClick={() => setActiveSlide(index)}
                >
                  <div className="luxury-hero__card-image-wrap">
                    <img src={item.image} alt={item.title} />
                  </div>
                </div>
              );
            })}
          </div>

          <button 
            className="luxury-hero__nav-btn luxury-hero__nav-btn--next"
            onClick={handleNext}
            aria-label="Next Item"
          >
            ›
          </button>
        </div>

        {/* Hero Editorial Headlines */}
        <div className="luxury-hero__content">
          <h1 className="luxury-hero__title">
            Where ideas become endless <br />
            <em>possibilities</em>
          </h1>
          <p className="luxury-hero__subtitle">
            Welcome to the AI Online Boutique
          </p>
        </div>

        {/* Bottom Luxury Control & Search Concierge Bar */}
        <div className="luxury-hero__bottom-bar">
          <button 
            className="luxury-hero__scroll-btn"
            onClick={() => window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
          >
            <span className="luxury-hero__scroll-arrow">↓</span> Scroll to explore
          </button>

          {/* Glassmorphic Search / Concierge Input Pill */}
          <form className="luxury-hero__concierge-pill" onSubmit={handlePromptSubmit}>
            <button type="button" className="luxury-hero__pill-add" title="Add Filter">+</button>
            <input 
              type="text" 
              placeholder="I need an outfit for a movie premiere..." 
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
            />
            <button type="submit" className="luxury-hero__pill-submit" title="Search Concierge">
              ↑
            </button>
          </form>
        </div>

        {/* Subtle Footer watermark line */}
        <div className="luxury-hero__footer-tag">
          <span>© 2026 BRUNELLO CUCINELLI SPA ATELIER</span>
          <span>THIS WEBSITE RUNS ON BOUTIQUE AI ENGINE</span>
        </div>
      </section>

      {/* ============================================================
          LUXURY CATEGORY SHOWCASE
          ============================================================ */}
      <section className="luxury-showcase container">
        <div className="luxury-section-title">
          <span className="luxury-section-title__tag">CURATED DEPARTMENTS</span>
          <h2 className="luxury-section-title__heading">The Italian Heritage Collection</h2>
        </div>

        <div className="luxury-categories-grid">
          {categories.map((cat, idx) => {
            const catProducts = products.filter(p => p.category === cat.name);
            const firstImg = catProducts[0]?.images[0] || catProducts[0]?.image || LUXURY_SLIDES[idx % LUXURY_SLIDES.length].image;
            return (
              <Link 
                to={`/browse?category=${encodeURIComponent(cat.name)}`} 
                key={cat.name} 
                className="luxury-category-card"
              >
                <div className="luxury-category-card__img-wrap">
                  <img src={firstImg} alt={cat.name} loading="lazy" />
                </div>
                <div className="luxury-category-card__overlay">
                  <span className="luxury-category-card__num">0{idx + 1}</span>
                  <h3 className="luxury-category-card__name">{cat.name}</h3>
                  <span className="luxury-category-card__count">{cat.totalStock} Available</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          FEATURED COLLECTION RAILS
          ============================================================ */}
      <section className="container luxury-rails">
        {featuredCategories.map((cat) => {
          const catProducts = products.filter((p) => p.category === cat.name);
          return (
            <div key={cat.name} className="luxury-rail-block">
              <div className="luxury-rail-header">
                <div>
                  <span className="luxury-rail-header__tag">DEPARTMENT</span>
                  <h3 className="luxury-rail-header__title">{cat.name}</h3>
                </div>
                <Link to={`/browse?category=${encodeURIComponent(cat.name)}`} className="luxury-rail-header__link">
                  View Collection →
                </Link>
              </div>
              <div className="luxury-rail-grid">
                {catProducts.slice(0, 4).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
