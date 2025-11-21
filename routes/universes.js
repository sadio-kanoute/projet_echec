import express from "express";
import {
  getAllUniverses,
  getUniverseById,
  getProductsByUniverse,
  createUniverse,
  updateUniverse,
  deleteUniverse,
} from "../controllers/universeController.js";

const router = express.Router();

// Routes publiques
router.get("/", getAllUniverses);
router.get("/:id", getUniverseById);
router.get("/:id/products", getProductsByUniverse);

// Routes admin
router.post("/", createUniverse);
router.put("/:id", updateUniverse);
router.delete("/:id", deleteUniverse);

export default router;
