const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  stock: { type: Number, default: 0 },

  universe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Universe",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
