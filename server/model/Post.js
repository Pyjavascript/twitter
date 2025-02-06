const { db } = require("./db");

const Post = db.collection("posts");

module.exports = Post;
