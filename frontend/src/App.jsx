import { NavLink, Outlet } from 'react-router-dom';
export default function App() {
  return <>
    <header className="header">
      <NavLink to="/" className="logo"><span>B2N</span> Burger2Nuit</NavLink>
      <nav>
        <NavLink to="/">Accueil</NavLink><NavLink to="/menu">Menu</NavLink><NavLink to="/secteurs">Secteurs</NavLink><NavLink to="/login">Admin</NavLink>
      </nav>
    </header>
    <main><Outlet /></main>
    <footer>© Burger2Nuit — Livraison de nuit de 20h à 5h</footer>
  </>;
}
