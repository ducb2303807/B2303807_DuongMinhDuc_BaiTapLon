<template>
  <div class="reader-details-container h-100 d-flex flex-column bg-white">
    <div
      class="d-flex justify-content-between align-items-center p-3 border-bottom shadow-sm"
    >
      <h5 class="mb-0 text-primary fw-bold">
        <i class="fas fa-id-card me-2"></i>Chi tiết độc giả
      </h5>
      <button class="btn-close" @click="$emit('close')"></button>
    </div>

    <div class="flex-grow-1 overflow-auto p-4 hide-scrollbar">
      <div v-if="!isEditing">
        <div
          class="text-center mb-4 bg-light rounded-3 p-4 border border-dashed"
        >
          <i class="fas fa-user fa-4x text-primary opacity-75"></i>

          <h4 class="fw-bold mt-3 mb-1 text-dark text-break">
            {{ reader.HoLot }} {{ reader.Ten }}
          </h4>

          <div class="text-muted small mb-3">@{{ reader.Username }}</div>

          <div class="badge bg-secondary rounded-pill">
            ID: {{ reader._id }}
          </div>
        </div>

        <div class="d-flex flex-column gap-3">
          <div class="row g-3">
            <div class="col-6">
              <div class="info-group">
                <label class="text-uppercase text-muted small fw-bold mb-1"
                  >Ngày Sinh</label
                >
                <div class="border-bottom pb-2 text-dark">
                  {{ formatDate(reader.NgaySinh) }}
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="info-group">
                <label class="text-uppercase text-muted small fw-bold mb-1"
                  >Giới tính</label
                >
                <div class="border-bottom pb-2 text-dark">
                  {{ reader.Phai }}
                </div>
              </div>
            </div>
          </div>

          <div class="info-group">
            <label class="text-uppercase text-muted small fw-bold mb-1"
              >Số điện thoại</label
            >
            <div class="fs-6 fw-medium text-dark border-bottom pb-2">
              <i class="fas fa-phone-alt me-2 text-secondary"></i
              >{{ reader.SoDienThoai }}
            </div>
          </div>

          <div class="info-group">
            <label class="text-uppercase text-muted small fw-bold mb-1"
              >Địa chỉ</label
            >
            <div class="fs-6 fw-medium text-dark border-bottom pb-2 text-break">
              <i class="fas fa-map-marker-alt me-2 text-secondary"></i
              >{{ reader.DiaChi }}
            </div>
          </div>

          <div class="d-flex justify-content-end gap-2 mt-3">
            <slot
              name="actions"
              :reader="reader"
              :enableEdit="() => (isEditing = true)"
            >
            </slot>
          </div>
        </div>
      </div>

      <div v-else>
        <h2 class="text-center text-uppercase mb-4">Cập nhật độc giả</h2>
        <ReaderEditForm
          :reader="reader"
          @save-changes="saveChanges"
          @cancel-edit="cancelEdit"
        ></ReaderEditForm>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils/format-date.utils";
import ReaderEditForm from "@/components/ReaderEditForm.vue";

export default {
  components: { ReaderEditForm },
  props: {
    reader: { type: Object, required: true },
  },
  emits: ["close", "save"],
  data() {
    return { isEditing: false };
  },
  methods: {
    formatDate,
    saveChanges(updatedReader) {
      this.$emit("save", updatedReader);
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
