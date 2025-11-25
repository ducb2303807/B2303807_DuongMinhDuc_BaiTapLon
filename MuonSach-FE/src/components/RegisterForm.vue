<style scoped>
@import "@/assets/css/form.css";
</style>

<template>
  <div class="form-container mx-auto">
    <h1 class="text-center">Đăng ký</h1>

    <Form
      @submit="submitLogin"
      :validation-schema="RegisterFormSchema"
      class="login-form mx-auto"
    >
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
      <button type="submit" class="btn btn-primary w-100">Đăng ký</button>
    </Form>

    <div class="text-center" v-if="role === 'Người dùng'">
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
    role: {
      String,
      default: "Người dùng",
    },
  },
  emits: ["submit:login", "login:switchToStaff", "login:switchToUser"],
  data() {
    const RegisterFormSchema = yup.object({
      Username: yup
        .string()
        .min(5, "Tên đăng nhập phải có ít nhất 5 ký tự")
        .required("Tên dăng nhập không được để trống"),
      Password: yup
        .string()
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .required("Mật khẩu không được để trống"),
    });
    return {
      RegisterFormSchema,
    };
  },
  methods: {
    submitLogin(values) {
      this.$emit("submit:login", values);
    },
  },
};
</script>
