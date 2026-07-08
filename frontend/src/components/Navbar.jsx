import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <img
          src="/images/logo/LOGO.png"
          alt="Burger2Nuit"
          className="logo"
        />
      </Link>

      <div className="nav-links">
        <Link to="/">Accueil</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/secteurs">Secteurs</Link>
        <Link to="/login">Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;