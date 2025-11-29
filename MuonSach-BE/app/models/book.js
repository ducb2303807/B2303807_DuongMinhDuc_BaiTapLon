const mongoose = require("mongoose");

const sachSchema = new mongoose.Schema(
  {
    TenSach: { type: String, required: true },
    DonGia: { type: Number, required: true, min: 0 },
    SoQuyen: { type: Number, required: true, min: 0 },
    NamXuatBan: { type: Number, required: true },
    TacGia: { type: String, required: true },

    // KHÓA NGOẠI: Liên kết với NXB
    MaNXB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NhaXuatBan",
      required: true,
    },
  },
  {
    collection: "Sach",
  }
);

module.exports = mongoose.model("Sach", sachSchema);
