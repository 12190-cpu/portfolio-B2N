import express from 'express';
import { getSectors, createSector, updateSector, deleteSector } from '../controllers/sectorController.js';
import { authRequired } from '../middleware/auth.js';
const router = express.Router();
router.get('/', getSectors);
router.post('/', authRequired, createSector);
router.put('/:id', authRequired, updateSector);
router.delete('/:id', authRequired, deleteSector);
export default router;
