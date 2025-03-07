
const express = require("express");
const cors = require("./config/corsConfig");
const { connectDB } = require("./model/db");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
require("dotenv").config();
const User = require("./model/User")

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
app.post("/api/updatefollow", async (req, res) => {
  try {
    const { email, count, following } = req.body;
    const result = await User.updateOne(
      { email },
      {
        $set: { count: count },
        $push: { following: { $each: following } },
      },
      { new: true }
    );
    res.send(result);
  } catch (e) {
    console.log("Error in Following user: ", e);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.use("/api", userRoutes);
app.use("/api", postRoutes);

app.get("/", (req, res) => {
  res.send("Twitter is working");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
