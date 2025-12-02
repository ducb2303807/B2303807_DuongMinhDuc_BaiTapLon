<template>
  <div class="page container py-4">
    <h2 class="mb-4 text-success fw-bold">Lịch Sử Mượn Sách</h2>

    <BookBorrowList :borrows="borrows" @cancel="handleCancel" />
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
