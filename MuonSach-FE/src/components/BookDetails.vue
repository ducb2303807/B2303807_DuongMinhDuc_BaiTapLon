<template>
  <div class="book-details-container h-100 d-flex flex-column bg-white">
    <div
      class="d-flex justify-content-between align-items-center p-3 border-bottom shadow-sm"
    >
      <h5 class="mb-0 text-primary fw-bold">
        <i class="fas fa-info-circle me-2"></i>Chi tiết sách
      </h5>
      <button class="btn-close" @click="$emit('close')"></button>
    </div>

    <div class="flex-grow-1 overflow-auto p-4 hide-scrollbar">
      <!-- // xem // -->
      <div v-if="!isEditing">
        <div
          class="text-center mb-4 bg-light rounded-3 p-4 border border-dashed"
        >
          <i class="fas fa-book fa-4x text-primary opacity-75"></i>
          <h4 class="fw-bold mt-3 mb-1 text-dark text-break">
            {{ book.TenSach }}
          </h4>
          <div class="badge bg-secondary rounded-pill">ID: {{ book._id }}</div>
        </div>

        <div class="d-flex flex-column gap-3">
          <div class="info-group">
            <label class="text-uppercase text-muted small fw-bold mb-1"
              >Tác giả</label
            >
            <div class="fs-6 fw-medium text-dark border-bottom pb-2 text-break">
              <i class="fas fa-user-pen me-2 text-secondary"></i
              >{{ book.TacGia }}
            </div>
          </div>

          <div class="row g-3">
            <div class="col-8">
              <div class="info-group">
                <label class="text-uppercase text-muted small fw-bold mb-1"
                  >Nhà xuất bản</label
                >
                <div class="border-bottom pb-2 text-truncate text-break">
                  {{ book.nxb_info?.TenNXB || "Chưa cập nhật" }}
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="info-group">
                <label class="text-uppercase text-muted small fw-bold mb-1"
                  >Năm xuất bản</label
                >
                <div class="border-bottom pb-2 fw-bold text-dark">
                  {{ book.NamXuatBan || "---" }}
                </div>
              </div>
            </div>
          </div>

          <div class="row g-3">
            <div class="col-6">
              <div class="p-3 bg-light rounded border">
                <label
                  class="d-block text-uppercase text-muted small fw-bold mb-1"
                  >Giá tiền sách</label
                >
                <div class="text-primary fw-bold fs-5">
                  {{ formatCurrency(book.DonGia) }}
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="p-3 bg-light rounded border">
                <label
                  class="d-block text-uppercase text-muted small fw-bold mb-1"
                  >Tồn kho</label
                >
                <div
                  class="fw-bold fs-5"
                  :class="book.SoQuyen > 0 ? 'text-success' : 'text-danger'"
                >
                  {{ book.SoQuyen }}
                </div>
              </div>
            </div>
          </div>
          <!-- // button // -->
          <div v-if="isStaff()" class="d-flex justify-content-end gap-2">
            <div class="d-flex justify-content-end gap-2">
              <button
                type="button"
                class="btn fw-bold px-4 btn-warning"
                @click="isEditing = true"
              >
                <i class="fas fa-edit me-1"></i>Sửa
              </button>
              <button
                type="button"
                class="btn btn-danger fw-bold px-4"
                @click="$emit('delete', book._id)"
              >
                <i class="fas fa-trash me-1"></i>Xóa
              </button>
            </div>
          </div>

          <div v-else class="d-flex justify-content-end">
            <button
              type="button"
              class="btn btn-primary fw-bold px-4"
              :disabled="book.SoQuyen === 0"
              @click="showBorrowModal = true"
            >
              <i class="fa-solid fa-book-bookmark me-1"></i>Mượn sách
            </button>
          </div>
        </div>
      </div>

      <!-- // Edit // -->
      <div v-else>
        <h2 class="text-center text-uppercase">Chỉnh sửa sách</h2>
        <BookEditForm
          :book="book"
          @save-changes="saveChanges"
          @cancel-edit="cancelEdit"
        ></BookEditForm>
      </div>
    </div>

    <BorrowBookModal
      v-if="showBorrowModal"
      :book="book"
      @close="showBorrowModal = false"
      @confirm="handleConfirmBorrow"
    />
  </div>
</template>

<script>
import { isStaff } from "@/utils/auth.utils";
import { formatCurrency } from "@/utils/format-currency.utils";
import BookEditForm from "@/components/BookEditForm.vue";
import BorrowBookModal from "@/components/BorrowBookModal.vue";
import BookBorrowService from "@/services/book-borrow.service";

export default {
  components: {
    BookEditForm,
    BorrowBookModal,
  },
  props: {
    book: { Object, required: true },
  },
  emits: ["close", "save", "delete", "sync-book"],
  data() {
    return {
      isEditing: false,
      showBorrowModal: false,
    };
  },
  methods: {
    formatCurrency,
    isStaff,
    saveChanges(book) {
      this.$emit("save", book);
      this.isEditing = false;
    },
    cancelEdit() {
      this.isEditing = false;
    },
    async handleConfirmBorrow(payload) {
      try {
        await BookBorrowService.create(payload);
        alert(
          "Đăng ký mượn sách thành công! Bạn có thể đến thư viện mượn sách"
        );

        const updatedBook = { ...this.book };
        updatedBook.SoQuyen = updatedBook.SoQuyen - 1;

        console.log(updatedBook);
        this.$emit("sync-book", updatedBook);
        this.showBorrowModal = false;
      } catch (error) {
        console.error(error);
        alert(
          "Lỗi khi mượn sách: " +
            (error.response?.data?.message || error.message)
        );
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/details.css";
</style>
