const User = require("../model/User");

exports.registerUser = async (req, res) => {
  try {
    const user = req.body;
    const result = await User.insertOne(user);
    res.send(result);
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getLoggedInUser = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await User.find({ email }).toArray();
    res.send(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().toArray();
    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const filter = { email: req.params.email };
    const profile = req.body;
    const options = { upsert: true };
    const updatedoc = { $set: profile };

    const result = await User.updateOne(filter, updatedoc, options);
    res.send(result);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
