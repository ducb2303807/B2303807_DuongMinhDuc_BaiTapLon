import createApiClient from "./api.service";

class BookBorrowService {
  constructor(baseUrl) {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }
  async create(data) {
    return (await this.api.post("/", data)).data;
  }
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }
  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export const adminBookBorrowService = new BookBorrowService(
  "/api/admin/book-borrows"
);
export const userBookBorrowService = new BookBorrowService(
  "/api/user/:id/book-borrows"
);
