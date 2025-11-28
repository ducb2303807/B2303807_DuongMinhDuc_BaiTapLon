const express = require("express");
const router = express.Router();
const readerRouter = require("./reader.route");
const staffRouter = require("./staff.route");

router.use("/staffs", staffRouter);
router.use("/readers", readerRouter);

router.get("/", (req, res, next) => {
  res.json({ message: "Xin chao cong API" });
});

module.exports = router;
