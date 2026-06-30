import { useState } from "react";

const products = [
  {
    name: "B2N",
    category: "Burgers",
    price: "8,00 €",
    image: "/images/burgers/b2n.jpg",
    ingredients: "Pain brioché, Double Cheddar, Steak façon Bouchère, Filet de Poulet frais, Sauce maison"
  },
  {
    name: "Giant",
    category: "Burgers",
    price: "7,00 €",
    image: "/images/burgers/giant.jpg",
    ingredients: "Pain burger, Double Cheddar, Double Steak 90g, Cornichons, Sauce Giant"
  },
  {
    name: "Chicken",
    category: "Burgers",
    price: "7,00 €",
    image: "/images/burgers/chicken.jpg",
    ingredients: "Pain burger, Filet de Poulet, Cheddar, Mayonnaise"
  },
  {
    name: "Black Beef",
    category: "Burgers",
    price: "8,00 €",
    image: "/images/burgers/black-beef.jpg",
    ingredients: "Pain Black, Steak façon Bouchère, Bacon, Double Vache Qui Rit, Sauce Barbecue / Tabasco"
  },
  {
    name: "Tender Extra Crispy",
    category: "Wraps",
    price: "8,00 €",
    image: "/images/wraps/crispy.jpg",
    ingredients: "Pain Pita, Tenders, Double Cheddar, Crispy Onions, Sauce Maison"
  },
  {
    name: "Tender Chicken Curry",
    category: "Wraps",
    price: "7,00 €",
    image: "/images/wraps/curry.jpg",
    ingredients: "Pain Pita, Chicken, Double Cheddar, Sauce Curry"
  },
  {
    name: "Tender Kebab",
    category: "Wraps",
    price: "8,00 €",
    image: "/images/wraps/kebab.jpg",
    ingredients: "Pain Pita, Kebab, Double Cheddar, Sauce Blanche"
  },
  {
    name: "Pâtes Curry",
    category: "Plats",
    price: "7,00 €",
    image: "/images/plats/Penne curry.png",
    ingredients: "Penne, Sauce Curry, Poulet"
  },
  {
    name: "Pâtes Boursin",
    category: "Plats",
    price: "7,00 €",
    image: "/images/plats/Penne boursin.png",
    ingredients: "Penne, Sauce Boursin, Poulet"
  },
  {
    name: "Pâtes Carbonara",
    category: "Plats",
    price: "7,00 €",
    image: "/images/plats/Penne carbo.png",
    ingredients: "Penne, Sauce Crème Maison, Lardons"
  },
  {
    name: "Thieb",
    category: "Plats",
    price: "8,00 €",
    image: "/images/plats/Thieb.png",
    ingredients: "Riz rouge, Légumes, Poulet"
  },
  {
    name: "Gratin Dauphinois",
    category: "Plats",
    price: "8,00 €",
    image: "/images/plats/Gratin.png",
    ingredients: "Pommes de terre, Crème fraîche, Lardons"
  },
  {
    name: "Tiramisu",
    category: "Desserts",
    price: "3,00 €",
    image: "/images/desserts/Tiramisu.png",
    ingredients: "Framboise, Oreo, Nutella, Daim, Caramel Speculoos"
  },
  {
    name: "Cheesecake",
    category: "Desserts",
    price: "4,00 €",
    image: "/images/desserts/Cheesecake.png",
    ingredients: "Oreo, Mangue Passion, Ananas Coco, Framboise"
  },
  {
    name: "Coca Cola, Oasis, Perrier, Sprite, Ice Tea, Schweppes, Orangina, 7up...",
    category: "Boissons",
    price: "2,00 €",
    image: "/images/boissons/boissons.png",
    ingredients: "Boisson fraîche"
  }
];

function Menu() {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) => {
    const text = `${product.name} ${product.category} ${product.ingredients}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <main className="page">
      <h1>Menu Burger2Nuit</h1>

      <input
        className="search"
        type="text"
        placeholder="Rechercher : burger, poulet, dessert..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="product-grid">
        {filteredProducts.map((product, index) => (
          <article className="product-card" key={index}>
            <img src={product.image} alt={product.name} />
            <div>
              <span>{product.category}</span>
              <h3>{product.name}</h3>
              <p>{product.ingredients}</p>
              <strong>{product.price}</strong>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Menu;