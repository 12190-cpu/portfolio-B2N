import { Link } from 'react-router-dom';
const cards = ['Burgers','Wraps','Plats','Desserts','Boissons'];
export default function Home() {
  return <section className="home">
    <div className="hero">
      <div>
        <p className="eyebrow">Burger2Nuit</p>
        <h1>LIVRAISON DE NUIT<br/><span>DE 20H À 5H</span></h1>
        <p>Menu gourmand, secteurs IDF et commande directe par WhatsApp, Snapchat ou téléphone.</p>
        <div className="actions"><Link className="btn" to="/menu">Voir le menu</Link><Link className="btn secondary" to="/secteurs">Secteurs de livraison</Link></div>
      </div>
      <div className="hero-card">🍔<strong>Faim de nuit ?</strong><small>Commande en 2 clics</small></div>
    </div>
    <h2>Nos produits</h2>
    <div className="grid five">{cards.map(c => <Link key={c} to="/menu" className="category-card"><div className="fake-img">{c === 'Boissons' ? '🥤' : c === 'Desserts' ? '🍰' : '🍔'}</div><strong>{c}</strong></Link>)}</div>
    <Link to="/secteurs" className="delivery-banner"><span>🗺️</span><div><h2>3 zones de livraison</h2><p>Nord IDF, Nord Est IDF et Ouest IDF</p></div></Link>
  </section>;
}
