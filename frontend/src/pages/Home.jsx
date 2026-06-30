import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <h1>LIVRAISON DE NUIT</h1>
        <h2>DE 20H À 5H</h2>
        <p>Burgers, wraps, plats, desserts et boissons livrés la nuit.</p>

        <div className="buttons">
          <Link to="/menu" className="btn">Voir le menu</Link>
          <Link to="/secteurs" className="btn secondary">Secteurs de livraison</Link>
        </div>
      </section>

      <section className="cards">
        <Link to="/menu" className="card">
          <img src="/images/accueil/menu.png" alt="Menu" />
          <h3>Nos produits</h3>
        </Link>

        <Link to="/secteurs" className="card">
          <img src="/images/secteurs/3 secteurs.png" alt="Livraison" />
          <h3>3 zones de livraison</h3>
        </Link>
      </section>
    </main>
  );
}

export default Home;