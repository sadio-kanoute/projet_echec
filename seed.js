import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Product from "./models/Product.js";
import Universe from "./models/Universe.js";
import Category from "./models/Category.js";

const seedDatabase = async () => {
  try {
    // 1. CONNEXION
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("🔌 Connecté à MongoDB Atlas...");

    // 2. NETTOYAGE
    await Product.deleteMany({});
    await Universe.deleteMany({});
    await Category.deleteMany({});
    console.log("🧹 Base de données nettoyée.");

    // 3. CRÉATION DES UNIVERS
    const naruto = await Universe.create({
      name: "Naruto",
      description: "L'univers ninja de Konoha et ses villages",
      image: "/images/universes/naruto.jpg",
    });

    const onePiece = await Universe.create({
      name: "One Piece",
      description: "Les aventures de Luffy et son équipage pirate",
      image: "/images/universes/onepiece.jpg",
    });

    const dbz = await Universe.create({
      name: "Dragon Ball Z",
      description: "Les combattants Saiyans et guerriers Z",
      image: "/images/universes/dbz.jpg",
    });

    const attackOnTitan = await Universe.create({
      name: "Attack on Titan",
      description: "L'humanité face aux Titans",
      image: "/images/universes/aot.jpg",
    });

    const demonSlayer = await Universe.create({
      name: "Demon Slayer",
      description: "Les pourfendeurs de démons",
      image: "/images/universes/demonslayer.jpg",
    });

    console.log("✅ 5 Univers créés.");

    // 4. CRÉATION DES CATÉGORIES
    const plateaux = await Category.create({
      name: "Plateaux de Jeu",
      description: "Échiquiers complets avec thèmes manga",
    });

    const pieces = await Category.create({
      name: "Jeux de Pièces",
      description: "Sets de pièces d'échecs à collectionner",
    });

    const accessoires = await Category.create({
      name: "Accessoires",
      description: "Boîtes de rangement, horloges, tapis",
    });

    console.log("✅ 3 Catégories créées.");

    // 5. CRÉATION DES PRODUITS (30+)
    const products = [
      // === NARUTO - PLATEAUX ===
      {
        name: "Échiquier Konoha Deluxe",
        price: 149.99,
        description:
          "Plateau en bois massif gravé avec le symbole du village de Konoha. Finition laquée brillante.",
        image: "/images/products/naruto-konoha-deluxe.jpg",
        stock: 5,
        universe: naruto._id,
        category: plateaux._id,
        featured: true,
      },
      {
        name: "Échiquier Akatsuki Édition Limitée",
        price: 199.99,
        description:
          "Design sombre inspiré de l'organisation Akatsuki. Nuages rouges gravés sur chaque case.",
        image: "/images/products/naruto-akatsuki.jpg",
        stock: 3,
        universe: naruto._id,
        category: plateaux._id,
        featured: true,
      },

      // === NARUTO - PIÈCES ===
      {
        name: "Pièces Équipe 7",
        price: 59.99,
        description:
          "Naruto (Roi), Sakura (Reine), Sasuke (Cavalier), Kakashi (Tour). Résine peinte à la main.",
        image: "/images/products/naruto-team7.jpg",
        stock: 20,
        universe: naruto._id,
        category: pieces._id,
      },
      {
        name: "Pièces Hokage Legends",
        price: 79.99,
        description:
          "Les 5 Hokages en pièces collector. Hauteur 8cm, détails ultra fins.",
        image: "/images/products/naruto-hokage.jpg",
        stock: 15,
        universe: naruto._id,
        category: pieces._id,
      },

      // === ONE PIECE - PLATEAUX ===
      {
        name: "Échiquier Going Merry",
        price: 169.99,
        description:
          "Plateau représentant le pont du navire Going Merry. Cases en bois de chêne.",
        image: "/images/products/op-going-merry.jpg",
        stock: 7,
        universe: onePiece._id,
        category: plateaux._id,
        featured: true,
      },
      {
        name: "Échiquier Grand Line Map",
        price: 189.99,
        description:
          "Carte de Grand Line imprimée sur plateau en verre trempé. Éclairage LED optionnel.",
        image: "/images/products/op-grandline.jpg",
        stock: 4,
        universe: onePiece._id,
        category: plateaux._id,
      },

      // === ONE PIECE - PIÈCES ===
      {
        name: "Pièces Équipage Chapeau de Paille",
        price: 69.99,
        description:
          "Luffy (Roi), Nami (Reine), Zoro (Tour), Sanji (Fou). Set complet 32 pièces.",
        image: "/images/products/op-straw-hats.jpg",
        stock: 25,
        universe: onePiece._id,
        category: pieces._id,
        featured: true,
      },
      {
        name: "Pièces Empereurs et Amiraux",
        price: 89.99,
        description:
          "Les 4 Empereurs vs les 3 Amiraux. Pièces en bronze vieilli.",
        image: "/images/products/op-yonko-admirals.jpg",
        stock: 10,
        universe: onePiece._id,
        category: pieces._id,
      },

      // === DBZ - PLATEAUX ===
      {
        name: "Échiquier Cell Games Arena",
        price: 199.99,
        description:
          "Réplique 3D de l'arène du Cell Game. Plateau surélevé avec gradins.",
        image: "/images/products/dbz-cell-arena.jpg",
        stock: 2,
        universe: dbz._id,
        category: plateaux._id,
        featured: true,
      },
      {
        name: "Échiquier Capsule Corp",
        price: 179.99,
        description:
          "Design futuriste inspiré de Capsule Corp. LED bleues intégrées.",
        image: "/images/products/dbz-capsule-corp.jpg",
        stock: 6,
        universe: dbz._id,
        category: plateaux._id,
      },

      // === DBZ - PIÈCES ===
      {
        name: "Pièces Guerriers Z",
        price: 74.99,
        description:
          "Goku, Vegeta, Piccolo, Gohan en Super Saiyan. Effets d'aura lumineux.",
        image: "/images/products/dbz-z-fighters.jpg",
        stock: 18,
        universe: dbz._id,
        category: pieces._id,
      },
      {
        name: "Pièces Saga Freezer",
        price: 84.99,
        description:
          "Freezer (Roi noir), Goku SSJ (Roi blanc). Formes finales incluses.",
        image: "/images/products/dbz-frieza-saga.jpg",
        stock: 12,
        universe: dbz._id,
        category: pieces._id,
      },

      // === ATTACK ON TITAN - PLATEAUX ===
      {
        name: "Échiquier Murs de l'Humanité",
        price: 159.99,
        description:
          "Triple plateau représentant les 3 murs. Cases gravées avec symboles.",
        image: "/images/products/aot-walls.jpg",
        stock: 8,
        universe: attackOnTitan._id,
        category: plateaux._id,
      },
      {
        name: "Échiquier Bataillon d'Exploration",
        price: 169.99,
        description:
          "Logo des Ailes de la Liberté en bois brûlé. Finition rustique.",
        image: "/images/products/aot-survey-corps.jpg",
        stock: 5,
        universe: attackOnTitan._id,
        category: plateaux._id,
        featured: true,
      },

      // === ATTACK ON TITAN - PIÈCES ===
      {
        name: "Pièces Eren vs Annie",
        price: 79.99,
        description:
          "Titans Assaillant et Féminin. Hauteur 10cm, détails anatomiques.",
        image: "/images/products/aot-titans.jpg",
        stock: 14,
        universe: attackOnTitan._id,
        category: pieces._id,
      },
      {
        name: "Pièces Escouade Livaï",
        price: 64.99,
        description:
          "Livaï, Mikasa, Armin, Eren. Équipement 3D manœuvrable sculpté.",
        image: "/images/products/aot-levi-squad.jpg",
        stock: 20,
        universe: attackOnTitan._id,
        category: pieces._id,
      },

      // === DEMON SLAYER - PLATEAUX ===
      {
        name: "Échiquier Montagnes de Kimetsu",
        price: 154.99,
        description:
          "Plateau inspiré du mont Sagiri. Brume artificielle en résine époxy.",
        image: "/images/products/ds-mountain.jpg",
        stock: 9,
        universe: demonSlayer._id,
        category: plateaux._id,
      },
      {
        name: "Échiquier Manoir des Papillons",
        price: 174.99,
        description:
          "Jardin du manoir Kochō. Papillons luminescents incrustés.",
        image: "/images/products/ds-butterfly-mansion.jpg",
        stock: 4,
        universe: demonSlayer._id,
        category: plateaux._id,
        featured: true,
      },

      // === DEMON SLAYER - PIÈCES ===
      {
        name: "Pièces Piliers Hashira",
        price: 89.99,
        description:
          "Les 9 Piliers en tenue complète. Sabres amovibles inclus.",
        image: "/images/products/ds-hashira.jpg",
        stock: 11,
        universe: demonSlayer._id,
        category: pieces._id,
        featured: true,
      },
      {
        name: "Pièces Tanjiro & Nezuko",
        price: 54.99,
        description:
          "Duo frère-sœur. Nezuko avec forme démoniaque alternative.",
        image: "/images/products/ds-tanjiro-nezuko.jpg",
        stock: 22,
        universe: demonSlayer._id,
        category: pieces._id,
      },

      // === ACCESSOIRES MULTI-UNIVERS ===
      {
        name: "Boîte de Rangement Naruto",
        price: 39.99,
        description:
          "Coffret en bois avec logo Konoha. Compartiments pour 32 pièces.",
        image: "/images/products/acc-naruto-box.jpg",
        stock: 30,
        universe: naruto._id,
        category: accessoires._id,
      },
      {
        name: "Horloge d'Échecs One Piece",
        price: 49.99,
        description:
          "Minuteur digital avec thème pirate. Voix de Luffy pour les alertes.",
        image: "/images/products/acc-op-clock.jpg",
        stock: 25,
        universe: onePiece._id,
        category: accessoires._id,
      },
      {
        name: "Tapis de Jeu DBZ",
        price: 29.99,
        description:
          "Tapis néoprène 50x50cm. Design Capsule avec zones de notation.",
        image: "/images/products/acc-dbz-mat.jpg",
        stock: 40,
        universe: dbz._id,
        category: accessoires._id,
      },
      {
        name: "Porte-Pièces Attack on Titan",
        price: 34.99,
        description:
          "Support mural en métal. Forme des 3 murs. Capacité 16 pièces.",
        image: "/images/products/acc-aot-holder.jpg",
        stock: 15,
        universe: attackOnTitan._id,
        category: accessoires._id,
      },
      {
        name: "Livre de Notation Demon Slayer",
        price: 19.99,
        description: "Carnet 100 pages. Couverture illustrée motif vagues.",
        image: "/images/products/acc-ds-notebook.jpg",
        stock: 50,
        universe: demonSlayer._id,
        category: accessoires._id,
      },

      // === PRODUITS BONUS (Pour atteindre 30+) ===
      {
        name: "Échiquier Crossover Anime",
        price: 249.99,
        description:
          "Plateau géant avec tous les univers. Édition collector numérotée.",
        image: "/images/products/crossover-board.jpg",
        stock: 1,
        universe: naruto._id,
        category: plateaux._id,
        featured: true,
      },
      {
        name: "Pack Découverte Débutant",
        price: 99.99,
        description:
          "Plateau basique + 1 set de pièces Naruto + livre de règles illustré.",
        image: "/images/products/starter-pack.jpg",
        stock: 35,
        universe: naruto._id,
        category: plateaux._id,
      },
      {
        name: "Pièces Villains Collection",
        price: 94.99,
        description:
          "Méchants légendaires : Madara, Kaido, Cell, Colossal Titan, Muzan.",
        image: "/images/products/villains-pack.jpg",
        stock: 8,
        universe: naruto._id,
        category: pieces._id,
      },
      {
        name: "Sacoche de Transport Premium",
        price: 44.99,
        description:
          "Cuir synthétique noir. Logo brodé. Compartiments rembourrés.",
        image: "/images/products/acc-travel-bag.jpg",
        stock: 28,
        universe: onePiece._id,
        category: accessoires._id,
      },
      {
        name: "Pièces Bronze Vintage Naruto",
        price: 119.99,
        description:
          "Set en bronze oxydé façon relique ancienne. Gravures détaillées.",
        image: "/images/products/naruto-bronze.jpg",
        stock: 6,
        universe: naruto._id,
        category: pieces._id,
      },
      {
        name: "Échiquier LED Customisable",
        price: 219.99,
        description: "RGB personnalisable via app. Compatible tous univers.",
        image: "/images/products/led-board.jpg",
        stock: 10,
        universe: dbz._id,
        category: plateaux._id,
        featured: true,
      },
    ];

    await Product.insertMany(products);
    console.log(`✅ ${products.length} produits ajoutés avec succès !`);

    // 6. STATISTIQUES FINALES
    const totalProducts = await Product.countDocuments();
    const totalUniverses = await Universe.countDocuments();
    const totalCategories = await Category.countDocuments();

    console.log("\n📊 STATISTIQUES FINALES :");
    console.log(`   - Univers : ${totalUniverses}`);
    console.log(`   - Catégories : ${totalCategories}`);
    console.log(`   - Produits : ${totalProducts}`);
    console.log(
      `   - Produits en vedette : ${products.filter((p) => p.featured).length}`
    );

    mongoose.connection.close();
    console.log("\n👋 Script terminé. Base de données prête !");
  } catch (error) {
    console.error("❌ Erreur lors du seeding :", error);
    process.exit(1);
  }
};

seedDatabase();
