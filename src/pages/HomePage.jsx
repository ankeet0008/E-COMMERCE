import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../data/ProductsContext';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

export default function HomePage() {
  const { products, loading } = useProducts();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  if (loading) {
    return (
      <main className="pt-32 pb-20 flex justify-center items-center min-h-[60vh]">
        <Spinner />
      </main>
    );
  }

  const categoryCards = [
    {
      name: 'Storage',
      path: '/browse?category=Storage',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZKoWXOgmSk6OaeDYbEgy99t1-Z1AMhWp06cB1uMlUpNPQxE3dAQNLFce9kzyvlCUY4zLhV8hLuzJtX0o3PZxfCV2IKbQCw6f7BDtXEs9GYugFJsuZp0yo8KFctzWMM5wEV3bDC9SL6Ce1QPthE25aAaXNt495R-EGjqbyhXVS_vfPB1W3kSBKc5BpPL-Ylm7_UYVPYP4Y7o7k0UQ8PUuMr-i-BIscjwjBOecHznnLpjmbZMVQiuSh'
    },
    {
      name: 'Beds',
      path: '/browse?category=Beds',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcNnRwpAiD77FrsAmaHh-CxYHPxuPjaWEhclgsDvAlVK3q7f8LcUDWm2NR4zczDd4JE4pXem6x0yGxck-LgmDtVt0brW6qBqHGPOuUSBUDv4kLuVLbdKcPiddj9MmbY8HZd9jMRHOZyLi1vdexa7LP0hLjslnW6Ms2jqv0lVOqCMe0r76lx-3TD-Uv7xvPHuekjxXncJjoDlLqY8AF0x21HuHJCdQpw83athwANZIsUXa6pxDrjHId'
    },
    {
      name: 'Dining Sets',
      path: '/browse?category=Dining%20Sets',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ2sYaT7W1-GhmnuIWJZANqoTunJE10Cmg2ClLe9z9SA11RV6daLMx_W30-9okv9oFtXFEbiCRWbk0-48iQKNPfM0HR40WfWTxi_0HE6Bst2PIFXcljni0tVjGSAgmm-vaWjZgFv_MIlxColxAK4YvyN5Qz1e4Ro0kq5TpZvFR03uM_KcU6Kop3eajG5QDVvRq_S_oBukZI9cs9F1feocyIXBR53aTSh9f7jCtwwHxAkofBxmqmgQi'
    },
    {
      name: 'Armchairs',
      path: '/browse?category=Armchairs',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHIq-ocX-8pZeLRSS_pV2ItpWD9RiP4LQpDX_ySrAtjpxQd7rd7ld3Ii6t2fBWJCHljbazIyB25JegEE-Iy-Y5DwQPRtcq8dkHlpG8ftq4ZLvPrFPCJvaTq72xJCBrE9zYF0Y1TcTtGmC6xvnzluRYRD3TlXEy7CO3lHfnK0XGS_DXGr7wggAPO5cifL1aqp8hri5H5mB2tnABz-9O6vXgf_VrFOmeQWOv06iZesPsLjNPNYTr2HhE'
    },
    {
      name: 'Sofas',
      path: '/browse?category=Sofas',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBthKnwjH3GYT5YjP6oIO7cerfGsqDUvmBv5pMgTYta1InGHROh-50A0bUx4rs5TD8WyKd3fOxCwH2O-uo5ijWALCrmGdpwlvgKkzD7Bl_yGN_cPG6_VsMnoZQk_QpWGl4Jh26Y0mO7gbnTMf13nGepZS3nJ7N71NVh2iFCd0dw9Pj6ss9SI5CM2QfhuBU3rOEgTPIlQyIJqfjvN8bj0CjbASLbxCRrEfzIs1ii4KE2Uh9Jf9ghcmnn'
    },
    {
      name: 'Rugs',
      path: '/browse?category=Rugs',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUEj-1B274tA_Nr9vwqovzDbaFK2eMEEwjTXh6451TBxE_-bVoAH-112pHcPHSfd0qwhP0HL7wBGAMfgf4OnRneRxSwIur5D28kZzuvu_9aT3GBcT-0uuPaNrYS8Q7zUFfxyK89nU_y3NjIoeMJRrqX4Z62S0_5itpiNOKRmsBa-q1KCUWiQHP8XkVcj1a4TiU8vqnJXuGlwm8yCWHmsRGPTVsz5hjXw6m7Xl9eBmSJoFR_l2mvngI'
    }
  ];

  return (
    <main className="pt-28 pb-section-gap">
      {/* ============================================================
          HERO SECTION
          ============================================================ */}
      <section className="px-margin-mobile md:px-margin-desktop mb-section-gap max-w-container-max mx-auto">
        <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-4 tracking-wider">
          ANKIT KI DUKAN
        </p>
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg mb-6 max-w-2xl font-medium tracking-tight text-on-surface">
          Spaces that feel like you.
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-xl leading-relaxed">
          Distinctive furniture, lighting, and accessories – curated for a home with personality and warmth.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link 
            to="/browse"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-on-primary rounded-full font-medium hover:bg-primary-container transition-colors duration-300 w-full sm:w-auto shadow-sm"
          >
            Explore Collection
            <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
          </Link>
          <Link 
            to="/browse"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-outline-variant text-on-surface rounded-full font-medium hover:bg-surface-container transition-colors duration-300 w-full sm:w-auto underline decoration-1 underline-offset-4"
          >
            Shop by Room
          </Link>
        </div>

        {/* 2-Column Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            to="/browse?category=Mirrors" 
            className="relative block rounded-xl overflow-hidden aspect-[3/4] group"
          >
            <img 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Mirror World Ankit Ki Dukan"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOS8RnEsQsqnGDe98YLaF4hflPBff7TvOQpgtX3VbuYV8d8_0iARjA0XvUfze6e5pOEx1uvRQ8zApc_hySRlfJI00NCZ1-Qv4mXMdsE_OYjU_pJmnbYHxL7xt0KrK4NEyMnIxy8bo3UxD2p6a3Jo5Y4H42mW0AZmwZf5g71rs4aJ1gMl4XYBx7tzL32L_Be7xWiS9spjRPJAp4nlRriyoD5lqgHxpQa2rdhoCo7kRCbjOjb6NAWIuK" 
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur px-5 py-2 rounded-full whitespace-nowrap shadow-sm">
              <span className="font-label-caps text-label-caps uppercase text-on-surface font-semibold tracking-wider">
                Mirror World
              </span>
            </div>
          </Link>

          <Link 
            to="/browse?category=Rugs" 
            className="relative block rounded-xl overflow-hidden aspect-[3/4] group"
          >
            <img 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Rug Collections Ankit Ki Dukan"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpiwPf6JBWPqjkHD7Viq99kEI7VSUGNUTDezXVULBco4B6Hw87GpDIPxAGAw4bVZv-LTPPsLeCt4QCEKjXU4xUo9U_BgGTGMpGG2ENTptsX1JMJ8RuHVrJ_y0RS4n1CrDgWOAoVkiQC4ZSMo9sIiDyXCR-M6FbDUXlz3tf1zZEHX-uaxi1kqhS0plsUKOE8oEkQte-nyg2UNq8t6D86kuCTQLesrZLMkGev9mNz-6ocTEnRkmcDhk7" 
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur px-5 py-2 rounded-full whitespace-nowrap shadow-sm">
              <span className="font-label-caps text-label-caps uppercase text-on-surface font-semibold tracking-wider">
                Rug Collections
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ============================================================
          CATEGORIES CAROUSEL ("EXPLORE DIRECTLY")
          ============================================================ */}
      <section className="mb-section-gap overflow-hidden">
        <div className="px-margin-mobile md:px-margin-desktop mb-6 max-w-container-max mx-auto">
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">
            EXPLORE DIRECTLY
          </p>
          <h2 className="font-headline-md text-headline-md font-medium text-on-surface">
            What are you looking for?
          </h2>
        </div>

        <div className="flex overflow-x-auto hide-scrollbar px-margin-mobile md:px-margin-desktop gap-6 pb-4 snap-x max-w-container-max mx-auto">
          {categoryCards.map((cat) => (
            <Link 
              key={cat.name} 
              to={cat.path} 
              className="flex flex-col items-center gap-3 min-w-[130px] md:min-w-[150px] snap-start group"
            >
              <div className="w-full aspect-square bg-surface-container rounded-xl overflow-hidden p-4 flex items-center justify-center border border-outline-variant/20 group-hover:border-primary/40 transition-colors">
                <img 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" 
                  alt={cat.name}
                  src={cat.image} 
                />
              </div>
              <span className="font-body-md text-body-md text-on-surface font-medium group-hover:text-primary transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================
          EDITORIAL SECTIONS (SOFAS, CHAIRS, DINING TABLES)
          ============================================================ */}
      <section className="px-margin-mobile md:px-margin-desktop mb-section-gap flex flex-col gap-6 max-w-container-max mx-auto">
        {/* Banner 1: Sofas */}
        <Link 
          to="/browse?category=Sofas" 
          className="relative block w-full h-[400px] md:h-[580px] rounded-2xl overflow-hidden group shadow-sm"
        >
          <img 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            alt="Sofas Collection" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPQSO29CE5Hc5ObHwst6G6EK0g6vGI100R92TZlI4dGM3NRlziThry06ITZkM9GgTnAA2Lxbpm7Qb60vWkwFuRPvCB3xh8jdlUKlBJ9wwE3wY03hmZL5l73gOUu5CZrYybdNRc7g0fwaGfKfX0t6dOH-UbVUNMc2O9z93tDLwBwIdpYGYEgAPU7bpexwICzgVjNT34HrNp2YUNqiIKaz_Ht6uiv6pdc7zgZu4TJLzjdwcmF-d2c_tb" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
            <p className="font-label-caps text-label-caps text-on-primary uppercase mb-2 tracking-wider opacity-90">
              SOFAS
            </p>
            <h3 className="font-headline-md text-headline-md md:text-display-lg text-on-primary mb-2 font-medium">
              The Centerpiece for Coming Home
            </h3>
            <p className="font-body-md text-body-md text-on-primary/90 mb-4 max-w-md">
              Sofas with clean silhouettes, tactile fabrics, and room for long relaxed evenings.
            </p>
            <span className="inline-flex items-center text-on-primary font-medium group-hover:underline underline-offset-4 decoration-1">
              Discover Now <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
            </span>
          </div>
        </Link>

        {/* Banner 2: Chairs */}
        <Link 
          to="/browse?category=Chairs" 
          className="relative block w-full h-[400px] md:h-[580px] rounded-2xl overflow-hidden group shadow-sm"
        >
          <img 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            alt="Chairs Collection" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHKSldPDSyyObhiCItRpbMHRu-cbkQcQUuYr3DkKx9qoaqAENMchlFFyIen5XygdeTSwk3CLem4PNAI6PKLS7mSn01bY1S3HkvwRODm0nlH15znXXSYNQN6NirVZEQ-a6lru4byEEExANfYZPMmzpiwgvZy5aL-xLPG9waphx0Sn90iDM5XJgK41L13-KJMEBeh5YSp4LYLo-ZXvpPES6vVr7p0wDzanH-cdpQPXPtSYHlFzfvU5zy" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
            <p className="font-label-caps text-label-caps text-on-primary uppercase mb-2 tracking-wider opacity-90">
              CHAIRS
            </p>
            <h3 className="font-headline-md text-headline-md md:text-display-lg text-on-primary mb-2 font-medium">
              Good Design Takes a Seat
            </h3>
            <p className="font-body-md text-body-md text-on-primary/90 mb-4 max-w-md">
              Comfortable dining chairs that create accents at the dining table and across your home.
            </p>
            <span className="inline-flex items-center text-on-primary font-medium group-hover:underline underline-offset-4 decoration-1">
              Discover Now <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
            </span>
          </div>
        </Link>

        {/* Banner 3: Dining Tables */}
        <Link 
          to="/browse?category=Dining%20Tables" 
          className="relative block w-full h-[400px] md:h-[580px] rounded-2xl overflow-hidden group shadow-sm"
        >
          <img 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            alt="Dining Tables Collection" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcQhp38CTuCln75rID7_omTyPSPKwWhZCefPZADGFkJD4HSn7cUcNGQ-2dnLPHjBjXSb1VXPhGqJ8Q9Z7gmqCF4uZZSRCsM54NtCV-__DCAWBlALORwpEIhxI_zaH-D80CBEW39knApt-a24TBp_53cG4esIWX_B5SndmXmV1iEQdmoQXZWX8sOnTHgfyCvD8ctlmF6JZOWAadBrrCTD_oMrPwndB3qRvLl8v_yddBHlQXhpXoDvDN" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
            <p className="font-label-caps text-label-caps text-on-primary uppercase mb-2 tracking-wider opacity-90">
              DINING TABLES
            </p>
            <h3 className="font-headline-md text-headline-md md:text-display-lg text-on-primary mb-2 font-medium">
              For Everything That Brings Us Together
            </h3>
            <p className="font-body-md text-body-md text-on-primary/90 mb-4 max-w-md">
              Dining tables as a calm focal point for daily life, family, and memorable gatherings.
            </p>
            <span className="inline-flex items-center text-on-primary font-medium group-hover:underline underline-offset-4 decoration-1">
              Discover Now <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
            </span>
          </div>
        </Link>
      </section>

      {/* ============================================================
          HANDPICKED FAVORITES CAROUSEL
          ============================================================ */}
      <section className="mb-section-gap py-16 bg-[#a7b5a8]/15 rounded-3xl mx-margin-mobile md:mx-margin-desktop">
        <div className="px-6 md:px-12 max-w-container-max mx-auto mb-8 flex justify-between items-end">
          <div>
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">
              HANDPICKED
            </p>
            <h2 className="font-display-lg-mobile text-display-lg-mobile md:text-display-lg text-primary mb-3 font-medium">
              Favorites for Your Home
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Carefully selected pieces curated with an eye for detail, comfort, and timeless modern living.
            </p>
          </div>
          <Link 
            to="/browse" 
            className="hidden md:inline-flex font-label-caps text-label-caps uppercase text-primary border-b border-primary pb-1 hover:text-primary-container transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="flex overflow-x-auto hide-scrollbar px-6 md:px-12 gap-6 pb-4 snap-x max-w-container-max mx-auto">
          {products.slice(0, 6).map((product) => (
            <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-start flex flex-col group">
              <ProductCard product={product} showAction={true} />
            </div>
          ))}
        </div>

        <div className="px-6 flex justify-center md:hidden mt-4">
          <Link 
            to="/browse" 
            className="font-label-caps text-label-caps uppercase text-primary border-b border-primary pb-1"
          >
            View All
          </Link>
        </div>
      </section>

      {/* ============================================================
          FEATURES / TRUST INDICATORS
          ============================================================ */}
      <section className="px-margin-mobile md:px-margin-desktop mb-section-gap max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-outline-variant">
          <div className="pt-6 md:pt-0 md:pr-8">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-medium">
              Personally Curated
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Curated design selections instead of endless clutter
            </p>
          </div>
          <div className="pt-6 md:pt-0 md:px-8">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-medium">
              Secure Shopping
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Trusted payment methods and end-to-end encrypted checkout
            </p>
          </div>
          <div className="pt-6 md:pt-0 md:pl-8">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-medium">
              Transparent Delivery
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Clear delivery estimates displayed directly on every product
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          NEWSLETTER
          ============================================================ */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="bg-primary rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-sm">
          <div className="w-full md:w-1/2 h-64 md:h-auto relative">
            <img 
              className="absolute inset-0 w-full h-full object-cover" 
              alt="Ankit Ki Dukan living space" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg6oRUs94yw6LNqdknqmqsnJNfQ9FHSOYqTcTgfmMLyUy_aJS4dM8pPrSi7CI4xuTq5uj2tiCpJH_3Z846k8QnSG0rQCRvb1yXHx9STY_a1urGYB9R2zryLNdtojG4LEU-YBLq-1xqYVaHBxK8_lSsxIan7VsvghRVgHBpKNZL3s-X2n5mBwO1ZM6RHrE00gUoZPwan2NZW9AK30rnPQWBLt6HcuKaV9LVzhtUmYCZfHVXHkFJ2jgB" 
            />
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
            <p className="font-label-caps text-label-caps text-on-primary/80 uppercase mb-4 tracking-wider">
              ANKIT KI DUKAN NEWSLETTER
            </p>
            <h3 className="font-headline-md text-headline-md md:text-display-lg text-on-primary mb-4 font-medium">
              Get 15% off your first order.
            </h3>
            <p className="font-body-md text-body-md text-on-primary/90 mb-8 leading-relaxed">
              New living concepts, fresh collections, and curated deals delivered directly to your inbox.
            </p>
            
            {subscribed ? (
              <div className="p-4 bg-surface-tint rounded-xl text-on-primary font-medium flex items-center gap-3">
                <span className="material-symbols-outlined">check_circle</span>
                <span>Thank you! Your 15% discount code has been reserved.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-4">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                    mail
                  </span>
                  <input 
                    className="w-full pl-12 pr-4 py-4 rounded-full bg-surface text-on-surface border-none focus:ring-2 focus:ring-primary-fixed outline-none text-sm md:text-base" 
                    placeholder="Email address" 
                    required 
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                  />
                </div>
                <button 
                  className="w-full py-4 rounded-full bg-surface-tint text-on-primary font-medium hover:bg-surface-tint/90 transition-colors shadow-sm" 
                  type="submit"
                >
                  Subscribe
                </button>
              </form>
            )}
            <p className="font-body-md text-body-md text-[12px] text-on-primary/70 mt-4 text-center md:text-left">
              After confirming, your personal 15% voucher will be delivered via email.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
