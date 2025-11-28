const express = require("express");
const router = express.Router();

const bookRouter = require("./book.route");
const publisherRouter = require("./publisher.route");
const bookBorrowRouter = require("./book-borrow.route");

router.use("/books", bookRouter);
router.use("/publishers", publisherRouter);
router.use("/book-borrows", bookBorrowRouter);

router.get("/", (req, res) => {
  res.json({ message: "Xin chao, admin" });
});

module.exports = router;
