const mongoose = require("mongoose");

const docGiaSchema = new mongoose.Schema(
  {
    Username: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    HoLot: { type: String, required: true },
    Ten: { type: String, required: true },
    NgaySinh: { type: Date, required: true },
    Phai: { type: String, required: true },
    DiaChi: { type: String }, // Không bắt buộc
    SoDienThoai: { type: String, required: true },
  },
  {
    collection: "DocGia",
  }
);

module.exports = mongoose.model("DocGia", docGiaSchema);
