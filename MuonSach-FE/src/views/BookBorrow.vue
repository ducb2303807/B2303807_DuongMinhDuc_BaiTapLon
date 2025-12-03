<template>
  <div class="page container py-4">
    <h2 class="mb-4 text-success fw-bold">Lịch Sử Mượn Sách</h2>

    <BookBorrowList :borrows="borrows" @refresh="fetchMyBorrows">
      <template #actions="{ item }">
        <button
          v-if="item.TrangThai === 'Chờ duyệt'"
          class="btn btn-sm btn-outline-danger rounded-pill px-3"
          @click="handleCancel(item)"
        >
          Hủy yêu cầu
        </button>

        <span v-else class="text-success small fw-bold">
          <i class="fas fa-check-circle me-1"></i>Hoàn tất
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
    async fetchMyBorrows() {
      try {
        if (!this.currentUser) return;

        // Truyền params để lọc theo MaDocGia
        this.borrows = await BookBorrowService.getAll({
          MaDocGia: this.currentUser._id,
        });
      } catch (error) {
        console.error(error);
      }
    },

    async handleCancel(item) {
      if (!confirm("Bạn muốn hủy yêu cầu này?")) return;
      try {
        await BookBorrowService.delete(item._id);
        alert("Đã hủy yêu cầu.");
        await this.fetchMyBorrows(); // Load lại danh sách
      } catch (error) {
        alert("Lỗi: " + error.message);
      }
    },
  },
  mounted() {
    this.fetchMyBorrows();
  },
};
</script>
