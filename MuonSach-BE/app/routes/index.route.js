const express = require("express");
const router = express.Router();
const readerRouter = require("./reader.route");

router.use("/readers", readerRouter);

router.get("/", (req, res) => {
  res.json({ message: "Xin chao cong API" });
});

module.exports = router;
