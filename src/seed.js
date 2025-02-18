const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const quotes = [
  { text: "The purpose of our lives is to be happy." },
  { text: "Life is what happens when you’re busy making other plans." },
  { text: "Get busy living or get busy dying." },
  { text: "Nothing is impossible. The word itself says 'I'm possible'!" },
  {
    text: "The most certain way to succeed is always to try just one more time",
  },
  { text: "Learn from yesterday, live for today, hope for tomorrow" },
  { text: "If you fell down yesterday, stand up today" },
  {
    text: "Quotes choose to be optimistic it feels better. He who conquers himself is the mightiest warrior",
  },
  { text: "Anyone who has never made a mistake has never tried anything new" },
];

const seedDB = async () => {
  try {
    const quoteSchema = new mongoose.Schema({
      text: { type: String, required: true },
    });

    const Quote = mongoose.model("Quote", quoteSchema);

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    await Quote.deleteMany({});
    console.log("Existing quotes deleted");

    await Quote.insertMany(quotes);
    console.log("Database seeded successfully");

    mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDB();
