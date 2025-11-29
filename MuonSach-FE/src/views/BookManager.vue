<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-primary fw-bold">Quản Lý Sách</h2>
      <router-link class="btn btn-primary" :to="{ name: 'BookAdd' }">
        <i class="fas fa-plus me-1"></i> Thêm sách mới
      </router-link>
    </div>

    <BookList />
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
};
</script>

<style scoped></style>
