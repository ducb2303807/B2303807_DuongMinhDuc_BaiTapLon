require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const ApiError = require("./app/api-error");
const mainRouter = require("./app/routes/index.route");
const app = express();

const buildPath = path.join(__dirname, "public", "dist");

app.use(cors());
app.use(express.json());

app.use(express.static(buildPath));

app.use("/api/", mainRouter);

// app.get("/", (req, res) => {
//   res.sendFile(path.join(buildPath, "index.html"));
// });

app.get("/", (req, res) => {
  res.json({ message: "Xin chao, website muon sach!" });
});

app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
