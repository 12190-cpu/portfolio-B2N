import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { connectDatabase } from "./config/database.js";

import productsRoutes from "./routes/products.routes.js";
import sectorsRoutes from "./routes/sectors.routes.js";
import authRoutes from "./routes/auth.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: "./.env" });

await connectDatabase();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.get("/", (req, res) => {
  res.json({ message: "API Burger2Nuit fonctionne" });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    app: "Burger2Nuit API",
    port: PORT
  });
});

app.use("/api/products", productsRoutes);
app.use("/api/sectors", sectorsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});