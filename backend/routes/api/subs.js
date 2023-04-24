const express = require("express");
const router = express.Router();
const env = require("dotenv");
const Sub = require("../../models/Sub");
const auth = require("../../middleware/auth");
const validateSubInput = require("../../validation/subs");
const User = require("../../models/User");

env.config();

// Make sub page
router.post("/create", auth, async (req, res) => {
  const { errors, isValid } = validateSubInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const user = await User.findById(req.userData.id);
  const email = user.email;
  Sub.findOne({ name: req.body.name }).then((sub) => {
    if (sub) {
      return res
        .status(400)
        .json({ name: "Sub with this name already exists" });
    } else {
      const newSub = new Sub({
        name: req.body.name,
        description: req.body.description,
        owner: req.userData.id,
        tags: req.body.tags,
        banned: req.body.banned,
        sub_count: 1,
        banned_members: [],
        members: [email],
        requests: [],
        posts: [],
        left_members: [],
      });
      console.log(
        newSub.owner_name,
        User.findById(req.userData.id, (err, user) => user).username
      );
      newSub
        .save()
        .then((sub) => res.json(sub))
        .catch((err) => console.log(err));
    }
  });
});

router.get("/mysubs", auth, async (req, res) => {
  try {
    let subs = await Sub.find({ owner: req.userData.id });
    // console.log(subs);
    res.send(subs);
  } catch (error) {
    console.log("Error:", error);
  }
});

// get data for an individual sub
router.post("/:name", auth, async (req, res) => {
  try {
    const name = req.body.name;
    console.log("NAME:", name);
    Sub.findOne({ name: name })
      .then((sub_data) => {
        if (sub_data.owner !== req.userData.id) {
          console.log(sub_data.owner, req.userData.id);
          return res.status(401).json({ msg: "Not authorized" });
        }
        res.send(sub_data);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log("Error:", error);
  }
});

router.patch("/:name/add-member", auth, async (req, res) => {
  try {
    const name = req.body.name;
    const sub = await Sub.findOne({ name: name });
    if (sub.members.includes(req.body.email)) {
      return res.status(400).json({ msg: "User already a member" });
    }
    sub.members.push(req.body.email);
    const updatedRequests = sub.requests.filter(
      (request) => request !== req.body.email
    );
    sub.requests = updatedRequests;
    sub.sub_count = sub.sub_count + 1;
    await sub.save();
    res.json(sub);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.patch("/:name/reject-request", auth, async (req, res) => {
  try {
    const name = req.body.name;
    const sub = await Sub.findOne({ name: name });
    const updatedMembers = sub.members.filter(
      (member) => member !== req.body.email
    );
    sub.members = updatedMembers;
    const updatedRequests = sub.requests.filter(
      (request) => request !== req.body.email
    );
    sub.requests = updatedRequests;
    const updatedSub = await sub.save();
    res.json(updatedSub);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

/* ALL SUBS */
router.get("/all/joined-subs", auth, async (req, res) => {
  try {
    const subs = await Sub.find();
    const subgreddiits = [];
    const user = await User.findById(req.userData.id);
    const email = user.email;
    subs.forEach(function (arrayItem) {
      var Users = arrayItem.members;
      if (Users.includes(email)) {
        subgreddiits.push(arrayItem);
      }
    });
    console.log(email, subgreddiits);
    res.send(subgreddiits);
  } catch (error) {
    console.log("Error:", error);
  }
});

router.get("/all/other-subs", auth, async (req, res) => {
  try {
    const subs = await Sub.find();
    const subgreddiits = [];
    const user = await User.findById(req.userData.id);
    const email = user.email;
    subs.forEach(function (arrayItem) {
      var Users = arrayItem.members;
      if (!Users.includes(email)) {
        subgreddiits.push(arrayItem);
      }
    });
    console.log(email, subgreddiits);
    res.send(subgreddiits);
  } catch (error) {
    console.log("Error:", error);
  }
});

router.post("/all/join-req-add", auth, async (req, res) => {
  try {
    const name = req.body.name;
    const user = await User.findById(req.userData.id);
    const email = user.email;
    const sub = await Sub.findOne({ name: name });

    if (sub.requests.includes(email)) {
      return res.json({ msg: "Request already sent" });
    }
    console.log(email);
    sub.requests.push(email);

    await sub.save();
    res.json(sub);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/all/:name", auth, async (req, res) => {
  try {
    const name = req.body.name;
    Sub.findOne({ name: name })
      .then((sub_data) => {
        res.send(sub_data);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log("Error:", error);
  }
});

module.exports = router;
