const express = require("express");
const router = express.Router();
const Apartment = require("../models/Apartment");

router.post("/add", async (req, res) => {
  try {
    const apartment = await Apartment.create(req.body);
    res.status(201).json({ message: "Apartment added successfully", apartment });
  } catch (e) { res.status(500).json({ message: "Failed to add apartment", error: e.message }); }
});

router.get("/all", async (req, res) => {
  try { res.json(await Apartment.find()); }
  catch (e) { res.status(500).json({ message: "Failed to fetch apartments" }); }
});

router.get("/search/location/:location", async (req, res) => {
  try {
    res.json(await Apartment.find({
      location: { $regex: req.params.location, $options: "i" },
      status: "AVAILABLE"
    }));
  } catch (e) { res.status(500).json({ message: "Search failed" }); }
});

router.get("/filter/bhk/:bhk", async (req, res) => {
  try { res.json(await Apartment.find({ bhk: req.params.bhk, status: "AVAILABLE" })); }
  catch (e) { res.status(500).json({ message: "Filter failed" }); }
});

router.get("/filter/rent/:maxRent", async (req, res) => {
  try { res.json(await Apartment.find({ rent: { $lte: Number(req.params.maxRent) }, status: "AVAILABLE" })); }
  catch (e) { res.status(500).json({ message: "Filter failed" }); }
});

router.get("/:id", async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) return res.status(404).json({ message: "Apartment not found" });
    res.json(apartment);
  } catch (e) { res.status(500).json({ message: "Failed to fetch apartment" }); }
});

router.put("/update/:id", async (req, res) => {
  try {
    const apartment = await Apartment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!apartment) return res.status(404).json({ message: "Apartment not found" });
    res.json({ message: "Apartment updated", apartment });
  } catch (e) { res.status(500).json({ message: "Update failed", error: e.message }); }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const apartment = await Apartment.findByIdAndDelete(req.params.id);
    if (!apartment) return res.status(404).json({ message: "Apartment not found" });
    res.json({ message: "Apartment deleted" });
  } catch (e) { res.status(500).json({ message: "Delete failed" }); }
});

module.exports = router;