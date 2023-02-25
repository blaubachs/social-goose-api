const express = require("express");
const { User, Thoughts } = require("../../models");
const router = express.Router();

// Return all thoughts
router.get("/", async (req, res) => {
  try {
    const foundThoughts = await Thoughts.find();

    res.json(foundThoughts);
  } catch (err) {
    res.status(500).json({ msg: "an error occurred", err });
  }
});

// Return one thought
router.get("/:id", async (req, res) => {
  try {
    const foundThought = await Thoughts.findOne({
      _id: req.params.id,
    });
    if (!foundThought) {
      res.status(404).json({ msg: "no such thought" });
    } else {
      res.json(foundThought);
    }
  } catch (err) {
    res.status(500).json({ msg: "an error occurred", err });
  }
});

// Create a new thought. Note from assignment reqs:
// don't forget to push the created thought's _id to the associated user's thoughts array field
router.post("/", async (req, res) => {
  try {
    const newThought = await Thoughts.create({
      thoughtText: req.body.thoughtText,
      username: req.body.username,
    });
    if (newThought) {
      const findOneUser = await User.findOne({
        username: req.body.username,
      });
      if (!findOneUser) {
        return res.status(404).json({ msg: "no such user" });
      }
      let userThoughtArr = findOneUser.thoughts;
      userThoughtArr.push(newThought);
      res.json(findOneUser);
    } else {
      return res
        .status(500)
        .json({ msg: "an error occurred while creating a thought" });
    }
  } catch (err) {
    res.status(500).json({ msg: "an error occurred", err });
  }
});

// Update a thought by id
router.put("/:id", async (req, res) => {
  try {
    const findOneAndUpdate = await Thoughts.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          thoughtText: req.body.thoughtText,
          username: req.body.username,
        },
      }
    );

    if (!findOneAndUpdate) {
      res.status(404).json({ msg: "no such thought" });
    } else {
      res.json(findOneAndUpdate);
    }
  } catch (err) {
    res.status(500).json({ msg: "an error occurred", err });
  }
});

// Delete a thought by id
router.delete("/:id", async (req, res) => {
  try {
    const deleteOneThought = await Thoughts.findByIdAndDelete(req.params.id);

    if (!deleteOneThought) {
      res.status(404).json({ msg: "no such thought" });
    } else {
      res.json(deleteOneThought);
    }
  } catch (err) {
    res.status(500).json({ msg: "an error occurred", err });
  }
});

// Create a reaction stored in a single thoughts reaction array field
router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    const foundThought = await Thoughts.findById(req.params.thoughtId);
    if (!foundThought) {
      res.status(404).json({ msg: "no such thought" });
    } else {
      let reactionArr = foundThought.reactions;
      let newReaction = {
        reactionBody: req.body.reactionBody,
        username: req.body.username,
      };
      await reactionArr.push(newReaction);
      res.json(foundThought);
    }
  } catch (err) {
    res.status(500).json({ msg: "an error occurred", err });
  }
});

// Delete a reaction based on the reactions id value
router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
  try {
    const foundThought = await Thoughts.findByIdAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } }
    );

    res.json(foundThought);
  } catch (err) {
    res.status(500).json({ msg: "an error occurred", err });
  }
});

module.exports = router;
