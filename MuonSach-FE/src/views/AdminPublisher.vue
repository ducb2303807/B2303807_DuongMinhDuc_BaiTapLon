<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-primary fw-bold">Quản Lý Nhà Xuất Bản</h2>
      <router-link class="btn btn-primary" :to="{ name: 'PublisherAdd' }">
        <i class="fas fa-plus me-1"></i> Thêm NXB mới
      </router-link>
    </div>

    <PublisherList
      ref="publisherListComponent"
      @select-publisher="handleSelectPublisher"
      @request-update="onStaffUpdate"
    >
      <template #actions="{ publisher, enableEdit }">
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
            @click="onStaffDelete(publisher._id)"
          >
            <i class="fas fa-trash me-1"></i>Xóa
          </button>
        </div>
      </template>
    </PublisherList>
  </div>
</template>

<script>
import PublisherList from "@/components/PublisherList.vue";
import PublisherService from "@/services/publisher.service";

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
    async onStaffUpdate(updatedPubData) {
      try {
        await PublisherService.update(updatedPubData._id, updatedPubData);
        alert("Cập nhật thành công!");
        this.$refs.publisherListComponent.getAllPublishers();
      } catch (err) {
        alert("Lỗi khi cập nhật: " + err.message);
      }
    },

    // HÀM XÓA CỦA ADMIN
    async onStaffDelete(pubId) {
      if (!confirm("Bạn có chắc muốn xóa NXB này?")) return;
      try {
        await PublisherService.delete(pubId);
        alert("Đã xóa NXB thành công!");

        // Reload list
        this.$refs.publisherListComponent.getAllPublishers();
        // Clear selection nếu cần
        this.$refs.publisherListComponent.handleSelectPublisher({});
      } catch (err) {
        alert("Lỗi khi xóa: " + err.message);
      }
    },
  },
};
</script>

<style scoped></style>
