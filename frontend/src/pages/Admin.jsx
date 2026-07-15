import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import productService from "../services/product.service";
import sectorService from "../services/sector.service";
import authService from "../services/auth.service";
import uploadService from "../services/upload.service";

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
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [sectors, setSectors] = useState([]);

  const [productForm, setProductForm] = useState(emptyProductForm);
  const [sectorForm, setSectorForm] = useState(emptySectorForm);

  const [editingProductId, setEditingProductId] = useState(null);
  const [editingSectorId, setEditingSectorId] = useState(null);

  const [productImageFile, setProductImageFile] = useState(null);
  const [sectorImageFile, setSectorImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchSectors();
  }, []);

  function fetchProducts() {
    productService
      .getAll()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Erreur produits :", err));
  }

  function fetchSectors() {
    sectorService
      .getAll()
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
  
  async function submitProduct(e) {
    e.preventDefault();

    setUploading(true);

    try {
     let imagePath = productForm.image;

      if (productImageFile) {
        const uploadResponse = await uploadService.uploadImage(productImageFile);
        imagePath = uploadResponse.data.imageUrl;
      }

      const productData = {
       ...productForm,
        image: imagePath,
        ingredients: productForm.ingredients
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      };

      if (editingProductId) {
        await productService.update(editingProductId, productData);
      } else {
        await productService.create(productData);
      }

     fetchProducts();
     resetProductForm();

   } catch (error) {
    console.error(error);
   } finally {
    setUploading(false);
   }
  }

  async function submitSector(e) {
    e.preventDefault();

    setUploading(true);

    try {
      let imagePath = sectorForm.image;

      if (sectorImageFile) {
        const uploadResponse = await uploadService.uploadImage(sectorImageFile);
        imagePath = uploadResponse.data.imageUrl;
      }

      const sectorData = {
        ...sectorForm,
        image: imagePath,
        cities: sectorForm.cities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      };

      if (editingSectorId) {
        await sectorService.update(editingSectorId, sectorData);
      } else {
        await sectorService.create(sectorData);
      }

      fetchSectors();
      resetSectorForm();
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
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
  if (!window.confirm("Supprimer ce produit ?")) {
    return;
  }

  productService
    .remove(id)
    .then(() => {
      fetchProducts();
    })
    .catch((error) => {
      console.error("Erreur suppression produit :", error);
    });
  }

  function deleteSector(id) {
    if (!window.confirm("Supprimer ce secteur ?")) {
      return;
    }

    sectorService
      .remove(id)
      .then(() => {
        fetchSectors();
      })
      .catch((error) => {
        console.error("Erreur suppression secteur :", error);
      });
  }

  function resetProductForm() {
    setProductForm(emptyProductForm);
    setEditingProductId(null);
    setProductImageFile(null);
  }

  function resetSectorForm() {
    setSectorForm(emptySectorForm);
    setEditingSectorId(null);
    setSectorImageFile(null);
  }

  function handleLogout() {
    authService.logout();
    navigate("/login");
  }

  return (
    <main className="page admin-page">
      <h1>Dashboard Admin</h1>
      <p className="page-subtitle">
        Gestion complète du menu et des secteurs de livraison.
      </p>
      <button className="logout-btn" onClick={handleLogout}>
        Se déconnecter
      </button>

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
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => {
              setProductImageFile(e.target.files?.[0] || null);
            }}
          />

          {productForm.image && (
            <img
              className="admin-image-preview"
              src={
                productForm.image.startsWith("/uploads/")
                  ? `http://localhost:5001${productForm.image}`
                  : productForm.image
                }
                alt="Aperçu du produit"
              />
            )}

          <textarea
            name="ingredients"
            placeholder="Ingrédients séparés par des virgules"
            value={productForm.ingredients}
            onChange={handleProductChange}
            required
          />

          <button type="submit" disabled={uploading}>
            {uploading
              ? "Envoi en cours..." 
              : editingProductId 
                ? "Modifier le produit" 
                : "Ajouter le produit"}
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
              <img 
                src={
                  product.image.startsWith("/uploads/")
                    ? `http://localhost:5001${product.image}`
                    : product.image
                }
                alt={product.name}
              />

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
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => {
              setSectorImageFile(e.target.files?.[0] || null);
            }}
          />
          
          {sectorForm.image && (
            <img
              className="admin-image-preview"
              src={
                sectorForm.image.startsWith("/uploads/")
                  ? `http://localhost:5001${sectorForm.image}`
                  : sectorForm.image
                }
                alt="Aperçu du secteur"
              />
            )}

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

          <button type="submit" disabled={uploading}>
            {uploading 
            ? "Envoi en cours..." 
            : editingSectorId 
              ? "Modifier le secteur" 
              : "Ajouter le secteur"}
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
              <img
                src={
                  sector.image.startsWith("/uploads/")
                    ? `http://localhost:5001${sector.image}`
                    : sector.image
                }
                alt={sector.name}
              />

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