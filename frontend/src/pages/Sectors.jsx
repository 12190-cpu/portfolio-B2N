import { useState } from "react";

const sectors = [
  {
    name: "Nord IDF",
    image: "/images/secteurs/nord.jpg",
    cities: [
      "Cergy",
      "Pontoise",
      "Herblay",
      "Osny",
      "Eragny",
      "Conflans-Sainte-Honorine",
      "Saint-Ouen-l'Aumône",
      "Montigny-lès-Cormeilles",
      "Vauréal",
      "Jouy-le-Moutier",
      "Beauchamp",
      "Pierrelaye",
      "Le Plessis-Bouchard",
      "Courdimanche",
      "Boisemont",
      "Maurecourt"
    ],
    "whatsapp": "https://wa.me/33600000000",
    "snapchat": "https://www.snapchat.com/add/burger2nuit.nord",
    "phone": "tel:+33600000000"
  },
  {
    name: "Nord Est IDF",
    image: "/images/secteurs/nord-est.jpg",
    cities: [
      "Roissy",
      "Sevran",
      "Aulnay",
      "Tremblay",
      "Villepinte",
      "Goussainville",
      "Mitry-Mory",
      "Le Mesnil-Amelot"
    ],
    whatsapp: "https://wa.me/33600000000",
    snapchat: "https://www.snapchat.com/add/burger2nuit.nordest",
    phone: "tel:+33600000000"
  },
  {
    name: "Ouest IDF",
    image: "/images/secteurs/ouest.jpg",
    cities: [
      "Clichy",
      "Levallois",
      "Asnières-sur-Seine",
      "Gennevilliers",
      "Villeneuve-la-Garenne",
      "Colombes",
      "Bois-Colombes",
      "La Garenne-Colombes",
      "Nanterre",
      "Rueil-Malmaison",
      "Suresnes",
      "Puteaux",
      "Neuilly-sur-Seine"
    ],
    "whatsapp": "https://wa.me/33600000000",
    "snapchat": "https://www.snapchat.com/add/burger2nuit.ouest",
    "phone": "tel:+33600000000"
  }
];

function Sectors() {
  const [search, setSearch] = useState("");

  const filteredSectors = sectors.filter((sector) => {
    const text = `${sector.name} ${sector.cities.join(" ")}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <main className="page">
      <h1>Secteurs de livraison</h1>

      <input
        className="search"
        type="text"
        placeholder="Tape ta ville : Cergy, Roissy, Clichy..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="sector-grid">
        {filteredSectors.map((sector, index) => (
          <article className="sector-card" key={index}>
            <img src={sector.image} alt={sector.name} />
            <h2>{sector.name}</h2>

            <div className="cities">
              {sector.cities.map((city, i) => (
                <span key={i}>{city}</span>
              ))}
            </div>

            <div className="contact-buttons">
              <a href={sector.whatsapp} target="_blank">WhatsApp</a>
              <a href={sector.snapchat} target="_blank">Snapchat</a>
              <a href={sector.phone}>Téléphone</a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Sectors;