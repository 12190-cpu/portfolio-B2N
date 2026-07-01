import { useState } from "react";

const products = [
  {
    name: "B2N",
    category: "Burgers",
    price: "8,00 €",
    image: "/images/burgers/b2n.jpg",
    ingredients: [
      "Pain brioché",
      "Double Cheddar",
      "Steak façon Bouchère",
      "Filet de Poulet frais",
      "Sauce maison"
    ]
  },
  {
    name: "Giant",
    category: "Burgers",
    price: "7,00 €",
    image: "/images/burgers/giant.jpg",
    ingredients: [
      "Pain burger",
      "Double Cheddar",
      "Double Steak 90g",
      "Cornichons",
      "Sauce Giant"
    ]
  },
  {
    name: "Chicken",
    category: "Burgers",
    price: "7,00 €",
    image: "/images/burgers/chicken.jpg",
    ingredients: [
      "Pain burger",
      "Filet de Poulet",
      "Cheddar",
      "Mayonnaise"
    ]
  },
  {
    name: "Black Beef",
    category: "Burgers",
    price: "8,00 €",
    image: "/images/burgers/black-beef.jpg",
    ingredients: [
      "Pain Black",
      "Steak façon Bouchère",
      "Bacon",
      "Double Vache Qui Rit",
      "Sauce Barbecue / Tabasco"
    ]
  },

  {
    name: "Tender Extra Crispy",
    category: "Wraps",
    price: "8,00 €",
    image: "/images/wraps/crispy.jpg",
    ingredients: [
      "Pain Pita",
      "Tenders de poulet",
      "Double Cheddar",
      "Crispy Onions",
      "Sauce Maison"
    ]
  },
  {
    name: "Tender Chicken Curry",
    category: "Wraps",
    price: "7,00 €",
    image: "/images/wraps/curry.jpg",
    ingredients: [
      "Pain Pita",
      "Poulet",
      "Double Cheddar",
      "Sauce Curry"
    ]
  },
  {
    name: "Tender Kebab",
    category: "Wraps",
    price: "8,00 €",
    image: "/images/wraps/kebab.jpg",
    ingredients: [
      "Pain Pita",
      "Kebab",
      "Double Cheddar",
      "Sauce Blanche"
    ]
  },

  {
    name: "Pâtes Curry",
    category: "Plats",
    price: "7,00 €",
    image: "/images/plats/pates-curry.png",
    ingredients: ["Penne", "Sauce Curry", "Poulet"]
  },
  {
    name: "Pâtes Boursin",
    category: "Plats",
    price: "7,00 €",
    image: "/images/plats/pates-boursin.png",
    ingredients: ["Penne", "Sauce Boursin", "Poulet"]
  },
  {
    name: "Pâtes Carbonara",
    category: "Plats",
    price: "7,00 €",
    image: "/images/plats/carbonara.png",
    ingredients: ["Penne", "Sauce Crème Maison", "Lardons"]
  },
  {
    name: "Thieb",
    category: "Plats",
    price: "8,00 €",
    image: "/images/plats/thieb.png",
    ingredients: ["Riz rouge", "Légumes", "Poulet"]
  },
  {
    name: "Gratin Dauphinois",
    category: "Plats",
    price: "8,00 €",
    image: "/images/plats/gratin.png",
    ingredients: ["Pommes de terre", "Crème fraîche", "Lardons"]
  },

  {
    name: "Tiramisu",
    category: "Desserts",
    price: "3,00 €",
    image: "/images/desserts/Tiramisu.png",
    ingredients: [
      "Framboise",
      "Oreo",
      "Nutella",
      "Daim",
      "Caramel Speculoos"
    ]
  },
  {
    name: "Cheesecake",
    category: "Desserts",
    price: "4,00 €",
    image: "/images/desserts/Cheesecake.png",
    ingredients: [
      "Oreo",
      "Mangue Passion",
      "Ananas Coco",
      "Framboise"
    ]
  },

  {
    name: "Coca Cola, Oasis, Fanta, Sprite, Ice Tea, Schweppes, Perrier...",
    category: "Boissons",
    price: "2,00 €",
    image: "/images/boissons/boissons.png",
    ingredients: ["Large choix de boissons fraîches"]
  }
];

const categories = ["Tous", "Burgers", "Wraps", "Plats", "Desserts", "Boissons"];

function Menu() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedProduct, setSelectedProduct] = useState(null);

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