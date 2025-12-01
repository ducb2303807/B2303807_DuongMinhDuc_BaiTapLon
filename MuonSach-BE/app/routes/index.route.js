const express = require("express");
const router = express.Router();
const readerRouter = require("./reader.route");
const staffRouter = require("./staff.route");
const bookRouter = require("./book.route");
const publisherRouter = require("./publisher.route");
const bookBorrowRouter = require("./book-borrow.route");

router.use("/staffs", staffRouter);
router.use("/readers", readerRouter);
router.use("/books", bookRouter);
router.use("/publishers", publisherRouter);
router.use("/book-borrows", bookBorrowRouter);

router.get("/", (req, res) => {
  res.json({ message: "Xin chao cong API" });
});

module.exports = router;
