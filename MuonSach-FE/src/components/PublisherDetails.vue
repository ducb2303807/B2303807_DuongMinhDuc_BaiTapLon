<template>
  <div class="book-details-container h-100 d-flex flex-column bg-white">
    <div
      class="d-flex justify-content-between align-items-center p-3 border-bottom shadow-sm"
    >
      <h5 class="mb-0 text-primary fw-bold">
        <i class="fas fa-info-circle me-2"></i>Chi tiết NXB
      </h5>
      <button class="btn-close" @click="$emit('close')"></button>
    </div>

    <div class="flex-grow-1 overflow-auto p-4 hide-scrollbar">
      <div v-if="!isEditing">
        <div
          class="text-center mb-4 bg-light rounded-3 p-4 border border-dashed"
        >
          <i class="fas fa-building fa-4x text-primary opacity-75"></i>
          <h4 class="fw-bold mt-3 mb-1 text-dark text-break">
            {{ publisher.TenNXB }}
          </h4>
          <div class="badge bg-secondary rounded-pill">
            ID: {{ publisher._id }}
          </div>
        </div>

        <div class="card border-0 shadow-sm bg-light mb-4">
          <div class="card-body">
            <h6 class="text-uppercase text-muted small fw-bold mb-2">
              <i class="fas fa-map-marked-alt me-2"></i>Địa chỉ liên hệ
            </h6>
            <p class="mb-0 fs-6 fw-medium text-dark">
              {{ publisher.DiaChi }}
            </p>
          </div>
        </div>

        <div class="d-flex justify-content-end gap-2 mt-5">
          <slot
            name="actions"
            :publisher="publisher"
            :enableEdit="() => (isEditing = true)"
          >
          </slot>
        </div>
      </div>

      <div v-else>
        <h4 class="text-center text-uppercase text-primary fw-bold mb-4">
          Cập nhật thông tin
        </h4>
        <PublisherEditForm
          :publisher="publisher"
          @save-changes="saveChanges"
          @cancel-edit="cancelEdit"
        ></PublisherEditForm>
      </div>
    </div>
  </div>
</template>

<script>
import PublisherEditForm from "@/components/PublisherEditForm.vue";

export default {
  components: {
    PublisherEditForm,
  },
  props: {
    publisher: { type: Object, required: true },
  },
  emits: ["close", "save"],
  data() {
    return {
      isEditing: false,
    };
  },
  methods: {
    saveChanges(updatedPub) {
      this.$emit("save", updatedPub);
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
