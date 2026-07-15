import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des produits"
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Produit introuvable"
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      message: "Identifiant produit invalide"
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      message: "Impossible de créer le produit",
      error: error.message
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Produit introuvable"
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      message: "Impossible de modifier le produit",
      error: error.message
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Produit introuvable"
      });
    }

    res.status(200).json({
      message: "Produit supprimé"
    });
  } catch (error) {
    res.status(400).json({
      message: "Impossible de supprimer le produit"
    });
  }
};