import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const adminUsername = process.env.ADMIN_USERNAME || 'admin';
const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

export async function login(req, res) {
  const { username, password } = req.body;
  const passwordOk = username === adminUsername && password === adminPassword;
  if (!passwordOk) return res.status(401).json({ message: 'Identifiants incorrects' });
  const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '8h' });
  res.json({ token, username });
}

export function logout(_req, res) {
  res.json({ message: 'Déconnexion réussie' });
}
