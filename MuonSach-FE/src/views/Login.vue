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
export default {
  components: {
    LoginForm,
  },
  methods: {
    async login(data) {
      var { Username, Password } = data;
    },
    switchToUser() {
      this.role = "Người dùng";
    },
    switchToStaff() {
      this.role = "Nhân viên";
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
