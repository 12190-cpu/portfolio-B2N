import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
export default function Login() {
  const [form, setForm] = useState({ username: 'admin', password: 'admin123' });
  const [error, setError] = useState(''); const navigate = useNavigate();
  async function submit(e) { e.preventDefault(); setError(''); try { const res = await api.post('/auth/login', form); localStorage.setItem('b2n_token', res.data.token); navigate('/admin'); } catch { setError('Identifiants incorrects'); } }
  return <section className="login"><form onSubmit={submit} className="panel"><h1>Connexion Admin</h1><input value={form.username} onChange={e=>setForm({...form,username:e.target.value})} placeholder="Identifiant"/><input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Mot de passe"/><button className="btn">Se connecter</button>{error && <p className="error">{error}</p>}<small>Démo : admin / admin123</small></form></section>;
}
