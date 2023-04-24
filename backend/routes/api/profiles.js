const express = require("express");
const router = express.Router();
const env = require('dotenv');
const User = require("../../models/User");
const auth = require('../../middleware/auth');
const bcrypt = require("bcryptjs");

env.config();

// Render profile page
router.get("/data", auth, (req, res) => {
    User.findById(req.userData.id)
    .then(user => {
        console.log("found profile data (backend message)", user)
        res.status(200).json(user);
    })
    .catch(err => {
        console.log("profile problem", err);
        res.status(500).json({ error: err });
    });
});

// Allow profile to be edited
router.patch("/edit", auth, (req, res) => {
    User.findById(req.userData.id)
    .then(user => {
        console.log("found user profile", user)
        if(user.email !== req.body.email) {
            return res.status(400).json({ error: "Email cannot be changed" });
        }
        user.first = req.body.first;
        user.last = req.body.last;
        // user.email = req.body.email;
        user.contact = req.body.contact;
        user.age = req.body.age;
        user.username = req.body.username;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              user
                .save()
                .then(user => res.json(user))
                .catch(err => console.log("couldn't save changes to profile",err));
            });
          });
    })
    .catch(err => {
        console.log("could not find user to update profile", err);
        res.status(500).json({ error: err });
    });
});

module.exports = router;