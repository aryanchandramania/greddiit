// create an endpoint to remove a follower based on the user's token, and the follower's email id
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const env = require("dotenv");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");

env.config();

router.patch("/remove", auth, (req, res) => {
  console.log(req.body.email);  
  const followerEmail  = req.body.email;
  const userId  = req.userData.id;

  // find user in db
  User.findById(userId, (err, user) => {
    if (err) return res.status(500).json({ err });
    if (!user) return res.status(404).json({ message: "User not found" });

    // find and remove from followers array
    const index = user.followers.indexOf(followerEmail);
    if (index > -1) {
      user.followers.splice(index, 1);  
    }
    // Save updated user to database
    user.save((err) => {
      if (err) {
        return res.status(500).json({ message: "Error saving user" });
      }

      return res.status(200).json({ message: "Follower removed successfully" });
    });
  });
});

router.patch("/unfollow", auth, (req, res) => {
    console.log(req.body.email);  
    const followerEmail  = req.body.email;
    const userId  = req.userData.id;
  
    // find user in db
    User.findById(userId, (err, user) => {
      if (err) return res.status(500).json({ err });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      // find and remove from followers array
      const index = user.following.indexOf(followerEmail);
      if (index > -1) {
        user.following.splice(index, 1);  
      }
      // Save updated user to database
      user.save((err) => {
        if (err) {
          return res.status(500).json({ message: "Error saving user" });
        }
  
        return res.status(200).json({ message: "Follower removed successfully" });
      });
    });
  });

module.exports = router;