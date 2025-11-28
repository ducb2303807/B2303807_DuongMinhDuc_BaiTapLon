<template>
  <div class="container">
    <LoginForm
      :role="role"
      @login:switch-to-staff="switchToStaff"
      @login:switch-to-user="switchToUser"
      @submit:login="login"
    />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import ReaderService from "@/services/reader.service";
import StaffService from "@/services/staff.service";
export default {
  components: {
    LoginForm,
  },
  methods: {
    switchToUser() {
      this.role = "Người dùng";
    },
    switchToStaff() {
      this.role = "Nhân viên";
    },

    async login(data) {
      try {
        const result =
          this.role === "Người dùng"
            ? await this.readerLogin(data)
            : await this.staffLogin(data);

        console.log("Login result:", result);
        if (!result.token) {
          alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
          return;
        }

        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        this.$router.push({ name: "Home" });
      } catch (error) {
        console.error("Login failed:", error);
        alert("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    },

    async readerLogin(data) {
      return await ReaderService.login(data);
    },
    async staffLogin(data) {
      return await StaffService.login(data);
    },
  },
  data() {
    return {
      Username: "",
      Password: "",
      role: "Người dùng",
    };
  },
};
</script>
