<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-primary fw-bold">Quản Lý Độc Giả</h2>
      <router-link class="btn btn-primary" :to="{ name: 'ReaderAdd' }">
        <i class="fas fa-plus me-1"></i> Thêm độc giả
      </router-link>
    </div>

    <ReaderList @select-reader="handleSelectReader" />
  </div>
</template>

<script>
import ReaderList from "@/components/ReaderList.vue";

export default {
  components: {
    ReaderList,
  },
  data() {
    return {};
  },
  methods: {
    handleSelectReader(reader) {
      if (reader) {
        // Giả định bạn có route 'AdminReader' nhận params id
        this.$router.push({ name: "AdminReader", params: { id: reader._id } });
      } else {
        this.$router.push({ name: "AdminReader" });
      }
    },
  },
};
</script>

<style scoped></style>
