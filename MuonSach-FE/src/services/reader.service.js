import createApiClient from "./api.service";

class ReaderService {
  constructor(baseUrl) {
    this.api = createApiClient(baseUrl);
  }
  async getAll(data = {}) {
    return (await this.api.get("/", { params: data })).data;
  }
  async create(data) {
    return (await this.api.post("/", data)).data;
  }
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }
  async login(data) {
    return (await this.api.post("/login", data)).data;
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

export default new ReaderService("/api/readers");
