const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  // Return all thoughts
});

router.get("/:id", async (req, res) => {
  // Return one thought
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

module.exports = router;
