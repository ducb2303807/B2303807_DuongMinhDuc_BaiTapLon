const mongoose = require("mongoose");

const nhaXuatBanSchema = new mongoose.Schema(
  {
    TenNXB: { type: String, required: true },
    DiaChi: { type: String, required: true },
  },
  {
    collection: "NhaXuatBan", // Bắt buộc trùng tên collection trong DB
    timestamps: true, // (Tùy chọn) Tự động thêm createdAt, updatedAt
  }
);

module.exports = mongoose.model("NhaXuatBan", nhaXuatBanSchema);
