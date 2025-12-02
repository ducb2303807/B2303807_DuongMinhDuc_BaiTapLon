<template>
  <div class="container py-4">
    <h2 class="mb-4 text-primary fw-bold">Quản Lý Mượn Trả Sách</h2>

    <BookBorrowList
      :borrows="borrows"
      :isAdmin="true"
      @approve="handleApprove"
      @reject="handleReject"
      @return="handleReturn"
      @refresh="fetchAllBorrows"
    />
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
    console.log(currentUser);
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
