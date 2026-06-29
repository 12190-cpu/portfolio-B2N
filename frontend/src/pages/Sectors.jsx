import { useEffect, useMemo, useState } from 'react';
import { api } from '../api';
export default function Sectors() {
  const [sectors, setSectors] = useState([]); const [query, setQuery] = useState('');
  useEffect(() => { api.get('/sectors').then(r => setSectors(r.data)); }, []);
  const filtered = useMemo(() => sectors.filter(s => [s.name, ...(s.cities||[])].join(' ').toLowerCase().includes(query.toLowerCase())), [sectors, query]);
  return <section><div className="page-title"><h1>Secteurs de livraison</h1><input placeholder="Tape ta ville : Roissy, Clichy, Cergy..." value={query} onChange={e => setQuery(e.target.value)} /></div>
    <div className="grid">{filtered.map(s => <article className="sector-card" key={s.id}><img src={s.image} alt={s.name}/><h2>{s.name}</h2><p>{s.cities.join(', ')}</p><div className="actions"><a className="btn" href={`https://wa.me/${s.whatsapp}`}>WhatsApp</a><a className="btn snap" href={`https://www.snapchat.com/add/${s.snapchat}`}>Snapchat</a><a className="btn secondary" href={`tel:${s.phone}`}>Téléphone</a></div></article>)}</div>
  </section>;
}
