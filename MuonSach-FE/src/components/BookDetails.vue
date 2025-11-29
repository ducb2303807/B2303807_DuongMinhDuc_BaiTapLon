<template>
  <div class="book-details-container h-100 d-flex flex-column bg-white">
    <div
      class="d-flex justify-content-between align-items-center p-3 border-bottom shadow-sm"
    >
      <h5 class="mb-0 text-primary fw-bold">
        <i class="fas fa-info-circle me-2"></i>Chi tiết sách
      </h5>
      <button class="btn-close" @click="$emit('close')"></button>
    </div>

    <div class="flex-grow-1 overflow-auto p-4 hide-scrollbar">
      <!-- // xem // -->
      <div v-if="!isEditing">
        <h4 class="fw-bold mb-3 text-break text-dark">
          {{ localBook.TenSach }}
        </h4>

        <div
          class="text-center mb-4 bg-light rounded-3 p-4 border border-dashed"
        >
          <i class="fas fa-book fa-4x text-muted opacity-50"></i>
        </div>

        <div class="d-flex flex-column gap-3">
          <div class="info-group">
            <label class="text-uppercase text-muted small fw-bold mb-1"
              >Tác giả</label
            >
            <div class="fs-6 fw-medium text-dark border-bottom pb-2">
              <i class="fas fa-user-pen me-2 text-secondary"></i
              >{{ localBook.TacGia }}
            </div>
          </div>

          <div class="row g-3">
            <div class="col-8">
              <div class="info-group">
                <label class="text-uppercase text-muted small fw-bold mb-1"
                  >Nhà xuất bản</label
                >
                <div class="border-bottom pb-2 text-truncate">
                  {{ localBook.nxb_info?.TenNXB || "Chưa cập nhật" }}
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="info-group">
                <label class="text-uppercase text-muted small fw-bold mb-1"
                  >Năm XB</label
                >
                <div class="border-bottom pb-2 fw-bold text-dark">
                  {{ localBook.NamXuatBan || "---" }}
                </div>
              </div>
            </div>
          </div>

          <div class="row g-3">
            <div class="col-6">
              <div class="p-3 bg-light rounded border">
                <label
                  class="d-block text-uppercase text-muted small fw-bold mb-1"
                  >Giá tiền</label
                >
                <div class="text-primary fw-bold fs-5">
                  {{ formatCurrency(localBook.DonGia) }}
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="p-3 bg-light rounded border">
                <label
                  class="d-block text-uppercase text-muted small fw-bold mb-1"
                  >Tồn kho</label
                >
                <div
                  class="fw-bold fs-5"
                  :class="
                    localBook.SoQuyen > 0 ? 'text-success' : 'text-danger'
                  "
                >
                  {{ localBook.SoQuyen }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- // Edit // -->
      <div v-else>
        <h5 class="mb-3 fw-bold text-warning text-dark-emphasis">
          <i class="fas fa-edit me-2"></i>Cập nhật thông tin
        </h5>

        <Form
          ref="formRef"
          :validation-schema="bookFormSchema"
          :initial-values="editingData"
          @submit="submitEdit"
        >
          <div class="mb-3">
            <label for="TenSach" class="form-label small fw-bold text-secondary"
              >Tên sách</label
            >
            <Field
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
              <Field name="NamXuatBan" type="number" class="form-control" />
              <ErrorMessage name="NamXuatBan" class="text-danger small" />
            </div>
            <div class="col-6">
              <label
                for="DonGia"
                class="form-label small fw-bold text-secondary"
                >Giá tiền</label
              >
              <Field name="DonGia" type="number" class="form-control" />
              <ErrorMessage name="DonGia" class="text-danger small" />
            </div>
          </div>

          <div class="mb-3">
            <label for="SoQuyen" class="form-label small fw-bold text-secondary"
              >Số lượng tồn</label
            >
            <Field name="SoQuyen" type="number" class="form-control" />
            <ErrorMessage name="SoQuyen" class="text-danger small" />
          </div>
        </Form>
      </div>
    </div>

    <div
      class="p-3 border-top bg-light d-flex gap-2 justify-content-end shadow-inner-top"
    >
      <template v-if="!isEditing">
        <button
          class="btn btn-warning fw-bold px-4 shadow-sm"
          @click="isEditing = true"
        >
          <i class="fas fa-edit me-1"></i> Sửa
        </button>
        <button
          class="btn btn-outline-danger px-4 shadow-sm"
          @click="$emit('delete', localBook._id)"
        >
          <i class="fas fa-trash-alt me-1"></i> Xóa
        </button>
      </template>

      <template v-else>
        <button
          type="button"
          class="btn btn-secondary px-4"
          @click="cancelEdit"
        >
          Hủy bỏ
        </button>
        <button
          type="button"
          class="btn btn-primary fw-bold px-4"
          @click="saveChanges"
        >
          <i class="fas fa-save me-1"></i> Lưu lại
        </button>
      </template>
    </div>
  </div>
</template>

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
    book: { Object, required: true },
    publishers: { Array, require: true, default: () => [] },
  },
  emits: ["close", "save", "delete"],
  data() {
    const bookFormSchema = yup.object().shape({
      TenSach: yup
        .string()
        .required("Tên sách không được để trống")
        .min(2, "Tên sách phải có ít nhất 2 ký tự"),
      TacGia: yup.string().required("Tác giả không được để trống"),
      MaNXB: yup.string().required("Vui lòng chọn nhà xuất bản"),
      NamXuatBan: yup
        .number()
        .typeError("Năm xuất bản phải là số")
        .required("Năm xuất bản là bắt buộc")
        .min(1000, "Năm không hợp lệ")
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
      isEditing: false,
      localBook: {},
      editingData: {},
      bookFormSchema,
    };
  },
  watch: {
    book: {
      immediate: true,
      handler(newVal) {
        // Mỗi khi prop book thay đổi, reset lại dữ liệu local
        this.localBook = { ...newVal };
        this.editingData = { ...newVal };

        if (
          this.editingData.MaNXB &&
          typeof this.editingData.MaNXB === "object"
        ) {
          this.editingData.MaNXB = this.editingData.MaNXB._id;
        }
        this.isEditing = false;
      },
    },
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
    submitEdit(values) {
      const payload = {
        ...values,
        _id: this.localBook._id,
      };

      this.$emit("save", payload);
    },
    cancelEdit() {
      this.isEditing = false;
      this.editingData = { ...this.localBook };

      if (
        this.editingData.MaNXB &&
        typeof this.editingData.MaNXB === "object"
      ) {
        this.editingData.MaNXB = this.editingData.MaNXB._id;
      }
    },
  },
};
</script>

<style scoped>
.info-group {
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 8px;
}
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

/* Các tiện ích trang trí */
.border-dashed {
  border-style: dashed !important;
}
.z-1 {
  z-index: 1;
}
.text-justify {
  text-align: justify;
}
.shadow-inner-top {
  box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.05);
}
</style>
