<style scoped>
@import "@/assets/css/form.css";
</style>

<template>
  <div class="form-container mx-auto pb-5">
    <h1 class="text-center">Đăng ký</h1>

    <Form
      @submit="submitRegister"
      :validation-schema="RegisterFormSchema"
      class="login-form mx-auto"
    >
      <div class="d-flex justify-content-between gap-3">
        <div class="mb-3 w-100">
          <label for="holot" class="form-label fw-bold">Họ</label>
          <Field
            id="holot"
            name="HoLot"
            type="text"
            class="form-control"
            placeholder="Nhập họ"
          />
          <ErrorMessage name="HoLot" class="text-danger" />
        </div>
        <div class="mb-3 w-100">
          <label for="ten" class="form-label fw-bold">Tên</label>
          <Field
            id="ten"
            name="Ten"
            type="text"
            class="form-control"
            placeholder="Nhập tên"
          />
          <ErrorMessage name="Ten" class="text-danger" />
        </div>
      </div>
      <div class="mb-3">
        <label for="username" class="form-label fw-bold">Tên đăng nhập</label>
        <Field
          id="username"
          name="Username"
          type="text"
          class="form-control"
          placeholder="Nhập tên đăng nhập"
        />
        <ErrorMessage name="Username" class="text-danger" />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label fw-bold">Mật khẩu</label>
        <Field
          id="password"
          name="Password"
          type="password"
          class="form-control"
          placeholder="Nhập mật khẩu"
        />
        <ErrorMessage name="Password" class="text-danger" />
      </div>

      <div class="mb-3">
        <label for="password-confirm" class="form-label fw-bold"
          >Nhập lại mật khẩu</label
        >
        <Field
          id="password-confirm"
          name="PasswordConfirm"
          type="password"
          class="form-control"
          placeholder="Nhập lại mật khẩu"
        />
        <ErrorMessage name="PasswordConfirm" class="text-danger" />
      </div>

      <div class="d-flex justify-content-between gap-3">
        <div class="mb-3 w-100">
          <label for="ngaysinh" class="form-label fw-bold">Ngày Sinh</label>
          <Field
            id="ngaysinh"
            name="NgaySinh"
            type="date"
            class="form-control"
            placeholder=""
          />
          <ErrorMessage name="NgaySinh" class="text-danger" />
        </div>
        <div class="mb-3 w-100">
          <label for="gioitinh" class="form-label fw-bold">Giới tính</label>
          <Field
            as="select"
            id="gioitinh"
            name="GioiTinh"
            class="form-control form-select"
            placeholder="Giới tính"
          >
            <option value="" disabled>Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </Field>
          <ErrorMessage name="GioiTinh" class="text-danger" />
        </div>
      </div>

      <div class="mb-3">
        <label for="sdt" class="form-label fw-bold">Mật khẩu</label>
        <Field
          id="sdt"
          name="SoDienThoai"
          type="text"
          class="form-control"
          placeholder="Nhập số điện thoại"
        />
        <ErrorMessage name="SoDienThoai" class="text-danger" />
      </div>

      <button type="submit" class="btn btn-primary w-100">Đăng ký</button>
    </Form>

    <div class="text-center">
      <div class="mt-3 p-0 text-muted">
        Bạn đã có tài khoản?
        <router-link to="/login">Đăng nhập ngay!</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  name: "LoginForm",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    checkDuplicateUsername: {
      type: Function,
      required: true,
    },
  },
  emits: ["submit:resister"],
  data() {
    const RegisterFormSchema = yup.object({
      HoLot: yup.string().required("Họ không được để trống"),
      Ten: yup.string().required("Tên không được để trống"),
      Username: yup
        .string()
        .min(5, "Tên đăng nhập phải có ít nhất 5 ký tự")
        .max(255, "Tên đăng nhập không được vượt quá 255 ký tự")
        .test(
          "validate-username",
          "Tên đăng nhập đã tồn tại",
          async (value) => {
            return await this.checkDuplicateUsername(value);
          }
        )
        .required("Tên đăng nhập không được để trống"),
      Password: yup
        .string()
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .max(255, "Mật khẩu không được vuien quá 255 ký tự")
        .required("Mật khẩu không được để trống"),
      PasswordConfirm: yup
        .string()
        .oneOf([yup.ref("Password")], "Mật khẩu nhập lại không khớp"),
      NgaySinh: yup.date().required("Ngày sinh không được để trống"),
      GioiTinh: yup.string().required("Giới tính không được để trống"),
      SoDienThoai: yup
        .string()
        .matches(/^(0|\+84)(\d{9})$/, "Số điện thoại không hợp lệ")
        .required("Số điện thoại không được để trống"),
    });
    return {
      RegisterFormSchema,
    };
  },
  methods: {
    submitRegister(values) {
      this.$emit("submit:resister", values);
    },
  },
};
</script>
