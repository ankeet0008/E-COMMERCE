import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full mt-[120px] bg-surface-taupe grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-20 max-w-container-max mx-auto rounded-t-2xl">
      {/* Col 1: Brand Info */}
      <div className="flex flex-col gap-6 col-span-1 md:col-span-1">
        <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
          SKANVI
        </h2>
        <p className="font-body-md text-body-md text-secondary pr-4 leading-relaxed">
          Design, das bleibt.<br />
          Skandinavisch inspirierte Möbel und Wohnaccessoires für Räume mit Ruhe, Wärme und Charakter.
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

      {/* Col 2: Produkte */}
      <div className="flex flex-col gap-3">
        <h3 className="font-label-caps text-label-caps text-on-surface uppercase mb-2">
          Produkte
        </h3>
        <Link to="/browse?category=Sofas" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Möbel & Sofas
        </Link>
        <Link to="/browse?category=Sessel" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Sessel & Lounge
        </Link>
        <Link to="/browse?category=Teppiche" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Teppiche
        </Link>
        <Link to="/browse?category=Esstische" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Esstische
        </Link>
        <Link to="/browse?category=Spiegel" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Spiegel
        </Link>
        <Link to="/browse?category=Aufbewahrung" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Aufbewahrung
        </Link>
      </div>

      {/* Col 3: Skanvi */}
      <div className="flex flex-col gap-3">
        <h3 className="font-label-caps text-label-caps text-on-surface uppercase mb-2">
          Skanvi
        </h3>
        <Link to="/browse" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Über uns
        </Link>
        <Link to="/browse" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Kuratierte Räume
        </Link>
        <Link to="/browse" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Nachhaltigkeit
        </Link>
        <Link to="/browse" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Kontakt & FAQ
        </Link>
      </div>

      {/* Col 4: Hilfe */}
      <div className="flex flex-col gap-3">
        <h3 className="font-label-caps text-label-caps text-on-surface uppercase mb-2">
          Hilfe
        </h3>
        <Link to="/browse" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Sendungsverfolgung
        </Link>
        <Link to="/browse" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Vertrag widerrufen
        </Link>
        <Link to="/browse" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Lieferzeiten
        </Link>
        <Link to="/browse" className="font-body-md text-body-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
          Retoure
        </Link>
      </div>

      {/* Bottom Row */}
      <div className="col-span-1 md:col-span-4 mt-12 pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body-md text-body-md text-[14px] text-secondary">
          © 2026 Skanvi Living. Editorial Minimalism for Slow Living.
        </p>
        <div className="flex gap-6">
          <Link to="/browse" className="font-body-md text-body-md text-[14px] text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
            Impressum
          </Link>
          <Link to="/browse" className="font-body-md text-body-md text-[14px] text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
            Datenschutz
          </Link>
          <Link to="/browse" className="font-body-md text-body-md text-[14px] text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
            AGB
          </Link>
        </div>
      </div>
    </footer>
  );
}
