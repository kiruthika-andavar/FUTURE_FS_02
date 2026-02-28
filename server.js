require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Lead = require("./models/Lead");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// CONNECT DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ ROUTES MUST COME AFTER app.use

// CREATE LEAD
app.post("/api/leads", async (req, res) => {
  try {
    const newLead = await Lead.create(req.body);
    res.status(201).json(newLead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL LEADS
app.get("/api/leads", async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// UPDATE LEAD
app.put("/api/leads/:id", async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE LEAD
app.delete("/api/leads/:id", async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// LISTEN LAST
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
