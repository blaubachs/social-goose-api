const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  // All users
});

router.get("/:id", async (req, res) => {
  // One user
});

router.post("/", async (req, res) => {
  // New user
});

router.put("/:id", async (req, res) => {
  // Update one user by id
});

router.delete("/:id", async (req, res) => {
  // Delete a user by id
});

module.exports = router;
