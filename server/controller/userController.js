const User = require("../model/User");
const useragent = require("useragent");
const requestIp = require('request-ip');
const moment = require("moment-timezone");

exports.registerUser = async (req, res) => {
  try {
    const user = req.body;
    const { email } = user;
    const existingUser = await User.findOne({ email });
    const agent = useragent.parse(req.headers["user-agent"]);
    const ip = requestIp.getClientIp(req);

    const isMobile = /mobile|android|iphone|ipad|ipod/i.test(agent.source);
    const deviceType = isMobile ? "Mobile" : "Desktop/Laptop";
    const timestampIST = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    const Info = {
      ipAddress: ip,
      browser: agent.family,
      browserVersion: agent.toVersion(),
      os: agent.os.family,
      osVersion: agent.os.toVersion(),
      device: agent.device.family || "Unknown",
      deviceType: deviceType,
      loginTime: timestampIST
    };

    if (existingUser) {
      const result = await User.updateOne(
        { email },
        { $push: { deviceInfo: Info } },
        {$push: { here: "OLDUSER" } }
      );
      res.send(result);
    } else {
      const result = await User.insertOne({ ...user, deviceInfo: [Info], here: ["NEWUSER"] });
      // localStorage.setItem("Following", []);
      res.send(result);
    }
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

exports.updateFollow = async (req, res) => {
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
};