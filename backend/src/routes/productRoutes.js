import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { authRequired } from '../middleware/auth.js';
const router = express.Router();
router.get('/', getProducts);
router.post('/', authRequired, createProduct);
router.put('/:id', authRequired, updateProduct);
router.delete('/:id', authRequired, deleteProduct);
export default router;
