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

router.post("/", (req, res) => {
  const product = req.body;

  product.id = products.length + 1;

  products.push(product);

  res.status(201).json(product);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Produit introuvable"
    });
  }

  products.splice(index, 1);

  res.json({
    message: "Produit supprimé"
  });
});

router.put("/:id", (req, res) => {

  const id = Number(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {

    return res.status(404).json({
      message: "Produit introuvable"
    });

  }

  Object.assign(product, req.body);

  res.json(product);

});

export default router;