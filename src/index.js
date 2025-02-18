const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

app.use(express.json()); // Middleware to parse JSON requests

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Quote Schema & Model
const quoteSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const Quote = mongoose.model("Quote", quoteSchema);

app.get("/", (req, res) => {
  res.send("Welcome to the Quote API!");
});

app.get("/quote", async (req, res) => {
  const count = await Quote.countDocuments();
  const random = Math.floor(Math.random() * count);
  const randomQuote = await Quote.findOne().skip(random);
  res.json(randomQuote);
});

app.get("/quotes", async (req, res) => {
  const quotes = await Quote.find();
  res.json(quotes);
});

// POST - Add a new quote
app.post("/quotes", async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Quote text is required" });
  }
  const newQuote = new Quote({ text });
  await newQuote.save();
  res.status(201).json(newQuote);
});

// PUT - Update an existing quote
app.put("/quotes/:id", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const updatedQuote = await Quote.findByIdAndUpdate(
    id,
    { text },
    { new: true }
  );
  if (!updatedQuote) {
    return res.status(404).json({ error: "Quote not found" });
  }
  res.json(updatedQuote);
});

// DELETE - Remove a quote
app.delete("/quotes/:id", async (req, res) => {
  const { id } = req.params;
  const deletedQuote = await Quote.findByIdAndDelete(id);
  if (!deletedQuote) {
    return res.status(404).json({ error: "Quote not found" });
  }
  res.json(deletedQuote);
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
}

module.exports = app;
