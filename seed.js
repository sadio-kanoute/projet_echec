require("dotenv").config(); // Charge le fichier .env
const mongoose = require("mongoose");
const Product = require("./models/Product");
const Universe = require("./models/Universe");
const Category = require("./models/Category");

const seedDatabase = async () => {
  try {
    // 1. CONNEXION
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("🔌 Connecté à MongoDB...");

    // 2. NETTOYAGE (On vide tout avant de remplir)
    await Product.deleteMany({});
    await Universe.deleteMany({});
    await Category.deleteMany({});
    console.log("🧹 Base de données nettoyée.");

    // 3. CRÉATION DES UNIVERS ET CATÉGORIES
    // On les crée d'abord pour récupérer leurs IDs
    const naruto = await Universe.create({ name: "Naruto" });
    const onePiece = await Universe.create({ name: "One Piece" });
    const dbz = await Universe.create({ name: "Dragon Ball Z" });

    const plateau = await Category.create({ name: "Plateaux de Jeu" });
    const pieces = await Category.create({ name: "Jeux de Pièces" });

    console.log("✅ Univers et Catégories créés.");

    const products = [
      {
        name: "Échiquier Konoha Deluxe",
        price: 149.99,
        description: "Plateau en bois gravé avec le symbole de Konoha.",
        image: "https://url-image-exemple.com/naruto1.jpg",
        stock: 5,
        universe: naruto._id,
        category: plateau._id,
      },
      {
        name: "Pièces Équipage du Chapeau de Paille",
        price: 59.99,
        description: "Luffy est le Roi, Nami la Reine.",
        image: "https://url-image-exemple.com/op1.jpg",
        stock: 20,
        universe: onePiece._id,
        category: pieces._id,
      },
      {
        name: "Échiquier Cell Games",
        price: 200.0,
        description: "Réplique parfaite de l'arène de Cell.",
        image: "https://url-image-exemple.com/dbz1.jpg",
        stock: 2,
        universe: dbz._id,
        category: plateau._id,
      },
    ];

    await Product.insertMany(products);
    console.log(`✅ ${products.length} produits ajoutés avec succès !`);

    mongoose.connection.close();
    console.log("👋 Fin du script.");
  } catch (error) {
    console.error("❌ Erreur :", error);
    process.exit(1);
  }
};

seedDatabase();
