const express = require("express");
const router = express.Router();

const bookBorrowRouter = require("./book-borrow.route");

router.use("/book-borrows", bookBorrowRouter);

router.get("/", (req, res) => {
  res.json({ message: "Xin chao, admin" });
});

module.exports = router;
