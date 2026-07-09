import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "Burgers",
    price: "",
    image: "",
    ingredients: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    axios
      .get("http://localhost:5001/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Erreur chargement produits :", error);
      });
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

function handleSubmit(e) {
  e.preventDefault();

  const productData = {
    ...form,
    ingredients: form.ingredients.split(",").map((item) => item.trim())
  };

  if (editingId) {
    axios
      .put(`http://localhost:5001/api/products/${editingId}`, productData)
      .then(() => {
        fetchProducts();
        resetForm();
      })
      .catch((error) => {
        console.error("Erreur modification produit :", error);
      });
  } else {
    axios
      .post("http://localhost:5001/api/products", productData)
      .then(() => {
        fetchProducts();
        resetForm();
      })
      .catch((error) => {
        console.error("Erreur ajout produit :", error);
      });
  }
}

function resetForm() {
  setForm({
    name: "",
    category: "Burgers",
    price: "",
    image: "",
    ingredients: ""
  });

  setEditingId(null);
}

  function deleteProduct(id) {
    axios
      .delete(`http://localhost:5001/api/products/${id}`)
      .then(() => {
        fetchProducts();
      })
      .catch((error) => {
        console.error("Erreur suppression produit :", error);
      });
  }

function editProduct(product) {
  setEditingId(product.id);

  setForm({
    name: product.name,
    category: product.category,
    price: product.price,
    image: product.image,
    ingredients: product.ingredients.join(", ")
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

  return (
    <main className="page admin-page">
      <h1>Dashboard Admin</h1>
      <p className="page-subtitle">
        Gestion des produits Burger2Nuit depuis le backend Express.
      </p>

      <section className="admin-box">
        <h2>Ajouter un produit</h2>

        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nom du produit"
            value={form.name}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="Burgers">Burgers</option>
            <option value="Wraps">Wraps</option>
            <option value="Plats">Plats</option>
            <option value="Desserts">Desserts</option>
            <option value="Boissons">Boissons</option>
          </select>

          <input
            type="text"
            name="price"
            placeholder="Prix : 8,00 €"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="/images/burgers/b2n.jpg"
            value={form.image}
            onChange={handleChange}
            required
          />

          <textarea
            name="ingredients"
            placeholder="Ingrédients séparés par des virgules"
            value={form.ingredients}
            onChange={handleChange}
            required
          />

          <button type="submit">
  {editingId ? "Modifier le produit" : "Ajouter le produit"}
</button>

{editingId && (
  <button type="button" className="cancel-btn" onClick={resetForm}>
    Annuler la modification
  </button>
  )}
        </form>
      </section>

      <section className="admin-box">
        <h2>Produits existants</h2>

        <div className="admin-list">
          {products.map((product) => (
            <article className="admin-item" key={product.id}>
              <img src={product.image} alt={product.name} />

              <div>
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <strong>{product.price}</strong>
              </div>

              <button
                className="edit-btn"
               onClick={() => editProduct(product)}
              >
                Modifier
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteProduct(product.id)}
              >
                Supprimer
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Admin;