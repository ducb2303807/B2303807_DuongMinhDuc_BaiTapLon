const mongoose = require("mongoose");

const theoDoiMuonSachSchema = new mongoose.Schema(
  {
    // Liên kết Độc Giả
    MaDocGia: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DocGia",
      required: true,
    },

    // Liên kết Sách
    MaSach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sach",
      required: true,
    },

    // Liên kết Nhân Viên
    MaNhanVien: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NhanVien",
      required: true,
    },

    NgayMuon: {
      type: Date,
      required: true,
      default: Date.now, // Mặc định lấy ngày giờ hiện tại
    },

    NgayTra: { type: Date }, // Không required (vì mới mượn chưa trả)

    TrangThai: {
      type: String,
      required: true,
      enum: ["Chờ duyệt", "Đang mượn", "Đã trả"],
      default: "Chờ duyệt",
    },
  },
  {
    collection: "TheoDoiMuonSach",
  }
);

module.exports = mongoose.model("TheoDoiMuonSach", theoDoiMuonSachSchema);
