const mongoose = require("mongoose");

const rentalRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  apartmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Apartment", required: true },
  status: {
    type: String,
    enum: ["WAITING", "PAYMENT PENDING", "PAID", "DENIED"],
    default: "WAITING"
  },
  requestDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("RentalRequest", rentalRequestSchema);