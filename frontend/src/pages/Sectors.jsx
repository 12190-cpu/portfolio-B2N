import { useEffect, useState } from "react";
import sectorService from "../services/sector.service";

function Sectors() {
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    sectorService
      .getAll()
      .then((response) => {
        setSectors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sectors:", error);
      });
  }, []);

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