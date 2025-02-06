const { db } = require("./db");

const User = db.collection("users");

module.exports = User;
