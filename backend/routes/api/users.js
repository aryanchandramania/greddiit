const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const env = require('dotenv');
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");// Load User model
const User = require("../../models/User");
const auth = require('../../middleware/auth');

env.config();

router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body); 
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "User with this email already exists" });
      } 
      else {
        const newUser = new User({
          first: req.body.first,
          last: req.body.last,
          email: req.body.email,
          contact: req.body.contact,
          age: req.body.age,
          username: req.body.username,
          password: req.body.password
        });
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
        const payload = {id:newUser._id};
        let access_token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: 36000});
        res.status(200).json({message: "User created successfully", token: access_token});
      }
    });
  });

// create an endpoint for login, similar to register
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body); // Check validation
    if (!isValid) {
        console.log("login input not valid")
        return res.status(400).json(errors);
    }
    let { email, password } = req.body;
    // Find user by email
    User.findOne({ email }) .then(user => {
    if (!user) {
        return res.status(400).json({ email: "This email is not registered" });
    } 
    else {
        // Check password
        console.log(user._id)
        bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {id:user._id};
            // Sign token
            let access_token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: 36000});
            jwt.verify(access_token, process.env.TOKEN_SECRET, (err,decoded) => {
                if (err) {
                res.status(500).json({ erros: err });
                }
                if (decoded) {
                    return res.status(200).json({
                    success: true,
                    token: access_token,
                    message: user.username + " logged in successfully"
                    });
                }
                });
        } 
        else {
            return res
            .status(400)
            .json({ password: "Password is incorrect" });
        }
        });
    }
});
});

module.exports = router;