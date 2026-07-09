import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001/api";

const emptyProductForm = {
  name: "",
  category: "Burgers",
  price: "",
  image: "",
  ingredients: ""
};

const emptySectorForm = {
  name: "",
  image: "",
  cities: "",
  whatsapp: "",
  snapchat: "",
  phone: ""
};

function Admin() {
  const [products, setProducts] = useState([]);
  const [sectors, setSectors] = useState([]);

  const [productForm, setProductForm] = useState(emptyProductForm);
  const [sectorForm, setSectorForm] = useState(emptySectorForm);

  const [editingProductId, setEditingProductId] = useState(null);
  const [editingSectorId, setEditingSectorId] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchSectors();
  }, []);

  function fetchProducts() {
    axios
      .get(`${API_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Erreur produits :", err));
  }

  function fetchSectors() {
    axios
      .get(`${API_URL}/sectors`)
      .then((res) => setSectors(res.data))
      .catch((err) => console.error("Erreur secteurs :", err));
  }

  function handleProductChange(e) {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value
    });
  }

  function handleSectorChange(e) {
    setSectorForm({
      ...sectorForm,
      [e.target.name]: e.target.value
    });
  }

  function submitProduct(e) {
    e.preventDefault();

    const productData = {
      ...productForm,
      ingredients: productForm.ingredients
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    };

    if (editingProductId) {
      axios
        .put(`${API_URL}/products/${editingProductId}`, productData)
        .then(() => {
          fetchProducts();
          resetProductForm();
        });
    } else {
      axios.post(`${API_URL}/products`, productData).then(() => {
        fetchProducts();
        resetProductForm();
      });
    }
  }

  function submitSector(e) {
    e.preventDefault();

    const sectorData = {
      ...sectorForm,
      cities: sectorForm.cities
        .split(",")
        .map((city) => city.trim())
        .filter(Boolean)
    };

    if (editingSectorId) {
      axios
        .put(`${API_URL}/sectors/${editingSectorId}`, sectorData)
        .then(() => {
          fetchSectors();
          resetSectorForm();
        });
    } else {
      axios.post(`${API_URL}/sectors`, sectorData).then(() => {
        fetchSectors();
        resetSectorForm();
      });
    }
  }

  function editProduct(product) {
    setEditingProductId(product.id);
    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      ingredients: product.ingredients.join(", ")
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function editSector(sector) {
    setEditingSectorId(sector.id);
    setSectorForm({
      name: sector.name,
      image: sector.image,
      cities: sector.cities.join(", "),
      whatsapp: sector.whatsapp,
      snapchat: sector.snapchat,
      phone: sector.phone
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function deleteProduct(id) {
    if (!confirm("Supprimer ce produit ?")) return;

    axios.delete(`${API_URL}/products/${id}`).then(() => {
      fetchProducts();
    });
  }

  function deleteSector(id) {
    if (!confirm("Supprimer ce secteur ?")) return;

    axios.delete(`${API_URL}/sectors/${id}`).then(() => {
      fetchSectors();
    });
  }

  function resetProductForm() {
    setProductForm(emptyProductForm);
    setEditingProductId(null);
  }

  function resetSectorForm() {
    setSectorForm(emptySectorForm);
    setEditingSectorId(null);
  }

  return (
    <main className="page admin-page">
      <h1>Dashboard Admin</h1>
      <p className="page-subtitle">
        Gestion complète du menu et des secteurs de livraison.
      </p>

      <section className="stats-grid">
        <div className="stat-card">
          <span>{products.length}</span>
          <p>Produits</p>
        </div>

        <div className="stat-card">
          <span>{sectors.length}</span>
          <p>Secteurs</p>
        </div>
      </section>

      <section className="admin-box">
        <h2>{editingProductId ? "Modifier un produit" : "Ajouter un produit"}</h2>

        <form className="admin-form" onSubmit={submitProduct}>
          <input
            name="name"
            placeholder="Nom du produit"
            value={productForm.name}
            onChange={handleProductChange}
            required
          />

          <select
            name="category"
            value={productForm.category}
            onChange={handleProductChange}
          >
            <option value="Burgers">Burgers</option>
            <option value="Wraps">Wraps</option>
            <option value="Plats">Plats</option>
            <option value="Desserts">Desserts</option>
            <option value="Boissons">Boissons</option>
          </select>

          <input
            name="price"
            placeholder="Prix : 8,00 €"
            value={productForm.price}
            onChange={handleProductChange}
            required
          />

          <input
            name="image"
            placeholder="/images/burgers/b2n.jpg"
            value={productForm.image}
            onChange={handleProductChange}
            required
          />

          <textarea
            name="ingredients"
            placeholder="Ingrédients séparés par des virgules"
            value={productForm.ingredients}
            onChange={handleProductChange}
            required
          />

          <button type="submit">
            {editingProductId ? "Modifier le produit" : "Ajouter le produit"}
          </button>

          {editingProductId && (
            <button type="button" className="cancel-btn" onClick={resetProductForm}>
              Annuler
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

              <button className="edit-btn" onClick={() => editProduct(product)}>
                Modifier
              </button>

              <button className="delete-btn" onClick={() => deleteProduct(product.id)}>
                Supprimer
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="admin-box">
        <h2>{editingSectorId ? "Modifier un secteur" : "Ajouter un secteur"}</h2>

        <form className="admin-form" onSubmit={submitSector}>
          <input
            name="name"
            placeholder="Nom du secteur"
            value={sectorForm.name}
            onChange={handleSectorChange}
            required
          />

          <input
            name="image"
            placeholder="/images/secteurs/nord.jpg"
            value={sectorForm.image}
            onChange={handleSectorChange}
            required
          />

          <textarea
            name="cities"
            placeholder="Villes séparées par des virgules"
            value={sectorForm.cities}
            onChange={handleSectorChange}
            required
          />

          <input
            name="whatsapp"
            placeholder="Lien WhatsApp"
            value={sectorForm.whatsapp}
            onChange={handleSectorChange}
            required
          />

          <input
            name="snapchat"
            placeholder="Lien Snapchat"
            value={sectorForm.snapchat}
            onChange={handleSectorChange}
            required
          />

          <input
            name="phone"
            placeholder="tel:+33600000000"
            value={sectorForm.phone}
            onChange={handleSectorChange}
            required
          />

          <button type="submit">
            {editingSectorId ? "Modifier le secteur" : "Ajouter le secteur"}
          </button>

          {editingSectorId && (
            <button type="button" className="cancel-btn" onClick={resetSectorForm}>
              Annuler
            </button>
          )}
        </form>
      </section>

      <section className="admin-box">
        <h2>Secteurs existants</h2>

        <div className="admin-list">
          {sectors.map((sector) => (
            <article className="admin-item" key={sector.id}>
              <img src={sector.image} alt={sector.name} />

              <div>
                <h3>{sector.name}</h3>
                <p>{sector.cities.length} villes</p>
                <strong>{sector.cities.slice(0, 4).join(", ")}</strong>
              </div>

              <button className="edit-btn" onClick={() => editSector(sector)}>
                Modifier
              </button>

              <button className="delete-btn" onClick={() => deleteSector(sector.id)}>
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