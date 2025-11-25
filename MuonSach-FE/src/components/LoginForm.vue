<style scoped>
@import "@/assets/css/form.css";
</style>

<template>
  <div class="form-container mx-auto">
    <h1 class="text-center">Đăng nhập</h1>
    <p class="text-center text-secondary fw-bold fs-4">-{{ role }}-</p>
    <Form
      @submit="submitLogin"
      :validation-schema="LoginFormSchema"
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
      <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
    </Form>

    <div class="text-center" v-if="role === 'Người dùng'">
      <div class="mt-3 p-0 text-muted">
        Bạn chưa có tài khoản?
        <router-link to="/register">Đăng ký ngay! </router-link>
      </div>
      <div class="mt-2 text-muted">
        Bạn là nhân viên?
        <button class="btn btn-link p-0 ms-2 small" @click="switchToStaff">
          <i class="fas fa-user-tie"></i>Đăng nhập bằng tư cách nhân viên
        </button>
      </div>
    </div>
    <div class="mt-3 text-center" v-else>
      Bạn là người dùng?
      <button class="btn btn-link p-0 ms-2" @click="switchToUser">
        <i class="fas fa-user-tie"></i>Đăng nhập với tư cách người dùng
      </button>
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
    const LoginFormSchema = yup.object({
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
      LoginFormSchema,
    };
  },
  methods: {
    submitLogin(values) {
      this.$emit("submit:login", values);
    },
    switchToStaff() {
      this.$emit("login:switchToStaff");
    },
    switchToUser() {
      this.$emit("login:switchToUser");
    },
  },
};
</script>
