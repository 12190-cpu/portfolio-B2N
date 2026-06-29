import { v4 as uuid } from 'uuid';
import { readDb, writeDb } from '../utils/db.js';

export async function getSectors(_req, res) {
  const db = await readDb();
  res.json(db.sectors);
}
export async function createSector(req, res) {
  const db = await readDb();
  const sector = { id: uuid(), ...req.body, cities: req.body.cities || [], image: req.body.image || '/images/placeholder-map.svg' };
  db.sectors.push(sector);
  await writeDb(db);
  res.status(201).json(sector);
}
export async function updateSector(req, res) {
  const db = await readDb();
  const index = db.sectors.findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Secteur introuvable' });
  db.sectors[index] = { ...db.sectors[index], ...req.body };
  await writeDb(db);
  res.json(db.sectors[index]);
}
export async function deleteSector(req, res) {
  const db = await readDb();
  db.sectors = db.sectors.filter(s => s.id !== req.params.id);
  await writeDb(db);
  res.json({ message: 'Secteur supprimé' });
}
