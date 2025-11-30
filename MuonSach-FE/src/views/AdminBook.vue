<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-primary fw-bold">Quản Lý Sách</h2>
      <router-link class="btn btn-primary" :to="{ name: 'BookAdd' }">
        <i class="fas fa-plus me-1"></i> Thêm sách mới
      </router-link>
    </div>

    <BookList @select-book="handleSelectBook" />
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";

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
  },
};
</script>

<style scoped></style>
