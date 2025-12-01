const { ObjectId } = require("mongodb");

class PublisherService {
  constructor(client) {
    this.Publisher = client.db().collection("NhaXuatBan");
  }

  extractPublisherData(payload) {
    const publisher = {
      TenNXB: payload.TenNXB,
      DiaChi: payload.DiaChi,
    };
    // remove undefined fields
    Object.keys(publisher).forEach(
      (key) => publisher[key] === undefined && delete publisher[key]
    );
    return publisher;
  }

  async create(payload) {
    const publisher = this.extractPublisherData(payload);
    const result = await this.Publisher.findOneAndUpdate(
      publisher,
      { $set: {} },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
    return result;
  }

  async find(filter) {
    const cursor = await this.Publisher.find(filter);
    return await cursor.toArray();
  }

  async findById(id) {
    const publisher = await this.find({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return publisher[0] || null;
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractPublisherData(payload);
    const updatedPublisher = await this.Publisher.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    if (!updatedPublisher) {
      return null;
    }

    const result = await this.find({ _id: updatedPublisher._id });
    return result[0];
  }

  async delete(id) {
    const result = await this.Publisher.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAll() {
    const result = await this.Publisher.deleteMany({});
    return result;
  }
}

module.exports = PublisherService;
