const mongoose = require("mongoose");

const nhanVienSchema = new mongoose.Schema(
  {
    Username: { type: String, required: true, unique: true }, // unique để không trùng user
    Password: { type: String, required: true },
    ChucVu: { type: String, required: true },
    DiaChi: { type: String, required: true },
    SoDienThoai: { type: String, required: true },
  },
  {
    collection: "NhanVien",
  }
);

module.exports = mongoose.model("NhanVien", nhanVienSchema);
