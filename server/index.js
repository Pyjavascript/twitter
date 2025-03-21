const express = require("express");
const cors = require("./config/corsConfig");
const { connectDB } = require("./model/db");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const paymentRoutes = require("./routes/payment");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
require("dotenv").config();
const axios = require("axios");
const User = require("./model/User");
const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;


const app = express();
const PORT = 3000;

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

connectDB();

// Store OTPs
const otps = {};

// 📩 Nodemailer setup for OTP emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail
    pass: process.env.EMAIL_PASS, // Your App Password
  },
});

// 📌 Route to Send OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  otps[email] = otp;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// ✅ Route to Verify OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (otps[email] && otps[email] == otp) {
    delete otps[email]; // Remove OTP after verification
    res.json({ success: true });
  } else {
    res.status(400).json({ error: "Invalid OTP" });
  }
});

// Ensure 'uploads' directory exists
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Multer Storage for Audio Files
const storage = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
});

// 🚀 Route to Upload Audio (After OTP Verification)
app.post("/upload-audio", upload.single("audio"), async (req, res) => {
  const { email } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileUrl = `https://twitter-jfq3.onrender.com/uploads/${req.file.filename}`;

  // Store in database (optional)
  try {
    await User.updateOne(
      { email },
      { $push: { audioFiles: fileUrl } }
    );

    console.log("Audio file uploaded:", fileUrl);
    res.json({ audioUrl: fileUrl });
  } catch (err) {
    console.error("Error saving audio:", err);
    res.status(500).json({ error: "Error saving audio file" });
  }
});

// 🚀 Serve static files from "uploads" folder
app.use("/uploads", express.static("uploads"));

// ✅ User Follow System
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
// app.use("/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Twitter Audio Feature is Working");
});
app.get("/searchTweets", async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await axios.get("https://api.twitter.com/2/tweets/search/recent", {
      params: {
        query: q,
        max_results: 10,
        "tweet.fields": "author_id,created_at",
      },
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });

    if (!response.data.data) {
      return res.status(404).json({ error: "No tweets found" });
    }

    res.json({ tweets: response.data.data });
  } catch (error) {
    console.error("Error fetching tweets:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch tweets" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
