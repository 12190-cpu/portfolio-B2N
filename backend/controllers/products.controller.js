import products from "../data/products.js";

/*
=========================
GET ALL PRODUCTS
=========================
*/
export const getProducts = (req, res) => {
  res.status(200).json(products);
};

/*
=========================
GET PRODUCT BY ID
=========================
*/
export const getProductById = (req, res) => {

  const id = Number(req.params.id);

  const product = products.find(
    product => product.id === id
  );

  if (!product) {

    return res.status(404).json({
      message: "Produit introuvable"
    });

  }

  res.status(200).json(product);

};

/*
=========================
CREATE PRODUCT
=========================
*/
export const createProduct = (req, res) => {

  const newProduct = req.body;

  newProduct.id = products.length + 1;

  products.push(newProduct);

  res.status(201).json(newProduct);

};

/*
=========================
UPDATE PRODUCT
=========================
*/
export const updateProduct = (req, res) => {

  const id = Number(req.params.id);

  const product = products.find(
    product => product.id === id
  );

  if (!product) {

    return res.status(404).json({
      message: "Produit introuvable"
    });

  }

  Object.assign(product, req.body);

  res.json(product);

};

/*
=========================
DELETE PRODUCT
=========================
*/
export const deleteProduct = (req, res) => {

  const id = Number(req.params.id);

  const index = products.findIndex(
    product => product.id === id
  );

  if (index === -1) {

    return res.status(404).json({
      message: "Produit introuvable"
    });

  }

  products.splice(index, 1);

  res.json({
    message: "Produit supprimé"
  });

};