import { useEffect, useState } from "react";
import axios from "axios";

const categories = ["Tous", "Burgers", "Wraps", "Plats", "Desserts", "Boissons"];

function Menu() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
  axios
    .get("http://localhost:5001/api/products")
    .then((response) => {
      setProducts(response.data);
    })
    .catch((error) => {
      console.error("Erreur :", error);
    });
  }, []);

  const filteredProducts = products.filter((product) => {
    const searchText = `
      ${product.name}
      ${product.category}
      ${product.ingredients.join(" ")}
    `.toLowerCase();

    const matchesSearch = searchText.includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "Tous" || product.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const groupedProducts = categories
    .filter((category) => category !== "Tous")
    .map((category) => ({
      category,
      items: filteredProducts.filter((product) => product.category === category)
    }))
    .filter((group) => group.items.length > 0);

  return (
    <main className="page menu-page">
      <h1>Menu Burger2Nuit</h1>
      <p className="page-subtitle">
        Recherche ton produit par nom, catégorie ou ingrédient.
      </p>

      <input
        className="search"
        type="text"
        placeholder="Ex : poulet, burger, dessert, curry..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? "active" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {groupedProducts.length === 0 && (
        <p className="empty-message">Aucun produit trouvé.</p>
      )}

      {groupedProducts.map((group) => (
        <section className="menu-section" key={group.category}>
          <h2>{group.category}</h2>

          <div className="product-grid">
            {group.items.map((product, index) => (
              <article
                className="product-card"
                key={`${product.name}-${index}`}
                onClick={() => setSelectedProduct(product)}
              >
                <img src={product.image} alt={product.name} />

                <div>
                  <span>{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.ingredients.join(", ")}</p>
                  <strong>{product.price}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-modal"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>

            <img src={selectedProduct.image} alt={selectedProduct.name} />

            <h2>{selectedProduct.name}</h2>
            <p className="modal-category">{selectedProduct.category}</p>

            <ul>
              {selectedProduct.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>

            <strong>{selectedProduct.price}</strong>

            <a
              className="order-btn"
              href="https://wa.me/33600000000"
              target="_blank"
            >
              Commander sur WhatsApp
            </a>
          </div>
        </div>
      )}
    </main>
  );
}

export default Menu;