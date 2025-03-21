const cors = require("cors");

const corsOptions = {
  origin: [
    "http://localhost:5174",
    "http://localhost:5173",
    "https://twitter-task-nullclass.netlify.app",
    "https://twitter-jfq3.onrender.com"
  ],
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}


module.exports = cors(corsOptions);
