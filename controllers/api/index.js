const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("api route");
});

const thoughtRoutes = require("./thoughtController");
router.use("/thoughts", thoughtRoutes);

const userRoutes = require("./userController");
router.use("/users", userRoutes);

module.exports = router;
