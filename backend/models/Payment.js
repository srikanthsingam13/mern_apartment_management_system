const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  apartmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Apartment", required: true },
  amount: { type: Number, required: true },
  paymentType: { type: String, default: "SECURITY_DEPOSIT" },
  status: { type: String, default: "PAID" },
  paymentDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", paymentSchema);