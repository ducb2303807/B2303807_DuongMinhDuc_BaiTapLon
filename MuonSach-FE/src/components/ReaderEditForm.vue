<template>
  <div class="p-3">
    <Form
      class="mx-auto form-container"
      :validation-schema="formSchema"
      :initial-values="localReader"
      @submit="saveChanges"
    >
      <h6 class="text-uppercase text-muted fw-bold mb-3 border-bottom pb-2">
        Thông tin tài khoản
      </h6>
      <div class="row mb-3">
        <div class="col-6">
          <label for="Username" class="form-label small fw-bold text-secondary">
            Tên đăng nhập <span class="text-danger">*</span>
          </label>
          <Field
            id="Username"
            name="Username"
            type="text"
            class="form-control"
            :class="{ 'bg-light': isEditMode }"
            :disabled="isEditMode"
            placeholder="Nhập username"
          />
          <ErrorMessage name="Username" class="text-danger small" />
        </div>
        <div class="col-6">
          <label for="Password" class="form-label small fw-bold text-secondary">
            Mật khẩu <span v-if="!isEditMode" class="text-danger">*</span>
          </label>
          <Field
            id="Password"
            name="Password"
            type="password"
            class="form-control"
            :placeholder="
              isEditMode ? 'Để trống nếu không đổi mật khẩu' : 'Nhập mật khẩu'
            "
          />
          <ErrorMessage name="Password" class="text-danger small" />
        </div>
      </div>

      <h6
        class="text-uppercase text-muted fw-bold mb-3 border-bottom pb-2 mt-4"
      >
        Thông tin cá nhân
      </h6>

      <div class="row mb-3">
        <div class="col-6">
          <label for="HoLot" class="form-label small fw-bold text-secondary"
            >Họ lót</label
          >
          <Field
            id="HoLot"
            name="HoLot"
            type="text"
            class="form-control"
            placeholder="Ví dụ: Nguyễn Văn"
          />
          <ErrorMessage name="HoLot" class="text-danger small" />
        </div>
        <div class="col-6">
          <label for="Ten" class="form-label small fw-bold text-secondary"
            >Tên <span class="text-danger">*</span></label
          >
          <Field
            id="Ten"
            name="Ten"
            type="text"
            class="form-control"
            placeholder="Ví dụ: A"
          />
          <ErrorMessage name="Ten" class="text-danger small" />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-6">
          <label for="NgaySinh" class="form-label small fw-bold text-secondary"
            >Ngày sinh</label
          >
          <Field
            id="NgaySinh"
            name="NgaySinh"
            type="date"
            class="form-control"
          />
          <ErrorMessage name="NgaySinh" class="text-danger small" />
        </div>
        <div class="col-6">
          <label for="Phai" class="form-label small fw-bold text-secondary"
            >Giới tính</label
          >
          <Field name="Phai" as="select" class="form-select">
            <option value="" disabled>-- Chọn giới tính --</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </Field>
          <ErrorMessage name="Phai" class="text-danger small" />
        </div>
      </div>

      <div class="mb-3">
        <label
          for="SoDienThoai"
          class="form-label small fw-bold text-secondary"
        >
          Số điện thoại <span class="text-danger">*</span>
        </label>
        <Field
          id="SoDienThoai"
          name="SoDienThoai"
          type="text"
          class="form-control"
          placeholder="Nhập số điện thoại"
        />
        <ErrorMessage name="SoDienThoai" class="text-danger small" />
      </div>

      <div class="mb-3">
        <label for="DiaChi" class="form-label small fw-bold text-secondary"
          >Địa chỉ</label
        >
        <Field
          id="DiaChi"
          name="DiaChi"
          as="textarea"
          class="form-control"
          placeholder="Số nhà, tên đường, phường/xã..."
          rows="3"
        />
        <ErrorMessage name="DiaChi" class="text-danger small" />
      </div>

      <div class="d-flex justify-content-end gap-2 mt-4">
        <button
          type="button"
          class="btn btn-secondary px-4"
          @click="$emit('cancel-edit')"
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

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { isReaderUsernameAvailable } from "@/utils/auth.utils";

export default {
  components: { Form, Field, ErrorMessage },
  props: {
    reader: { type: Object, required: true },
  },
  emits: ["cancel-edit", "save-changes"],
  data() {
    return {
      localReader: { ...this.reader },
    };
  },
  computed: {
    isEditMode() {
      return !!this.localReader._id;
    },
    formSchema() {
      // Base schema cho các trường thông thường
      const baseSchema = yup.object().shape({
        Username: yup
          .string()
          .required("Username là bắt buộc")
          .min(5, "Username tối thiểu 5 ký tự")
          .max(100, "Username tối đa 100 ký tự")
          .test(
            "validate-username",
            "Tên đăng nhập đã tồn tại",
            async (value) => {
              if (this.isEditMode) return true;
              return await isReaderUsernameAvailable(value);
            }
          ),
        HoLot: yup
          .string()
          .required("Họ lót là bắt buộc")
          .max(30, "Tối đa 30 ký tự"),
        Ten: yup
          .string()
          .required("Tên là bắt buộc")
          .min(3, "Tên tối thiểu 3 ký tự")
          .max(30, "Tối đa 30 ký tự"),
        NgaySinh: yup
          .date()
          .max(new Date(), "Ngày sinh không được lớn hơn ngày hiện tại")
          .required("Ngày sinh là bắt buộc"),
        Phai: yup.string().required("Vui lòng chọn giới tính"),
        SoDienThoai: yup
          .string()
          .required("Số điện thoại là bắt buộc")
          .matches(/^(0|\+84)(\d{9})$/, "Số điện thoại không hợp lệ"),
        DiaChi: yup
          .string()
          .required("Địa chỉ là bắt buộc")
          .min(2, "Địa chỉ tối thiểu 2 ký tự")
          .max(100, "Địa chỉ tối đa 100 ký tự"),
      });

      // Nếu là thêm mới: Password bắt buộc
      if (!this.isEditMode) {
        return baseSchema.shape({
          Password: yup
            .string()
            .required("Mật khẩu là bắt buộc")
            .min(6, "Mật khẩu tối thiểu 6 ký tự"),
        });
      }

      // Nếu là chỉnh sửa: Password không bắt buộc (nhập mới validate)
      return baseSchema.shape({
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
    isReaderUsernameAvailable,
    saveChanges(values) {
      if (this.isEditMode && !values.Password) {
        delete values.Password;
      }

      // Merge values vào object
      const updatedReader = {
        ...this.localReader,
        ...values,
      };

      this.$emit("save-changes", updatedReader);
    },
  },
};
</script>
<style scoped>
@import "@/assets/css/form.css";
</style>
