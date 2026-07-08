import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import productsRoutes from "./routes/products.routes.js";
import sectorsRoutes from "./routes/sectors.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});