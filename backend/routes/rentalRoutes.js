const express = require("express");
const router = express.Router();
const RentalRequest = require("../models/RentalRequest");
const Apartment = require("../models/Apartment");

router.post("/request", async (req, res) => {
  try {
    const { userId, apartmentId } = req.body;
    const apartment = await Apartment.findById(apartmentId);
    if (!apartment) return res.status(404).json({ message: "Apartment not found" });
    if (apartment.status !== "AVAILABLE") return res.status(400).json({ message: "Apartment is not available" });

    const existing = await RentalRequest.findOne({
      userId, apartmentId, status: { $in: ["WAITING", "PAYMENT PENDING"] }
    });
    if (existing) return res.status(400).json({ message: "Request already exists" });

    const request = await RentalRequest.create({ userId, apartmentId });
    res.status(201).json({ message: "Rental request submitted", request });
  } catch (e) { res.status(500).json({ message: "Request failed", error: e.message }); }
});

router.get("/all", async (req, res) => {
  try {
    res.json(await RentalRequest.find().populate("userId").populate("apartmentId"));
  } catch (e) { res.status(500).json({ message: "Failed to fetch requests" }); }
});

router.get("/user/:userId", async (req, res) => {
  try { res.json(await RentalRequest.find({ userId: req.params.userId }).populate("apartmentId")); }
  catch (e) { res.status(500).json({ message: "Failed to fetch requests" }); }
});

router.put("/accept/:id", async (req, res) => {
  try {
    const request = await RentalRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    request.status = "PAYMENT PENDING";
    await request.save();
    res.json({ message: "Request accepted. Payment pending.", request });
  } catch (e) { res.status(500).json({ message: "Failed to accept request" }); }
});

router.put("/deny/:id", async (req, res) => {
  try {
    const request = await RentalRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    request.status = "DENIED";
    await request.save();
    res.json({ message: "Request denied", request });
  } catch (e) { res.status(500).json({ message: "Failed to deny request" }); }
});

module.exports = router;