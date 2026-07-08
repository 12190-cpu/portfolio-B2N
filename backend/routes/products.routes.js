import express from "express";
import products from "../data/products.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(products);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({ message: "Produit introuvable" });
  }

  res.json(product);
});

export default router;