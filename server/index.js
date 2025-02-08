const express = require("express");
const cors = require("./config/corsConfig");
const { connectDB } = require("./model/db");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors);
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

connectDB();

app.use("/api", userRoutes);
app.use("/api", postRoutes);

app.get("/", (req, res) => {
  res.send("Twitter is working");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
