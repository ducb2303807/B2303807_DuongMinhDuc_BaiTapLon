<template>
  <div class="container pt-2">
    <h2 class="text-center text-uppercase text-primary fw-bold mb-4">
      Thêm độc giả mới
    </h2>
    <BookEditForm
      @save-changes="saveChanges"
      @cancel-edit="cancelEdit"
      :book="book"
    ></BookEditForm>
  </div>
</template>

<script>
import BookEditForm from "@/components/BookEditForm.vue";
import BookService from "@/services/book.service";

export default {
  components: {
    BookEditForm,
  },

  data() {
    this.book = {
      TenSach: "",
      DonGia: 0,
      SoQuyen: 0,
      NamXuatBan: 0,
      MaNXB: "",
      TacGia: "",
    };
    return {};
  },
  methods: {
    async saveChanges(book) {
      try {
        await BookService.create(book);
        alert("Thêm thành công");
        this.$router.push("/admin/books");
      } catch (error) {
        console.log(error);
      }
    },
    cancelEdit() {
      this.$router.push("/admin/books");
    },
  },
};
</script>
