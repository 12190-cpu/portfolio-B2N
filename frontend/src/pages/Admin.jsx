import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
const emptyProduct = { name:'', category:'Burgers', description:'', price:0, image:'/images/placeholder-burger.svg', tags:[] };
export default function Admin() {
  const [products, setProducts] = useState([]); const [sectors, setSectors] = useState([]); const [product, setProduct] = useState(emptyProduct); const navigate = useNavigate();
  const load = () => { api.get('/products').then(r=>setProducts(r.data)); api.get('/sectors').then(r=>setSectors(r.data)); };
  useEffect(load, []);
  async function saveProduct(e) { e.preventDefault(); await api.post('/products', {...product, tags: product.description.split(',').map(t=>t.trim())}); setProduct(emptyProduct); load(); }
  async function removeProduct(id) { await api.delete('/products/'+id); load(); }
  async function removeSector(id) { await api.delete('/sectors/'+id); load(); }
  function logout(){ localStorage.removeItem('b2n_token'); navigate('/'); }
  return <section><div className="page-title"><h1>Dashboard Admin</h1><button className="btn secondary" onClick={logout}>Déconnexion</button></div>
    <div className="admin-grid"><form className="panel" onSubmit={saveProduct}><h2>Ajouter un produit</h2><input placeholder="Nom" value={product.name} onChange={e=>setProduct({...product,name:e.target.value})}/><select value={product.category} onChange={e=>setProduct({...product,category:e.target.value})}>{['Burgers','Wraps','Plats','Desserts','Boissons'].map(c=><option key={c}>{c}</option>)}</select><textarea placeholder="Description" value={product.description} onChange={e=>setProduct({...product,description:e.target.value})}/><input type="number" step="0.01" placeholder="Prix" value={product.price} onChange={e=>setProduct({...product,price:e.target.value})}/><input placeholder="URL image" value={product.image} onChange={e=>setProduct({...product,image:e.target.value})}/><button className="btn">Ajouter</button></form>
    <div className="panel"><h2>Produits</h2>{products.map(p=><div className="admin-row" key={p.id}><span>{p.name} — {p.price} €</span><button onClick={()=>removeProduct(p.id)}>Supprimer</button></div>)}</div>
    <div className="panel"><h2>Secteurs</h2>{sectors.map(s=><div className="admin-row" key={s.id}><span>{s.name}</span><button onClick={()=>removeSector(s.id)}>Supprimer</button></div>)}</div></div>
  </section>;
}
