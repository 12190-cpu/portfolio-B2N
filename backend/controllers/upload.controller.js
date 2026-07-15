export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Aucune image reçue"
    });
  }

  res.status(201).json({
    message: "Image envoyée avec succès",
    imageUrl: `/uploads/${req.file.filename}`
  });
};