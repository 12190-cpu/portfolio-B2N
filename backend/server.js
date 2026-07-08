import express from "express";
import cors from "cors";
import productsRoutes from "./routes/products.routes.js";

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Burger2Nuit fonctionne" });
});

app.use("/api/products", productsRoutes);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});