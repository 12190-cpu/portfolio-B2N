import express from "express";
import { protect } from "../middleware/auth.middleware.js";

import {

    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct

} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;