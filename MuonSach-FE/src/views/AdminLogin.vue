<template>
  <div class="container mt-5">
    <LoginForm role="Nhân viên" @submit:login="handleStaffLogin">
      <template #footer>
        <div class="mt-2 text-muted"></div>
        <div class="mt-2 text-muted">
          Bạn là độc giả?
          <router-link to="/login" class="fw-bold text-decoration-none">
            <i class="fas fa-user"></i> Đăng nhập độc giả
          </router-link>
        </div>
      </template>
    </LoginForm>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import StaffService from "@/services/staff.service";

export default {
  components: { LoginForm },
  methods: {
    async handleStaffLogin(data) {
      try {
        const result = await StaffService.login(data);
        if (!result.token) {
          alert("Đăng nhập thất bại. Bạn có phải là nhân viên không?");
          return;
        }
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        // Đăng nhập xong Admin vào Dashboard
        this.$router.push("/admin");
      } catch (error) {
        console.error(error);
        alert("Lỗi đăng nhập hệ thống.");
      }
    },
  },
};
</script>
