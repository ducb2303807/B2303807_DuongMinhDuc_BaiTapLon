const { ObjectId } = require("mongodb");

class BookService {
  constructor(client) {
    this.Book = client.db().collection("Sach");
  }

  extractBookData(payload) {
    const book = {
      TenSach: payload.TenSach,
      DonGia: payload.DonGia,
      SoQuyen: payload.SoQuyen,
      NamXuatBan: payload.NamXuatBan,
      MaNXB: new ObjectId(payload.MaNXB),
      TacGia: payload.TacGia,
    };
    // remove undefined fields
    Object.keys(book).forEach(
      (key) => book[key] === undefined && delete book[key]
    );
    return book;
  }

  async create(payload) {
    const book = this.extractBookData(payload);
    const result = await this.Book.findOneAndUpdate(
      book,
      { $set: {} },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
    return result;
  }

  async find(filter) {
    const cursor = await this.Book.aggregate([
      // 1. $match: Lọc dữ liệu theo điều kiện (tương đương với filter trong find)
      {
        $match: filter,
      },
      // 2. $lookup: Thực hiện Join với bảng NHAXUATBAN
      {
        $lookup: {
          from: "NhaXuatBan", // Tên chính xác của collection Nhà xuất bản trong DB
          localField: "MaNXB", // Tên trường khóa ngoại trong collection SACH (lưu ID của NXB)
          foreignField: "_id", // Tên trường khóa chính trong collection NHAXUATBAN
          as: "nxb_info", // Tên field mới sẽ chứa thông tin NXB
        },
      },

      // 3. $unwind: (Tùy chọn)
      // Vì $lookup trả về mảng (ví dụ: nxb_info: [{...}]),
      // lệnh này giúp "bóc" nó ra thành object (nxb_info: {...}) cho dễ dùng.
      {
        $unwind: {
          path: "$nxb_info",
          preserveNullAndEmptyArrays: true, // Quan trọng: Nếu sách chưa có NXB thì vẫn hiện sách (Left Join)
        },
      },
    ]);
    return await cursor.toArray();
  }

  async findById(id) {
    const result = await this.find({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result[0] || null;
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractBookData(payload);

    const updatedBook = await this.Book.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" } // Trả về document sau khi update
    );

    if (!updatedBook) {
      return null;
    }

    const result = await this.find({ _id: updatedBook._id });
    return result[0];
  }

  async delete(id) {
    const result = await this.Book.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAll() {
    const result = await this.Book.deleteMany({});
    return result;
  }

  async reserveBook(maSach) {
    try {
      const book = await this.findById(maSach);

      console.log(book);
      if (book.SoQuyen > 0) {
        book.SoQuyen -= 1;
        await this.update(maSach, book);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async returnBook(maSach) {
    try {
      const book = await this.findById(maSach);
      book.SoQuyen += 1;
      await this.update(maSach, book);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = BookService;
