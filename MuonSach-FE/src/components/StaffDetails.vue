<template>
  <div class="staff-details-container h-100 d-flex flex-column bg-white">
    <div
      class="d-flex justify-content-between align-items-center p-3 border-bottom shadow-sm"
    >
      <h5 class="mb-0 text-primary fw-bold">
        <i class="fas fa-id-card me-2"></i>Thông tin nhân viên
      </h5>
      <button class="btn-close" @click="$emit('close')"></button>
    </div>

    <div class="flex-grow-1 overflow-auto p-4 hide-scrollbar">
      <div v-if="!isEditing">
        <div
          class="text-center mb-4 bg-light rounded-3 p-4 border border-dashed"
        >
          <i class="fas fa-user-tie fa-4x text-primary opacity-75"></i>

          <h4 class="fw-bold mt-3 mb-1 text-dark text-break">
            {{ staff.HoTenNV }}
          </h4>

          <div class="text-muted small mb-3">@{{ staff.Username }}</div>

          <div class="badge bg-secondary px-3 py-2 rounded-pill">
            ID: {{ staff._id }}
          </div>
        </div>
        <div class="d-flex flex-column gap-3">
          <div class="row g-3">
            <div class="col-6">
              <div class="info-group">
                <label class="text-uppercase text-muted small fw-bold mb-1"
                  >Chức vụ</label
                >
                <div class="border-bottom pb-2 text-dark">
                  {{ staff.ChucVu }}
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="info-group">
                <label class="text-uppercase text-muted small fw-bold mb-1"
                  >Mật khẩu</label
                >
                <div class="border-bottom pb-2 text-dark">******</div>
              </div>
            </div>
          </div>

          <div class="info-group">
            <label class="text-uppercase text-muted small fw-bold mb-1"
              >Số điện thoại</label
            >
            <div class="fs-6 fw-medium text-dark border-bottom pb-2">
              <i class="fas fa-phone-alt me-2 text-secondary"></i
              >{{ staff.SoDienThoai }}
            </div>
          </div>

          <div class="info-group">
            <label class="text-uppercase text-muted small fw-bold mb-1"
              >Địa chỉ</label
            >
            <div class="fs-6 fw-medium text-dark border-bottom pb-2 text-break">
              <i class="fas fa-map-marker-alt me-2 text-secondary"></i
              >{{ staff.DiaChi }}
            </div>
          </div>

          <div class="d-flex justify-content-end gap-2 mt-3">
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
              @click="$emit('delete', staff._id)"
            >
              <i class="fas fa-trash me-1"></i>Xóa
            </button>
          </div>
        </div>
      </div>

      <div v-else>
        <h2 class="text-center text-uppercase mb-4">Cập nhật nhân viên</h2>
        <StaffEditForm
          :staff="staff"
          @save-changes="saveChanges"
          @cancel-edit="cancelEdit"
        ></StaffEditForm>
      </div>
    </div>
  </div>
</template>

<script>
import StaffEditForm from "@/components/StaffEditForm.vue";

export default {
  components: {
    StaffEditForm,
  },
  props: {
    staff: { type: Object, required: true },
  },
  emits: ["close", "save", "delete"],
  data() {
    return {
      isEditing: false,
    };
  },
  methods: {
    saveChanges(updatedStaff) {
      this.$emit("save", updatedStaff);
      this.isEditing = false;
    },
    cancelEdit() {
      this.isEditing = false;
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/details.css";
</style>
