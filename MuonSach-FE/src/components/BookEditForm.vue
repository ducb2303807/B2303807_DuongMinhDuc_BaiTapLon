<template>
  <div class="p-3">
    <Form
      class="mx-auto form-container"
      :validation-schema="bookFormSchema"
      :initial-values="localBook"
      @submit="saveChanges"
    >
      <div class="mb-3">
        <label for="TenSach" class="form-label small fw-bold text-secondary"
          >Tên sách</label
        >
        <Field
          id="TenSach"
          name="TenSach"
          type="text"
          class="form-control"
          placeholder="Nhập tên sách"
        />
        <ErrorMessage name="TenSach" class="text-danger small" />
      </div>

      <div class="mb-3">
        <label for="TacGia" class="form-label small fw-bold text-secondary"
          >Tác giả</label
        >
        <Field
          id="TacGia"
          name="TacGia"
          type="text"
          class="form-control"
          placeholder="Nhập tên tác giả"
        />
        <ErrorMessage name="TacGia" class="text-danger small" />
      </div>

      <div class="mb-3">
        <label for="MaNXB" class="form-label small fw-bold text-secondary"
          >Nhà xuất bản</label
        >
        <Field name="MaNXB" as="select" class="form-select">
          <option value="" disabled>-- Chọn Nhà Xuất Bản --</option>
          <option v-for="pub in publishers" :key="pub._id" :value="pub._id">
            {{ pub.TenNXB }}
          </option>
        </Field>
        <ErrorMessage name="MaNXB" class="text-danger small" />
      </div>

      <div class="row mb-3">
        <div class="col-6">
          <label
            for="NamXuatBan"
            class="form-label small fw-bold text-secondary"
            >Năm Xuất Bản</label
          >
          <Field
            id="NamXuatBan"
            name="NamXuatBan"
            type="number"
            class="form-control"
          />
          <ErrorMessage name="NamXuatBan" class="text-danger small" />
        </div>
        <div class="col-6">
          <label for="DonGia" class="form-label small fw-bold text-secondary"
            >Giá tiền sách</label
          >
          <Field id="DonGia" name="DonGia" type="number" class="form-control" />
          <ErrorMessage name="DonGia" class="text-danger small" />
        </div>
      </div>

      <div class="mb-3">
        <label for="SoQuyen" class="form-label small fw-bold text-secondary"
          >Số lượng tồn</label
        >
        <Field id="SoQuyen" name="SoQuyen" type="number" class="form-control" />
        <ErrorMessage name="SoQuyen" class="text-danger small" />
      </div>

      <div class="d-flex justify-content-end gap-2">
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
import PublisherService from "@/services/publisher.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    book: { Object, require: true },
  },
  emits: ["cancel-edit", "save-changes"],

  data() {
    const bookFormSchema = yup.object().shape({
      TenSach: yup
        .string()
        .required("Tên sách không được để trống")
        .min(2, "Tên sách phải có ít nhất 2 ký tự")
        .max(100, "Tên sách tối đa 100 ký tự"),

      TacGia: yup
        .string()
        .required("Tác giả không được để trống")
        .min(3, "Tác giả tối thiểu 3 ký tự")
        .max(50, "Tên tác giả tối đa 50 ký tự"),
      MaNXB: yup.string().required("Vui lòng chọn nhà xuất bản"),
      NamXuatBan: yup
        .number()
        .typeError("Năm xuất bản phải là số")
        .required("Năm xuất bản là bắt buộc")
        .min(1, "Năm không hợp lệ")
        .max(new Date().getFullYear(), "Năm không được lớn hơn hiện tại"),
      DonGia: yup
        .number()
        .typeError("Giá tiền phải là số")
        .required("Giá tiền là bắt buộc")
        .min(0, "Giá tiền không được âm"),
      SoQuyen: yup
        .number()
        .typeError("Số lượng phải là số")
        .required("Số lượng là bắt buộc")
        .integer("Số lượng phải là số nguyên")
        .min(0, "Số lượng không được âm"),
    });
    return {
      localBook: this.book,
      bookFormSchema,
      publishers: [],
    };
  },
  mounted() {
    this.getAllPublishers();
  },
  methods: {
    async getAllPublishers() {
      try {
        this.publishers = await PublisherService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    cancelEdit() {
      this.$emit("cancel-edit");
    },
    saveChanges(values) {
      const updatedBook = {
        ...this.localBook,
        ...values,
      };
      this.$emit("save-changes", updatedBook);
    },
  },
};
</script>
