const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const RentalRequest = require("../models/RentalRequest");
const Apartment = require("../models/Apartment");

router.post("/create", async (req, res) => {
  try {
    const { userId, apartmentId, amount, paymentType } = req.body;

    const request = await RentalRequest.findOne({
      userId, apartmentId, status: "PAYMENT PENDING"
    });
    if (!request) return res.status(400).json({ message: "No payment-pending rental request found" });

    const existing = await Payment.findOne({ userId, apartmentId, status: "PAID" });
    if (existing) return res.status(400).json({ message: "Payment already completed" });

    const payment = await Payment.create({
      userId, apartmentId, amount, paymentType: paymentType || "SECURITY_DEPOSIT"
    });

    request.status = "PAID";
    await request.save();

    await Apartment.findByIdAndUpdate(apartmentId, {
      status: "RENTED",
      rentedBy: userId
    });

    res.status(201).json({ message: "Payment successful", payment });
  } catch (e) { res.status(500).json({ message: "Payment failed", error: e.message }); }
});

router.get("/all", async (req, res) => {
  try { res.json(await Payment.find().populate("userId").populate("apartmentId")); }
  catch (e) { res.status(500).json({ message: "Failed to fetch payments" }); }
});

router.get("/user/:userId", async (req, res) => {
  try { res.json(await Payment.find({ userId: req.params.userId }).populate("apartmentId")); }
  catch (e) { res.status(500).json({ message: "Failed to fetch payments" }); }
});

module.exports = router;