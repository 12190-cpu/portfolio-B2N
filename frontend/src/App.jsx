import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Sectors from "./pages/Sectors";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

function App() {
  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <img src="/images/logo/LOGO.png" alt="Burger2Nuit" className="logo" />
        </Link>

        <div>
          <Link to="/">Accueil</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/secteurs">Secteurs</Link>
          <Link to="/login">Admin</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/secteurs" element={<Sectors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      <footer>
        <p>© 2026 Burger2Nuit - Livraison de nuit de 20h à 5h</p>
      </footer>
    </>
  );
}

export default App;