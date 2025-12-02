const { ObjectId } = require("mongodb");
const MongoDB = require("../utils/mongodb.util");
const BookService = require("../services/book.service");

class BookBorrowService {
  constructor(client) {
    this.BookBorrow = client.db().collection("TheoDoiMuonSach");
  }

  extractBookBorrowData(payload) {
    const bookBorrow = {
      MaDocGia: ObjectId.isValid(payload.MaDocGia)
        ? new ObjectId(payload.MaDocGia)
        : undefined,
      MaSach: ObjectId.isValid(payload.MaSach)
        ? new ObjectId(payload.MaSach)
        : undefined,
      MaNhanVien: ObjectId.isValid(payload.MaNhanVien)
        ? new ObjectId(payload.MaNhanVien)
        : undefined,
      NgayMuon: payload.NgayMuon,
      SoNgayMuon: payload.SoNgayMuon,
      TrangThai: payload.TrangThai,
    };

    Object.keys(bookBorrow).forEach(
      (key) => bookBorrow[key] === undefined && delete bookBorrow[key]
    );
    return bookBorrow;
  }

  async create(payload) {
    const bookBorrow = this.extractBookBorrowData(payload);
    const result = await this.BookBorrow.findOneAndUpdate(
      bookBorrow,
      { $set: { TrangThai: payload.TrangThai || "Chờ duyệt" } },
      {
        returnDocument: "after",
        upsert: true,
      }
    );

    if (result) {
      const bookService = new BookService(MongoDB.client);
      const book = await bookService.reserveBook(payload.MaSach);
    }
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
      // {
      //   $project: {
      //     _id: 1,
      //     NgayMuon: 1,
      //     SoNgayMuon: 1,
      //     TrangThai: 1,
      //     // Chỉ lấy những thông tin cần thiết từ các object đã join
      //     docgia_info: "$docgia_info.HoTen", // Ví dụ chỉ lấy tên
      //     sach_info: "$sach_info.TenSach",
      //     nhanvien_info: "$nhanvien_info.HoTenNV",
      //   },
      // },
    ]);

    return await cursor.toArray();
  }

  async findById(id) {
    const bb = await this.find({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return bb[0] || null;
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };

    const update = this.extractBookBorrowData(payload);
    const updatedBookBorrow = await this.BookBorrow.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );

    if (!updatedBookBorrow) {
      return null;
    }

    if (payload.TrangThai === "Đã trả") {
      const bookService = new BookService(MongoDB.client);
      if (await bookService.returnBook(payload.MaSach))
        console.log("Đã trả thành công sách", payload.MaSach);
      else {
        console.log("Không trả thành công sách", payload.MaSach);
      }
    }

    const result = await this.find({ _id: updatedBookBorrow._id });
    return result[0] || null;
  }

  async delete(id) {
    const result = await this.BookBorrow.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    if (result) {
      const bookService = new BookService(MongoDB.client);
      const book = await bookService.returnBook(result.MaSach);
    }
    return result;
  }

  async deleteAll() {
    const result = await this.BookBorrow.deleteMany({});
    return result;
  }
}

module.exports = BookBorrowService;
