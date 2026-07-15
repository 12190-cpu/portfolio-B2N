import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import { connectDatabase } from "../config/database.js";

import Product from "../models/Product.js";
import Sector from "../models/Sector.js";
import Admin from "../models/Admin.js";

import products from "../data/products.js";
import sectors from "../data/sectors.js";

dotenv.config();

async function seedDatabase() {
  try {
    await connectDatabase();

    console.log("Suppression des anciennes données...");

    await Product.deleteMany({});
    await Sector.deleteMany({});
    await Admin.deleteMany({});

    const productsToInsert = products.map(({ id, ...product }) => product);
    const sectorsToInsert = sectors.map(({ id, ...sector }) => sector);

    console.log("Importation des produits...");
    await Product.insertMany(productsToInsert);

    console.log("Importation des secteurs...");
    await Sector.insertMany(sectorsToInsert);

    console.log("Création de l’administrateur...");

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    await Admin.create({
      username: process.env.ADMIN_USERNAME,
      password: hashedPassword
    });

    console.log("Base de données initialisée avec succès.");

    process.exit(0);
  } catch (error) {
    console.error(
      "Erreur pendant l’initialisation :",
      error.message
    );

    process.exit(1);
  }
}

seedDatabase();