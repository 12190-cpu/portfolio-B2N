import { useState } from "react";

const sectors = [
  {
    name: "Nord IDF",
    image: "/images/secteurs/nord.jpg",
    cities: [
      "Cergy", "Pontoise", "Herblay", "Osny", "Eragny",
      "Conflans-Sainte-Honorine", "Saint-Ouen-l'Aumône",
      "Montigny-lès-Cormeilles", "Vauréal", "Jouy-le-Moutier",
      "Beauchamp", "Pierrelaye", "Le Plessis-Bouchard",
      "Courdimanche", "Boisemont", "Maurecourt"
    ],
    whatsapp: "https://wa.me/33600000000",
    snapchat: "https://www.snapchat.com/add/burger2nuit.nord",
    phone: "tel:+33600000000"
  },
  {
    name: "Nord Est IDF",
    image: "/images/secteurs/nord-est.jpg",
    cities: [
      "Roissy", "Sevran", "Aulnay", "Tremblay",
      "Villepinte", "Goussainville", "Mitry-Mory", "Le Mesnil-Amelot"
    ],
    whatsapp: "https://wa.me/33600000000",
    snapchat: "https://www.snapchat.com/add/burger2nuit.nordest",
    phone: "tel:+33600000000"
  },
  {
    name: "Ouest IDF",
    image: "/images/secteurs/ouest.jpg",
    cities: [
      "Clichy", "Levallois", "Asnières-sur-Seine", "Gennevilliers",
      "Villeneuve-la-Garenne", "Colombes", "Bois-Colombes",
      "La Garenne-Colombes", "Nanterre", "Rueil-Malmaison",
      "Suresnes", "Puteaux", "Neuilly-sur-Seine"
    ],
    whatsapp: "https://wa.me/33600000000",
    snapchat: "https://www.snapchat.com/add/burger2nuit.ouest",
    phone: "tel:+33600000000"
  }
];

function Sectors() {
  const [search, setSearch] = useState("");
  const [selectedSector, setSelectedSector] = useState(null);

  const filteredSectors = sectors.filter((sector) => {
    const text = `${sector.name} ${sector.cities.join(" ")}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <main className="page sectors-page">
      <h1>Secteurs de livraison</h1>
      <p className="page-subtitle">
        Tape ta ville pour trouver automatiquement ton secteur.
      </p>

      <input
        className="search"
        type="text"
        placeholder="Ex : Cergy, Roissy, Clichy..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredSectors.length === 0 && (
        <p className="empty-message">
          Aucun secteur trouvé pour cette ville.
        </p>
      )}

      <div className="sector-grid">
        {filteredSectors.map((sector) => (
          <article
            className="sector-card improved-sector"
            key={sector.name}
            onClick={() => setSelectedSector(sector)}
          >
            <img src={sector.image} alt={sector.name} />

            <div className="sector-content">
              <h2>{sector.name}</h2>
              <p>{sector.cities.length} villes desservies</p>

              <div className="cities preview-cities">
                {sector.cities.slice(0, 6).map((city) => (
                  <span key={city}>{city}</span>
                ))}
              </div>

              <button className="details-btn">Voir le secteur</button>
            </div>
          </article>
        ))}
      </div>

      {selectedSector && (
        <div className="modal-overlay" onClick={() => setSelectedSector(null)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-modal"
              onClick={() => setSelectedSector(null)}
            >
              ×
            </button>

            <img src={selectedSector.image} alt={selectedSector.name} />

            <h2>{selectedSector.name}</h2>
            <p className="modal-category">
              Livraison disponible de 20h à 5h
            </p>

            <h3>Villes desservies</h3>

            <div className="cities modal-cities">
              {selectedSector.cities.map((city) => (
                <span key={city}>{city}</span>
              ))}
            </div>

            <div className="contact-buttons modal-contact">
              <a href={selectedSector.whatsapp} target="_blank">
                Commander WhatsApp
              </a>

              <a href={selectedSector.snapchat} target="_blank">
                Snapchat
              </a>

              <a href={selectedSector.phone}>
                Appeler
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Sectors;