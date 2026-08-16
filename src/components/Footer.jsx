import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full mt-[120px] bg-surface-taupe grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-20 max-w-container-max mx-auto rounded-t-2xl">
      {/* Col 1: Brand Info */}
      <div className="flex flex-col gap-6 col-span-1 md:col-span-1">
        <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
          ANKIT KI DUKAN
        </h2>
        <p className="font-body-md text-body-md text-secondary pr-4 leading-relaxed">
          Design that lasts.<br />
          Thoughtfully curated furniture and home decor for spaces with warmth, calm, and personality.
        </p>
        <div className="flex gap-4 mt-2">
          <a href="#" className="text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200" aria-label="Instagram">
            <span className="material-symbols-outlined">photo_camera</span>
          </a>
          <a href="#" className="text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200" aria-label="Video">
            <span className="material-symbols-outlined">play_circle</span>
          </a>
        </div>
      </div>

      {/* Col 2: Products */}
      <div className="flex flex-col gap-3">
        <h3 className="font-label-caps text-label-caps text-on-surface uppercase mb-2">
          Products
        </h3>
        <Link to="/browse?category=Sofas" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Sofas & Modular
        </Link>
        <Link to="/browse?category=Armchairs" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Armchairs & Lounge
        </Link>
        <Link to="/browse?category=Rugs" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Wool & Floor Rugs
        </Link>
        <Link to="/browse?category=Dining%20Tables" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Dining Tables
        </Link>
        <Link to="/browse?category=Mirrors" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Mirrors & Decor
        </Link>
        <Link to="/browse?category=Storage" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Storage & Cabinets
        </Link>
      </div>

      {/* Col 3: About */}
      <div className="flex flex-col gap-3">
        <h3 className="font-label-caps text-label-caps text-on-surface uppercase mb-2">
          About
        </h3>
        <Link to="/browse" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Our Story
        </Link>
        <Link to="/browse" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Curated Spaces
        </Link>
        <Link to="/browse" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Sustainability
        </Link>
        <Link to="/browse" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Contact & FAQ
        </Link>
      </div>

      {/* Col 4: Help */}
      <div className="flex flex-col gap-3">
        <h3 className="font-label-caps text-label-caps text-on-surface uppercase mb-2">
          Help & Support
        </h3>
        <Link to="/browse" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Track Your Order
        </Link>
        <Link to="/browse" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Shipping & Delivery
        </Link>
        <Link to="/browse" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Returns & Exchanges
        </Link>
        <Link to="/browse" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Warranty & Care
        </Link>
      </div>

      {/* Bottom Row */}
      <div className="col-span-1 md:col-span-4 mt-12 pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body-md text-body-md text-[14px] text-secondary">
          © 2026 Ankit Ki Dukan. Editorial Minimalism for Modern Living.
        </p>
        <div className="flex gap-6">
          <Link to="/browse" className="font-body-md text-body-md text-[14px] text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
            Terms & Conditions
          </Link>
          <Link to="/browse" className="font-body-md text-body-md text-[14px] text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
            Privacy Policy
          </Link>
          <Link to="/browse" className="font-body-md text-body-md text-[14px] text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
            Imprint
          </Link>
        </div>
      </div>
    </footer>
  );
}
