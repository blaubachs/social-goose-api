const express = require("express");
const { User, Thoughts } = require("../../models");
const router = express.Router();

// All users
router.get("/", async (req, res) => {
  try {
    const findAllUsers = await User.find({});
    res.json(findAllUsers);
  } catch (err) {
    res.status(500).json({ msg: "an error occurred", err });
  }
});

// One user
router.get("/:id", async (req, res) => {
  try {
    const findOneUser = await User.findOne({
      _id: req.params.id,
    });
    if (!findOneUser) {
      res.status(404).json({ msg: "no such user" });
    } else {
      res.json(findOneUser);
    }
  } catch (err) {
    res.status(500).json({ msg: "an error occurred", err });
  }
});

// New user
router.post("/", async (req, res) => {
  try {
    const createNewUser = await User.create({
      username: req.body.username,
      email: req.body.email,
    });
    res.json(createNewUser);
  } catch (err) {
    res.status(500).json({ msg: "an error occurred", err });
  }
});

// Update one user by id
router.put("/:id", async (req, res) => {
  try {
    const findAndUpdate = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { username: req.body.username, email: req.body.email } }
    );
    if (!findAndUpdate) {
      res.status(404).json({ msg: "no such user" });
    } else {
      res.json(findAndUpdate);
    }
  } catch (err) {
    res.status(500).json({ msg: "an error occurred", err });
  }
});

// Delete a user by id
router.delete("/:id", async (req, res) => {
  try {
    const deleteOneUser = await User.findByIdAndDelete(req.params.id);

    if (!deleteOneUser) {
      res.status(404).json({ msg: "no such user" });
    } else {
      res.json(deleteOneUser);
    }
  } catch (err) {
    res.status(500).json({ msg: "an error occurred", err });
  }
});

module.exports = router;
