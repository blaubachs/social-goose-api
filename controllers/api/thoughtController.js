const express = require("express");
const { User, Thoughts } = require("../../models");
const router = express.Router();

// Return all thoughts
router.get("/", async (req, res) => {
  const foundThoughts = await Thoughts.find();

  res.json(foundThoughts);
});

// Return one thought
router.get("/:id", async (req, res) => {
  const foundThought = await Thoughts.findOne({
    _id: req.params.id,
  });
  res.json(foundThought);
});

router.post("/", async (req, res) => {
  // Create a new thought. Note from assignment reqs:
  // don't forget to push the created thought's _id to the associated user's thoughts array field
});

router.put("/:id", async (req, res) => {
  // Update a thought by id
});

router.delete("/:id", async (req, res) => {
  // Delete a thought by id
});

router.post("/:id/reactions", async (req, res) => {
  // Create a reaction stored in a single thoughts reaction array field
});

router.delete("/:id/reactions", async (req, res) => {
  // Delete a reaction based on the reactions id value
});

module.exports = router;
