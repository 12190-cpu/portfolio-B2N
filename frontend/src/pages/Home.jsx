import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="badge">Burger2Nuit</p>

          <h1>LIVRAISON DE NUIT</h1>
          <h2>DE 20H À 5H</h2>

          <p>
            Burgers, wraps, plats, desserts et boissons livrés directement dans
            ton secteur.
          </p>

          <div className="buttons">
            <Link to="/menu" className="btn">
              Voir le menu
            </Link>

            <Link to="/secteurs" className="btn secondary">
              Trouver mon secteur
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section">
        <h2>Nos catégories</h2>

        <div className="category-home-grid">
          <Link to="/menu" className="home-category-card">
            <img src="/images/burgers/b2n.jpg" alt="Burgers" />
            <h3>Burgers</h3>
          </Link>

          <Link to="/menu" className="home-category-card">
            <img src="/images/wraps/crispy.jpg" alt="Wraps" />
            <h3>Wraps</h3>
          </Link>

          <Link to="/menu" className="home-category-card">
            <img src="/images/plats/pates-curry.png" alt="Plats" />
            <h3>Plats</h3>
          </Link>

          <Link to="/menu" className="home-category-card">
            <img src="/images/desserts/Tiramisu.png" alt="Desserts" />
            <h3>Desserts</h3>
          </Link>
        </div>
      </section>

      <section className="delivery-banner">
        <div>
          <h2>3 zones de livraison</h2>
            <img src="/images/secteurs/3 secteurs.png" />          
          <p>Nord IDF, Nord Est IDF et Ouest IDF.</p>
        </div>

        <Link to="/secteurs" className="btn">
          Voir les secteurs
        </Link>
      </section>
    </main>
  );
}

export default Home;