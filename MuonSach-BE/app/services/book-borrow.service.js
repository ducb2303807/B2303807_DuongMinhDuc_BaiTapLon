const { ObjectId } = require("mongodb");

class BookBorrowService {
  constructor(client) {
    this.BookBorrow = client.db().collection("TheoDoiMuonSach");
  }

  extractTBookBorrowData(payload) {
    const bookBorrow = {
      MaDocGia: payload.MaDocGia,
      MaSach: payload.MaSach,
      MaNhanVien: payload.MaNhanVien,
      NgayMuon: payload.NgayMuon,
      NgayTra: payload.NgayTra,
      TrangThai: payload.TrangThai,
    };

    Object.keys(bookBorrow).forEach(
      (key) => bookBorrow[key] === undefined && delete bookBorrow[key]
    );
    return bookBorrow;
  }

  async create(payload) {
    const bookBorrow = this.extractTBookBorrowData(payload);
    const result = await this.BookBorrow.findOneAndUpdate(
      bookBorrow,
      { $set: { TrangThai: payload.TrangThai || "Đang mượn" } },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
    return result;
  }

  async find(filter) {
    const cursor = await this.BookBorrow.aggregate([
      // 1. Lọc dữ liệu theo điều kiện đầu vào
      {
        $match: filter,
      },

      // --- JOIN 1: Lấy thông tin Độc Giả ---
      {
        $lookup: {
          from: "DocGia", // Tên collection Độc giả trong DB
          localField: "MaDocGia", // Khóa ngoại trong TheoDoiMuonSach
          foreignField: "_id", // Khóa chính bên doc_gia
          as: "docgia_info", // Tên field chứa kết quả
        },
      },
      {
        $unwind: {
          path: "$docgia_info",
          preserveNullAndEmptyArrays: true,
        },
      },

      // --- JOIN 2: Lấy thông tin Sách ---
      {
        $lookup: {
          from: "Sach", // Tên collection Sách trong DB
          localField: "MaSach",
          foreignField: "_id",
          as: "sach_info",
        },
      },
      {
        $unwind: {
          path: "$sach_info",
          preserveNullAndEmptyArrays: true,
        },
      },

      // --- JOIN 3: Lấy thông tin Nhân Viên ---
      {
        $lookup: {
          from: "NhanVien", // Tên collection Nhân viên trong DB
          localField: "MaNhanVien",
          foreignField: "_id",
          as: "nhanvien_info",
        },
      },
      {
        $unwind: {
          path: "$nhanvien_info",
          preserveNullAndEmptyArrays: true,
        },
      },

      // 4. (Tùy chọn) Chọn lọc các trường cần hiển thị để kết quả gọn đẹp
      // Nếu bạn muốn lấy hết thì XÓA đoạn $project này đi
      {
        $project: {
          _id: 1,
          NgayMuon: 1,
          NgayTra: 1,
          TrangThai: 1,
          // Chỉ lấy những thông tin cần thiết từ các object đã join
          doc_gia: "$docgia_info.HoTen", // Ví dụ chỉ lấy tên
          sach: "$sach_info.ten_sach",
          nhan_vien: "$nhanvien_info.ho_ten_nv",
        },
      },
    ]);

    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.BookBorrow.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractTBookBorrowData(payload);
    const result = await this.BookBorrow.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }

  async delete(id) {
    const result = await this.BookBorrow.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAll() {
    const result = await this.BookBorrow.deleteMany({});
    return result;
  }
}

module.exports = BookBorrowService;
