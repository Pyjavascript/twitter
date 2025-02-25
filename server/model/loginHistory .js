const { db } = require("./db");

const LoginHistory = db.collection("loginHistory");

module.exports = LoginHistory;
