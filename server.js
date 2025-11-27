import express from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";

// Import des routes
import productRoutes from "./routes/products.js";
import universeRoutes from "./routes/universes.js";
import categoryRoutes from "./routes/categories.js";
// ADDED: auth routes
import authRoutes from "./routes/auth.js";
//import code  from"./config.json";

// Charger .env via dotenv si présent
dotenv.config();

// fallback : charger config.json si présent (sans import assertion)
const cfgPath = path.resolve(process.cwd(), "config.json");
if (fs.existsSync(cfgPath)) {
  try {
    const fileCfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
    for (const k of Object.keys(fileCfg)) {
      if (!process.env[k]) process.env[k] = fileCfg[k];
    }
  } catch (err) {
    console.error("Impossible de parser config.json :", err.message);
  }
}

const app = express();

// MIDDLEWARES
app.use(cors()); // Permet au frontend de communiquer avec le backend
app.use(express.json()); // Parse les données JSON
app.use(express.urlencoded({ extended: true }));

// CONNEXION MONGODB
mongoose
  .connect("mongodb+srv://nordineaitdb_user:nrz92290!@cluster0.qyuo0wh.mongodb.net/?appName=Cluster0")
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.error("❌ Erreur MongoDB:", err));

// ROUTE DE TEST
app.get("/", (req, res) => {
  res.json({
    message: "🎮 API Échecs Mangas opérationnelle !",
    version: "1.0.0",
    endpoints: {
      products: "/api/products",
      universes: "/api/universes",
      categories: "/api/categories",
    },
    documentation: {
      products: {
        getAll:
          "GET /api/products?universe=ID&category=ID&search=term&sort=price-asc",
        getFeatured: "GET /api/products/featured",
        getById: "GET /api/products/:id",
        create: "POST /api/products",
        update: "PUT /api/products/:id",
        delete: "DELETE /api/products/:id",
      },
      universes: {
        getAll: "GET /api/universes",
        getById: "GET /api/universes/:id",
        getProducts: "GET /api/universes/:id/products",
      },
      categories: {
        getAll: "GET /api/categories",
        getById: "GET /api/categories/:id",
        getProducts: "GET /api/categories/:id/products",
      },
    },
  });
});

// ROUTES API
app.use("/api/products", productRoutes);
app.use("/api/universes", universeRoutes);
app.use("/api/categories", categoryRoutes);
// ADDED: auth
app.use("/api/auth", authRoutes);

// MIDDLEWARE DE GESTION D'ERREURS (doit être en dernier)
app.use(errorHandler);

// GESTION DES ROUTES NON TROUVÉES
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route non trouvée",
  });
});

const PORT = parseInt(process.env.PORT, 10) || 3000;
// écoute sur PORT (optionnel : préciser 'localhost' en second argument)
app.listen(PORT, "localhost", () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
