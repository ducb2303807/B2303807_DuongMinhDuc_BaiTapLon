import createApiClient from "./api.service";

class ReaderService {
  constructor(baseUrl) {
    this.api = createApiClient(baseUrl);
  }
}

export const adminReaderService = new ReaderService("/api/admin/readers");
// export const userReaderService = new ReaderService("/api/user/readers");
