<template>
  <div class="container mt-5">
    <LoginForm role="Độc giả" @submit:login="handleReaderLogin">
      <template #footer>
        <div class="p-0 text-muted">
          Bạn chưa có tài khoản?
          <router-link to="/register">Đăng ký ngay!</router-link>
        </div>
        <div class="mt-2 text-muted">
          Bạn là nhân viên?
          <router-link to="/admin/login" class="fw-bold text-decoration-none">
            <i class="fas fa-user-tie"></i> Đăng nhập nhân viên
          </router-link>
        </div>
      </template>
    </LoginForm>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import ReaderService from "@/services/reader.service";

export default {
  components: { LoginForm },
  methods: {
    async handleReaderLogin(data) {
      try {
        const result = await ReaderService.login(data);
        if (!result.token) {
          alert("Đăng nhập thất bại. Kiểm tra lại thông tin.");
          return;
        }
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        // Đăng nhập xong độc giả về trang chủ
        this.$router.push({ name: "Home" });
      } catch (error) {
        console.error(error);
        alert("Lỗi đăng nhập.");
      }
    },
  },
};
</script>
