const mongoose = require("mongoose");

const UniverseSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports =
  mongoose.models.Universe || mongoose.model("Universe", UniverseSchema);
