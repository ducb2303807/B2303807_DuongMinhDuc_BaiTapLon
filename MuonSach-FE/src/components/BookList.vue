<template>
  <div class="page container-fluid p-0 fixed-page-height d-flex flex-column">
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
            @click="selectedBook = book"
            class="list-group-item list-group-item-action py-3 border-bottom"
            :class="{ active: selectedBook && selectedBook._id === book._id }"
          >
            <div class="d-flex justify-content-between align-items-center">
              <div class="me-3 overflow-hidden">
                <h6 class="mb-1 fw-bold text-truncate">{{ book.TenSach }}</h6>
                <div class="small text-muted d-flex flex-column">
                  <span>Tác giả: {{ book.TacGia }}</span>
                  <span>NXB: {{ book.nxb_info?.TenNXB }}</span>
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
            :publishers="publishers"
            @close="selectedBook = null"
            @save="handleUpdateBook"
            @delete="handleDeleteBook"
          />
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
import BookCard from "@/components/BookCard.vue";
import BookDetails from "@/components/BookDetails.vue";
import SearchField from "@/components/SearchField.vue";
import PublisherService from "@/services/publisher.service";
export default {
  name: "BookList",
  components: {
    BookCard,
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
      publishers: [],
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
  mounted() {
    this.getAllBooks();
  },
  methods: {
    async getAllBooks() {
      this.loading = true;
      try {
        const bookList = await BookService.getAll();
        this.books = bookList;
        await this.getAllPublishers();
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        this.loading = false;
      }
    },
    async getAllPublishers() {
      try {
        this.publishers = await PublisherService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    updateSearchQuery(val) {
      this.searchQuery = val;
    },
    handleSelectBook(book) {
      // Nếu đang chọn đúng sách đó thì đóng lại (toggle)
      if (this.selectedBook && this.selectedBook._id === book._id) {
        this.selectedBook = null;
      } else {
        this.selectedBook = book;
      }
    },

    async handleUpdateBook(updatedBookData) {
      try {
        // Cập nhật lại UI Local
        const index = this.books.findIndex((b) => b.id === updatedBookData.id);
        if (index !== -1) {
          this.books.splice(index, 1, updatedBookData);
        }

        alert("Cập nhật thành công!");
      } catch (err) {
        alert("Lỗi khi cập nhật: " + err.message);
      }
    },

    async handleDeleteBook(bookId) {
      if (!confirm("Bạn có chắc muốn xóa sách này?")) return;

      try {
        // await axios.delete(`http://localhost:3000/api/books/${bookId}`);
        this.books = this.books.filter((b) => b.id !== bookId);
        this.isSidebarOpen = false;
        alert("Đã xóa sách!");
      } catch (err) {
        alert("Lỗi khi xóa: " + err.message);
      }
    },

    formatCurrency(value) {
      if (!value) return "0 ₫";
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/book-list.css";
</style>
