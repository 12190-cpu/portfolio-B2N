import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Identifiant et mot de passe obligatoires"
      });
    }

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({
        message: "Identifiants incorrects"
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Identifiants incorrects"
      });
    }

    const token = jwt.sign(
      {
        adminId: admin._id,
        username: admin.username
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h"
      }
    );

    res.status(200).json({
      message: "Connexion réussie",
      token,
      admin: {
        id: admin._id,
        username: admin.username
      }
    });
  } catch (error) {
    console.error("Erreur de connexion :", error);

    res.status(500).json({
      message: "Erreur interne du serveur"
    });
  }
};