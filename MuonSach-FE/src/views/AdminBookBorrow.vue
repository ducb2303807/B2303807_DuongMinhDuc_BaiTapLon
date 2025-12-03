<template>
  <div class="page container py-4">
    <h2 class="mb-4 text-primary fw-bold">Quản Lý Mượn Trả Sách</h2>

    <BookBorrowList
      :borrows="borrows"
      :isAdmin="true"
      @refresh="fetchAllBorrows"
    >
      <template #actions="{ item }">
        <div
          class="d-flex flex-column gap-2 flex-md-row justify-content-end"
          v-if="item.TrangThai === 'Chờ duyệt'"
        >
          <button
            class="btn btn-icon btn-light-success"
            @click="handleApprove(item)"
            title="Duyệt"
          >
            <i class="fas fa-check"></i>
          </button>
          <button
            class="btn btn-icon btn-light-danger"
            @click="handleReject(item)"
            title="Từ chối"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div v-else-if="item.TrangThai === 'Đang mượn'">
          <button
            class="btn btn-sm btn-primary px-3 rounded-pill shadow-sm"
            @click="handleReturn(item)"
          >
            <i class="fas fa-undo me-1"></i> Trả sách
          </button>
        </div>

        <span v-else class="text-muted opacity-50">
          <i class="fas fa-lock"></i>
        </span>
      </template>
    </BookBorrowList>
  </div>
</template>

<script>
import BookBorrowList from "@/components/BookBorrowList.vue";
import BookBorrowService from "@/services/book-borrow.service";
import { getUserData } from "@/utils/auth.utils";
export default {
  components: { BookBorrowList },
  data() {
    const currentUser = getUserData();
    return {
      borrows: [],
      currentUser,
    };
  },
  methods: {
    getUserData,
    async fetchAllBorrows() {
      try {
        this.borrows = await BookBorrowService.getAll();
        // this.borrows.sort(
        //   (a, b) => new Date(b.NgayMuon) - new Date(a.NgayMuon)
        // );
      } catch (error) {
        console.error(error);
      }
    },

    async updateStatus(id, status) {
      try {
        const staffId = this.currentUser._id;

        const payload = {
          TrangThai: status,
          MaNhanVien: staffId,
        };
        const updated = await BookBorrowService.update(id, payload);

        alert("Cập nhật thành công!");
        this.fetchAllBorrows(); // Load lại danh sách
      } catch (error) {
        alert("Lỗi: " + error.message);
      }
    },

    // Các handler bắt sự kiện từ con
    handleApprove(item) {
      if (confirm("Duyệt phiếu mượn này?"))
        this.updateStatus(item._id, "Đang mượn");
    },
    handleReject(item) {
      if (confirm("Từ chối phiếu mượn này?"))
        this.updateStatus(item._id, "Đã từ chối");
    },
    handleReturn(item) {
      if (confirm("Xác nhận đã nhận lại sách?"))
        this.updateStatus(item._id, "Đã trả");
    },
  },
  mounted() {
    this.fetchAllBorrows();
  },
};
</script>

<style scoped>
@import "@/assets/css/book-borrow-list.css";
</style>
