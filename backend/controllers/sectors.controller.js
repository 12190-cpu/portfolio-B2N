import sectors from "../data/sectors.js";

/*
=========================
GET ALL SECTORS
=========================
*/
export const getSectors = (req, res) => {
  res.status(200).json(sectors);
};

/*
=========================
GET SECTOR BY ID
=========================
*/
export const getSectorById = (req, res) => {
  const id = Number(req.params.id);

  const sector = sectors.find((sector) => sector.id === id);

  if (!sector) {
    return res.status(404).json({
      message: "Secteur introuvable"
    });
  }

  res.status(200).json(sector);
};

/*
=========================
CREATE SECTOR
=========================
*/
export const createSector = (req, res) => {
  const newSector = req.body;

  newSector.id = sectors.length + 1;

  sectors.push(newSector);

  res.status(201).json(newSector);
};

/*
=========================
UPDATE SECTOR
=========================
*/
export const updateSector = (req, res) => {
  const id = Number(req.params.id);

  const sector = sectors.find((sector) => sector.id === id);

  if (!sector) {
    return res.status(404).json({
      message: "Secteur introuvable"
    });
  }

  Object.assign(sector, req.body);

  res.status(200).json(sector);
};

/*
=========================
DELETE SECTOR
=========================
*/
export const deleteSector = (req, res) => {
  const id = Number(req.params.id);

  const index = sectors.findIndex((sector) => sector.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Secteur introuvable"
    });
  }

  sectors.splice(index, 1);

  res.status(200).json({
    message: "Secteur supprimé"
  });
};