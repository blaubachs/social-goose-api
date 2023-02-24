const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("api route");
});

const thoughtRoutes = require("./thoughtController");
router.use("/thoughts", thoughtRoutes);

module.exports = router;
