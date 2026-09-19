const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://srikanthsingam13_db_user:LTE3fYH7M4MCij89@cluster0.nbejhht.mongodb.net/")
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("MongoDB connection error:", err.message));

app.use("/user", require("./routes/userRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/apartment", require("./routes/apartmentRoutes"));
app.use("/rental", require("./routes/rentalRoutes"));
app.use("/payment", require("./routes/paymentRoutes"));

app.get("/", (req, res) => {
  res.json({ message: "Apartment Rental API is running" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
