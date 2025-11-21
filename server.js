import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();

// MIDDLEWARES
app.use(cors()); // Permet au frontend de communiquer avec le backend
app.use(express.json()); // Parse les données JSON

// CONNEXION MONGODB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.error("❌ Erreur MongoDB:", err));

// ROUTE DE TEST
app.get("/", (req, res) => {
  res.json({
    message: "🎮 API Échecs Mangas opérationnelle !",
    endpoints: {
      products: "/api/products",
      universes: "/api/universes",
      categories: "/api/categories",
    },
  });
});

// ROUTES API (Sadio les développera)
// import productRoutes from "./routes/products.js";
// app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
