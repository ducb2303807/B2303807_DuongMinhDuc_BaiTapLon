<template>
  <div class="p-3">
    <Form
      class="mx-auto form-container"
      :validation-schema="publisherFormSchema"
      :initial-values="localPublisher"
      @submit="saveChanges"
    >
      <div class="mb-3">
        <label for="TenNXB" class="form-label small fw-bold text-secondary"
          >Tên Nhà Xuất Bản</label
        >
        <Field
          id="TenNXB"
          name="TenNXB"
          type="text"
          class="form-control"
          placeholder="Nhập tên nhà xuất bản"
        />
        <ErrorMessage name="TenNXB" class="text-danger small" />
      </div>

      <div class="mb-3">
        <label for="DiaChi" class="form-label small fw-bold text-secondary"
          >Địa Chỉ</label
        >
        <Field
          id="DiaChi"
          name="DiaChi"
          type="text"
          class="form-control"
          placeholder="Nhập địa chỉ"
        />
        <ErrorMessage name="DiaChi" class="text-danger small" />
      </div>

      <div class="d-flex justify-content-end gap-2 mt-4">
        <button
          type="button"
          class="btn btn-secondary px-4"
          @click="cancelEdit"
        >
          Hủy bỏ
        </button>
        <button type="submit" class="btn btn-primary fw-bold px-4">
          <i class="fas fa-save me-1"></i> Lưu lại
        </button>
      </div>
    </Form>
  </div>
</template>

<style scoped>
@import "@/assets/css/form.css";
</style>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    publisher: { type: Object, required: true },
  },
  emits: ["cancel-edit", "save-changes"],

  data() {
    const publisherFormSchema = yup.object().shape({
      TenNXB: yup
        .string()
        .required("Tên nhà xuất bản không được để trống")
        .min(2, "Tên phải có ít nhất 2 ký tự"),
      DiaChi: yup
        .string()
        .required("Địa chỉ không được để trống")
        .max(100, "Địa chỉ tối đa 100 ký tự"),
    });
    return {
      localPublisher: this.publisher,
      publisherFormSchema,
    };
  },
  methods: {
    cancelEdit() {
      this.$emit("cancel-edit");
    },
    saveChanges(values) {
      const updatedPublisher = {
        ...this.localPublisher,
        ...values,
      };
      this.$emit("save-changes", updatedPublisher);
    },
  },
};
</script>
