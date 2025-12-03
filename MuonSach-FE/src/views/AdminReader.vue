<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-primary fw-bold">Quản Lý Độc Giả</h2>
      <router-link class="btn btn-primary" :to="{ name: 'ReaderAdd' }">
        <i class="fas fa-plus me-1"></i> Thêm độc giả
      </router-link>
    </div>

    <ReaderList
      ref="readerListComponent"
      @request-update="onStaffUpdate"
      @select-reader="handleSelectReader"
    >
      <template #actions="{ reader, enableEdit }">
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
            @click="onStaffDelete(reader._id)"
          >
            <i class="fas fa-trash me-1"></i>Xóa
          </button>
        </div>
      </template>
    </ReaderList>
  </div>
</template>

<script>
import ReaderList from "@/components/ReaderList.vue";
import ReaderService from "@/services/reader.service";
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
        this.$router.push({ name: "AdminReader", params: { id: reader._id } });
      } else {
        this.$router.push({ name: "AdminReader" });
      }
    },
    async onStaffUpdate(updatedData) {
      try {
        await ReaderService.update(updatedData._id, updatedData);
        alert("Cập nhật độc giả thành công!");
        this.$refs.readerListComponent.getAllReaders();
      } catch (err) {
        alert("Lỗi cập nhật: " + err.message);
      }
    },

    async onStaffDelete(readerId) {
      if (!confirm("Bạn có chắc muốn xóa độc giả này không?")) return;
      try {
        await ReaderService.delete(readerId);
        alert("Đã xóa độc giả!");
        this.$refs.readerListComponent.getAllReaders();
        this.$refs.readerListComponent.handleSelectReader({});
      } catch (err) {
        alert("Lỗi xóa: " + err.message);
      }
    },
  },
};
</script>

<style scoped></style>
