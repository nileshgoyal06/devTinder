const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const User = require("../models/user"); // Import the User model

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const user = req.user;

    // Fetch user from database to get a Mongoose document
    const loggedInUser = await User.findById(user._id);

    if (!loggedInUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user fields
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    // Save the updated user document
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile was updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
module.exports = profileRouter;
