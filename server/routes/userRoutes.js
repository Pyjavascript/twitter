const express = require("express");
const { registerUser, getLoggedInUser, getAllUsers, updateUser } = require("../controller/userController");

const router = express.Router();

router.post("/register", registerUser);
router.get("/loggedinuser", getLoggedInUser);
router.get("/user", getAllUsers);
router.patch("/userupdate/:email", updateUser);
// router.post('/updatefollow',updateFollow)

module.exports = router;
