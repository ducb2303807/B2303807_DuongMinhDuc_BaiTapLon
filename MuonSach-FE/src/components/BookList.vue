<template>
  <div
    class="page p-3 container-fluid p-0 fixed-page-height d-flex flex-column"
  >
    <div class="row mb-4 align-items-center">
      <div class="col-md-6">
        <h2 class="text-primary fw-bold">
          <i class="fas fa-book-open me-2"></i>Danh sách các quyển sách
        </h2>
      </div>
      <div class="col-md-6">
        <SearchField
          :placeHolder="searchPlaceholder"
          @update:search-query="updateSearchQuery"
          @refresh="getAllBooks"
        ></SearchField>
      </div>
    </div>

    <!-- // loading // -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2 text-muted">Đang tải dữ liệu...</p>
    </div>

    <!-- // show ds sách // -->

    <div v-else class="main-layout border rounded shadow-sm bg-white">
      <div class="list-column d-flex flex-column">
        <div
          class="list-group list-group-flush flex-grow-1 overflow-auto custom-scrollbar"
        >
          <button
            v-for="book in filteredBooks"
            :key="book._id"
            @click="handleSelectBook(book)"
            class="list-group-item list-group-item-action py-3 border-bottom"
            :class="{ active: selectedBook && selectedBook._id === book._id }"
          >
            <div class="d-flex justify-content-between align-items-center">
              <div class="me-3 overflow-hidden">
                <h6 class="mb-1 fw-bold text-truncate">
                  Sách: {{ book.TenSach }}
                </h6>
                <div class="small text-muted d-flex flex-column">
                  <span>Tác giả: {{ book.TacGia }}</span>
                  <span>Nhà xuất bản: {{ book.nxb_info?.TenNXB }}</span>
                </div>
              </div>
              <span
                class="badge rounded-pill bg-light text-dark border text-nowrap"
              >
                SL: {{ book.SoQuyen }}
              </span>
            </div>
          </button>
          <div
            v-if="filteredBooks.length === 0"
            class="text-center mx-auto my-auto"
          >
            <i class="fas fa-box-open fa-3x text-muted mb-3"></i>
            <p>Không tìm thấy sách nào phù hợp.</p>
          </div>
        </div>
      </div>

      <div
        class="detail-column border-start"
        :class="{ 'show-mobile': selectedBook }"
      >
        <div v-if="selectedBook" class="h-100 bg-white">
          <BookDetails
            :book="selectedBook"
            @close="handleSelectBook({})"
            @save="handleUpdateBook"
            @delete="handleDeleteBook"
          >
            <template #actions="{ book, enableEdit }">
              <slot name="actions" :book="book" :enableEdit="enableEdit"></slot>
            </template>
          </BookDetails>
        </div>

        <div
          v-else
          class="h-100 d-flex flex-column align-items-center justify-content-center bg-light text-muted"
        >
          <i class="fas fa-book-open fa-3x mb-3 opacity-25"></i>
          <p>Chọn sách để xem thông tin chi tiết</p>
        </div>
      </div>
    </div>

    <div
      v-if="!loading && filteredBooks.length === 0"
      class="text-center py-5"
    ></div>
  </div>
</template>

<script>
import BookService from "@/services/book.service";
import BookDetails from "@/components/BookDetails.vue";
import SearchField from "@/components/SearchField.vue";
export default {
  name: "BookList",
  components: {
    BookDetails,
    SearchField,
  },
  emits: ["select-book"],
  data() {
    return {
      books: [],
      loading: false,
      searchQuery: "",
      searchPlaceholder: "Nhập tên sách, tác giả...",
      selectedBook: null,
    };
  },
  computed: {
    filteredBooks() {
      if (!this.searchQuery) return this.books;
      const lowerSearch = this.searchQuery.toLowerCase();
      return this.books.filter(
        (book) =>
          book.TenSach.toLowerCase().includes(lowerSearch) ||
          book.TacGia.toLowerCase().includes(lowerSearch)
      );
    },
  },
  watch: {
    "$route.params.id": {
      immediate: true, // Chạy ngay lập tức khi component được load
      handler(newId) {
        this.syncSelectedBook(newId);
      },
    },
  },
  mounted() {
    this.getAllBooks();
  },
  methods: {
    async getAllBooks() {
      this.loading = true;
      try {
        this.books = await BookService.getAll();

        const currentIdFromUrl = this.$route.params.id;
        if (currentIdFromUrl) {
          this.syncSelectedBook(currentIdFromUrl);
        }
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        this.loading = false;
      }
    },
    syncSelectedBook(bookId) {
      if (bookId && this.books.length > 0) {
        // Tìm sách trong list đã load
        const foundBook = this.books.find((b) => b._id === bookId);
        this.selectedBook = foundBook || null;
      } else {
        this.selectedBook = null;
      }
    },
    updateSearchQuery(val) {
      this.searchQuery = val;
    },
    handleSelectBook(book) {
      if (
        !book._id ||
        (this.selectedBook && this.selectedBook._id === book._id)
      ) {
        this.selectedBook = null;
      } else {
        this.selectedBook = book;
      }
      this.$emit("select-book", this.selectedBook);
    },
    handleUpdateBook(updatedBookData) {
      // Báo cáo: "Sếp Admin ơi, có người muốn sửa sách này!"
      this.$emit("request-update", updatedBookData);
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/book-list.css";
</style>
