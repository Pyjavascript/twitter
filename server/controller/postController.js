const Post = require("../model/Post");

exports.createPost = async (req, res) => {
  try {
    const post = req.body;
    const result = await Post.insertOne(post);
    res.send(result);
  } catch (error) {
    console.error("Error inserting post:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const { user } = req.query;
    if (!user) {
      return res.status(400).send({ message: "User email is required" });
    }
    const posts = (await Post.find({ email: user }).toArray()).reverse();
    res.send(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};


exports.getUserPosts = async (req, res) => {
  try {
    const email = req.query.email;
    const userPosts = (await Post.find({ email }).toArray()).reverse();
    res.send(userPosts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
