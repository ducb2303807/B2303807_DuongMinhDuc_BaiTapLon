<style scoped></style>

<template>
  <div class="page">
    <BookList ref="bookListComponent" @select-book="handleSelectBook">
      <template #actions="{ book }">
        <button
          class="btn btn-primary fw-bold px-4"
          :disabled="book.SoQuyen === 0"
          @click="openBorrowModal(book)"
        >
          <i class="fa-solid fa-book-bookmark me-1"></i>Mượn ngay
        </button>
      </template>
    </BookList>

    <BorrowBookModal
      v-if="showBorrowModal"
      :book="selectedBorrowBook"
      @close="showBorrowModal = false"
      @confirm="handleConfirmBorrow"
    ></BorrowBookModal>
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";
import BorrowBookModal from "@/components/BorrowBookModal.vue";
import BookBorrowService from "@/services/book-borrow.service";
export default {
  components: {
    BookList,
    BorrowBookModal,
  },
  data() {
    return {
      showBorrowModal: false,
      selectedBorrowBook: null,
    };
  },
  methods: {
    openBorrowModal(book) {
      this.selectedBorrowBook = book;
      this.showBorrowModal = true;
    },
    async handleConfirmBorrow(payload) {
      try {
        await BookBorrowService.create(payload);
        alert("Đăng ký mượn thành công!");

        this.$refs.bookListComponent.getAllBooks();

        this.showBorrowModal = false;
      } catch (error) {
        console.error(error);
        alert("Lỗi: " + error.message);
      }
    },
    handleSelectBook(book) {
      if (book) {
        this.$router.push({ name: "Book", params: { id: book._id } });
      } else {
        this.$router.push({ name: "Book" });
      }
    },
  },
};
</script>
