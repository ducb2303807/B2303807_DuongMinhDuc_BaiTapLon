<template>
  <div class="p-3">
    <Form
      class="mx-auto form-container"
      :validation-schema="formSchema"
      :initial-values="localStaff"
      @submit="saveChanges"
    >
      <div class="row mb-3">
        <div class="col-md-6">
          <label for="Username" class="form-label small fw-bold text-secondary"
            >Username (Tài khoản)</label
          >
          <Field
            id="Username"
            name="Username"
            type="text"
            class="form-control"
            placeholder="Nhập tên đăng nhập"
            :disabled="!!staff._id"
          />
          <ErrorMessage name="Username" class="text-danger small" />
        </div>
        <div class="col-md-6">
          <label for="Password" class="form-label small fw-bold text-secondary"
            >Mật khẩu</label
          >
          <Field
            id="Password"
            name="Password"
            type="password"
            class="form-control"
            placeholder="Nhập mật khẩu"
          />
          <ErrorMessage name="Password" class="text-danger small" />
        </div>
      </div>

      <div class="mb-3">
        <label for="HoTenNV" class="form-label small fw-bold text-secondary"
          >Họ và tên</label
        >
        <Field
          id="HoTenNV"
          name="HoTenNV"
          type="text"
          class="form-control"
          placeholder="Nhập họ tên nhân viên"
        />
        <ErrorMessage name="HoTenNV" class="text-danger small" />
      </div>

      <div class="row mb-3">
        <div class="col-md-6">
          <label for="ChucVu" class="form-label small fw-bold text-secondary"
            >Chức vụ</label
          >
          <Field
            as="select"
            id="ChucVu"
            name="ChucVu"
            class="form-select"
            placeholder="VD: Nhân viên kho, Quản lý..."
          >
            <option value="" disabled>-- Chọn chức vụ --</option>
            <option v-for="role in roles" :key="role" :value="role">
              {{ role }}
            </option>
          </Field>

          <ErrorMessage name="ChucVu" class="text-danger small" />
        </div>
        <div class="col-md-6">
          <label
            for="SoDienThoai"
            class="form-label small fw-bold text-secondary"
            >Số điện thoại</label
          >
          <Field
            id="SoDienThoai"
            name="SoDienThoai"
            type="text"
            class="form-control"
          />
          <ErrorMessage name="SoDienThoai" class="text-danger small" />
        </div>
      </div>

      <div class="mb-3">
        <label for="DiaChi" class="form-label small fw-bold text-secondary"
          >Địa chỉ</label
        >
        <Field
          id="DiaChi"
          name="DiaChi"
          type="text"
          class="form-control"
          placeholder="Nhập địa chỉ nơi ở"
        />
        <ErrorMessage name="DiaChi" class="text-danger small" />
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
import { isStaffUsernameAvailable } from "@/utils/auth.utils";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    staff: { type: Object, required: true },
  },
  emits: ["cancel-edit", "save-changes"],

  data() {
    return {
      localStaff: { ...this.staff },
      roles: ["Nhân viên"],
    };
  },
  computed: {
    isEditMode() {
      return !!this.localStaff._id;
    },
    formSchema() {
      const staffFormSchema = yup.object().shape({
        Username: yup
          .string()
          .required("Username không được để trống")
          .min(5, "Username phải có ít nhất 5 ký tự")
          .max(100, "Username tối đa 100 ký tự")
          .test("uniqueUsername", "Username đã tồn tại", async (value) => {
            if (this.isEditMode) return true;
            return await isStaffUsernameAvailable(value);
          }),
        HoTenNV: yup
          .string()
          .required("Họ tên không được để trống")
          .max(60, "Tối đa 60 ký tự"),
        ChucVu: yup.string().required("Chức vụ là bắt buộc"),
        DiaChi: yup
          .string()
          .required("Địa chỉ là bắt buộc")
          .max(100, "Địa chỉ tối đa 100 ký"),
        SoDienThoai: yup
          .string()
          .required("Số điện thoại là bắt buộc")
          .matches(/^(0|\+84)(\d{9})$/, "Số điện thoại không hợp lệ"),
      });

      // Nếu là thêm mới: Password bắt buộc
      if (!this.isEditMode) {
        return staffFormSchema.shape({
          Password: yup
            .string()
            .required("Mật khẩu là bắt buộc")
            .min(6, "Mật khẩu tối thiểu 6 ký tự"),
        });
      }

      // Nếu là chỉnh sửa: Password không bắt buộc (nhập mới validate)
      return staffFormSchema.shape({
        Password: yup
          .string()
          .notRequired()
          .test("len", "Mật khẩu tối thiểu 6 ký tự", (val) => {
            if (val && val.length > 0) return val.length >= 6;
            return true;
          }),
      });
    },
  },
  methods: {
    isStaffUsernameAvailable,
    cancelEdit() {
      this.$emit("cancel-edit");
    },
    saveChanges(values) {
      if (this.isEditMode && !values.Password) {
        delete values.Password;
      }

      const updatedStaff = {
        ...this.localStaff,
        ...values,
      };
      this.$emit("save-changes", updatedStaff);
    },
  },
};
</script>
