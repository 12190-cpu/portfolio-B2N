import { v4 as uuid } from 'uuid';
import { readDb, writeDb } from '../utils/db.js';

export async function getProducts(req, res) {
  const db = await readDb();
  res.json(db.products);
}
export async function createProduct(req, res) {
  const db = await readDb();
  const product = { id: uuid(), ...req.body, price: Number(req.body.price), image: req.body.image || '/images/placeholder-burger.svg', tags: req.body.tags || [] };
  db.products.push(product);
  await writeDb(db);
  res.status(201).json(product);
}
export async function updateProduct(req, res) {
  const db = await readDb();
  const index = db.products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Produit introuvable' });
  db.products[index] = { ...db.products[index], ...req.body, price: Number(req.body.price ?? db.products[index].price) };
  await writeDb(db);
  res.json(db.products[index]);
}
export async function deleteProduct(req, res) {
  const db = await readDb();
  db.products = db.products.filter(p => p.id !== req.params.id);
  await writeDb(db);
  res.json({ message: 'Produit supprimé' });
}
