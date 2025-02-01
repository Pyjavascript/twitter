const { MongoClient } = require("mongodb");
const express = require("express");
const cors = require("cors");

const PORT = 5000;
const app = express();

app.use(
  cors({
    origin: 'https://twitter-task-nullclass.netlify.app', // Replace with your Netlify URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // If using cookies or authentication
  })
);

app.use(express.json());

const uri =
  "mongodb+srv://admin:admin123@twitter.hyoyp.mongodb.net/?retryWrites=true&w=majority&appName=twitter";

const client = new MongoClient(uri);

const run = async () => {
  try {
    await client.connect();
    console.log(`Mongo Connected at ${PORT}`);

    const Postscollection = client.db("database").collection("posts");
    const usercollection = client.db("database").collection("users");

    app.post("/register", async (req, res) => {
      try {
        const user = req.body;
        const result = await usercollection.insertOne(user);
        console.log("Data inserted into database:", result);
        res.send(result);
      } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    app.get("/loggedinuser", async (req, res) => {
      try {
        const email = req.query.email;
        const user = await usercollection.find({ email }).toArray();
        res.send(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    app.post("/post", async (req, res) => {
      try {
        const post = req.body;
        const result = await Postscollection.insertOne(post);
        res.send(result);
      } catch (error) {
        console.error("Error inserting post:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    app.get("/post", async (req, res) => {
      try {
        const posts = (await Postscollection.find().toArray()).reverse();
        res.send(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    app.get("/userpost", async (req, res) => {
      try {
        const email = req.query.email;
        const userPosts = (
          await Postscollection.find({ email }).toArray()
        ).reverse();
        res.send(userPosts);
      } catch (error) {
        console.error("Error fetching user posts:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });
    app.get("/user", async (req, res) => {
      const user = await usercollection.find().toArray();
      res.send(user);
    });

    app.patch("/userupdate/:email", async (req, res) => {
      const filter = req.params;
      const profile = req.body;
      const options = {
        upsert: true,
      };
      const updatedoc = { $set: profile };
      const result = await usercollection.updateOne(filter, updatedoc, options);
      res.send(result)
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Twitter is working");
});

app.listen(PORT, () => {
  console.log(`Twitter working at ${PORT}`);
});
