import { useEffect, useMemo, useState } from 'react';
import { api } from '../api';
const categories = ['Burgers','Wraps','Plats','Desserts','Boissons'];
export default function Menu() {
  const [products, setProducts] = useState([]); const [query, setQuery] = useState('');
  useEffect(() => { api.get('/products').then(r => setProducts(r.data)); }, []);
  const filtered = useMemo(() => products.filter(p => [p.name,p.category,p.description,(p.tags||[]).join(' ')].join(' ').toLowerCase().includes(query.toLowerCase())), [products, query]);
  return <section><div className="page-title"><h1>Menu Burger2Nuit</h1><input placeholder="Rechercher : poulet, burger, dessert..." value={query} onChange={e => setQuery(e.target.value)} /></div>
    {categories.map(cat => { const items = filtered.filter(p => p.category === cat); if (!items.length) return null; return <div key={cat} className="menu-section"><h2>{cat}</h2><div className="grid">{items.map(p => <article className="product-card" key={p.id}><img src={p.image} alt={p.name}/><div><h3>{p.name}</h3><p>{p.description}</p><strong>{p.price.toFixed(2).replace('.', ',')} €</strong></div></article>)}</div></div> })}
    {!filtered.length && <p className="empty">Aucun produit trouvé.</p>}
  </section>;
}
