<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-primary fw-bold">Quản Lý Nhà Xuất Bản</h2>
      <router-link class="btn btn-primary" :to="{ name: 'PublisherAdd' }">
        <i class="fas fa-plus me-1"></i> Thêm NXB mới
      </router-link>
    </div>

    <PublisherList @select-publisher="handleSelectPublisher" />
  </div>
</template>

<script>
import PublisherList from "@/components/PublisherList.vue";

export default {
  components: {
    PublisherList,
  },
  data() {
    return {};
  },
  methods: {
    handleSelectPublisher(publisher) {
      if (publisher) {
        this.$router.push({
          name: "AdminPublisher",
          params: { id: publisher._id },
        });
      } else {
        this.$router.push({ name: "AdminPublisher" });
      }
    },
  },
};
</script>

<style scoped></style>
