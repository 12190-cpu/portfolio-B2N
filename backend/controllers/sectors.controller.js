import Sector from "../models/Sector.js";

export const getSectors = async (req, res) => {
  try {
    const sectors = await Sector.find().sort({ createdAt: -1 });

    res.status(200).json(sectors);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des secteurs"
    });
  }
};

export const getSectorById = async (req, res) => {
  try {
    const sector = await Sector.findById(req.params.id);

    if (!sector) {
      return res.status(404).json({
        message: "Secteur introuvable"
      });
    }

    res.status(200).json(sector);
  } catch (error) {
    res.status(400).json({
      message: "Identifiant secteur invalide"
    });
  }
};

export const createSector = async (req, res) => {
  try {
    const sector = await Sector.create(req.body);

    res.status(201).json(sector);
  } catch (error) {
    res.status(400).json({
      message: "Impossible de créer le secteur",
      error: error.message
    });
  }
};

export const updateSector = async (req, res) => {
  try {
    const sector = await Sector.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!sector) {
      return res.status(404).json({
        message: "Secteur introuvable"
      });
    }

    res.status(200).json(sector);
  } catch (error) {
    res.status(400).json({
      message: "Impossible de modifier le secteur",
      error: error.message
    });
  }
};

export const deleteSector = async (req, res) => {
  try {
    const sector = await Sector.findByIdAndDelete(req.params.id);

    if (!sector) {
      return res.status(404).json({
        message: "Secteur introuvable"
      });
    }

    res.status(200).json({
      message: "Secteur supprimé"
    });
  } catch (error) {
    res.status(400).json({
      message: "Impossible de supprimer le secteur"
    });
  }
};