<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-primary fw-bold">Quản Lý Sách</h2>
      <router-link class="btn btn-primary" :to="{ name: 'BookAdd' }">
        <i class="fas fa-plus me-1"></i> Thêm sách mới
      </router-link>
    </div>

    <BookList
      ref="bookListComponent"
      @select-book="handleSelectBook"
      @request-update="onStaffUpdate"
    >
      <template #actions="{ book, enableEdit }">
        <div class="d-flex justify-content-end gap-2">
          <button
            type="button"
            class="btn fw-bold px-4 btn-warning"
            @click="enableEdit()"
          >
            <i class="fas fa-edit me-1"></i>Sửa
          </button>

          <button
            type="button"
            class="btn btn-danger fw-bold px-4"
            @click="onStaffDelete(book._id)"
          >
            <i class="fas fa-trash me-1"></i>Xóa
          </button>
        </div>
      </template>
    </BookList>
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";
import BookService from "@/services/book.service";

export default {
  components: {
    BookList,
  },
  data() {
    return {};
  },
  methods: {
    handleSelectBook(book) {
      if (book) {
        this.$router.push({ name: "AdminBook", params: { id: book._id } });
      } else {
        this.$router.push({ name: "AdminBook" });
      }
    },
    async onStaffUpdate(updatedBookData) {
      try {
        // Gọi API cập nhật
        await BookService.update(updatedBookData._id, updatedBookData);
        alert("Admin cập nhật sách thành công!");

        this.$refs.bookListComponent.getAllBooks();
      } catch (err) {
        alert("Lỗi khi cập nhật: " + err.message);
      }
    },
    async onStaffDelete(bookId) {
      if (!confirm("Bạn có chắc chắn muốn xóa sách này không?")) return;

      try {
        await BookService.delete(bookId);
        alert("Đã xóa sách thành công!");

        this.$refs.bookListComponent.getAllBooks();
        this.$refs.bookListComponent.handleSelectBook({});
      } catch (err) {
        alert("Lỗi khi xóa: " + err.message);
      }
    },
  },
};
</script>

<style scoped></style>
