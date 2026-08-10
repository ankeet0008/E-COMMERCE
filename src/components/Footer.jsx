import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div>
            <div className="footer__brand">The General Store</div>
            <p className="footer__desc">
              A curated shop stocking the things worth having. Hardware, kitchen,
              stationery, apothecary, textiles, outdoor — everything under one roof.
            </p>
          </div>
          <div>
            <div className="footer__heading">Departments</div>
            <Link to="/browse?category=Hardware" className="footer__link">Hardware</Link>
            <Link to="/browse?category=Kitchen" className="footer__link">Kitchen</Link>
            <Link to="/browse?category=Stationery" className="footer__link">Stationery</Link>
            <Link to="/browse?category=Apothecary" className="footer__link">Apothecary</Link>
            <Link to="/browse?category=Textiles" className="footer__link">Textiles</Link>
            <Link to="/browse?category=Outdoor" className="footer__link">Outdoor</Link>
          </div>
          <div>
            <div className="footer__heading">Store</div>
            <Link to="/browse" className="footer__link">Browse all</Link>
            <Link to="/cart" className="footer__link">Your bag</Link>
          </div>
          <div>
            <div className="footer__heading">Info</div>
            <span className="footer__link">Shipping</span>
            <span className="footer__link">Returns</span>
            <span className="footer__link">Privacy</span>
          </div>
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">© 2026 The General Store. All rights reserved.</span>
          <span className="footer__copy">Built with care, stocked with purpose.</span>
        </div>
      </div>
    </footer>
  );
}
