const express = require("express");
const { createPost, getAllPosts, getUserPosts } = require("../controller/postController");

const router = express.Router();

router.post("/post", createPost);
router.get("/post", getAllPosts);
router.get("/userpost", getUserPosts);

module.exports = router;
