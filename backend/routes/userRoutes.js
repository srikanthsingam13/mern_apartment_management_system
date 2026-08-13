const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ message: "Email already registered" });
    const user = await User.create({ name, email, password, phone });
    res.status(201).json({ message: "Registration successful", user });
  } catch (e) { res.status(500).json({ message: "Registration failed", error: e.message }); }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email, password: req.body.password });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });
    res.json({ message: "Login successful", user });
  } catch (e) { res.status(500).json({ message: "Login failed", error: e.message }); }
});

router.get("/all", async (req, res) => {
  try { res.json(await User.find()); }
  catch (e) { res.status(500).json({ message: "Failed to fetch users" }); }
});

router.put("/update/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id,
      { name: req.body.name, phone: req.body.phone }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Profile updated", user });
  } catch (e) { res.status(500).json({ message: "Update failed", error: e.message }); }
});

module.exports = router;