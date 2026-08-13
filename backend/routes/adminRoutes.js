const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");

router.post("/login", async (req, res) => {
  try {
    const admin = await Admin.findOne({
      username: req.body.username,
      password: req.body.password
    });
    if (!admin) return res.status(401).json({ message: "Invalid admin credentials" });
    res.json({ message: "Admin login successful", admin: { _id: admin._id, username: admin.username } });
  } catch (e) { res.status(500).json({ message: "Login failed", error: e.message }); }
});

router.post("/create", async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(201).json(admin);
  } catch (e) { res.status(500).json({ message: "Admin creation failed", error: e.message }); }
});

module.exports = router;