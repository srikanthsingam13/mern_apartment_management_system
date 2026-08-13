const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
  apartmentNumber: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  bhk: { type: String, required: true },
  rent: { type: Number, required: true },
  deposit: { type: Number, required: true },
  furnishing: String,
  description: String,
  image: String,
  status: { type: String, default: "AVAILABLE" },
  rentedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
});

module.exports = mongoose.model("Apartment", apartmentSchema);