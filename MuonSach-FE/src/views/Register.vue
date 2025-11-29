<template>
  <div class="container">
    <RegisterForm
      @submit:resister="handleRegister"
      :check-duplicate-username="checkDuplicateUsername"
    ></RegisterForm>
  </div>
</template>

<script>
import RegisterForm from "@/components/RegisterForm.vue";
import ReaderService from "@/services/reader.service";

export default {
  components: {
    RegisterForm,
  },
  methods: {
    async checkDuplicateUsername(username) {
      if (!username || username.length === 0) {
        return false;
      }
      const payload = {
        Username: username,
      };
      const reader = await ReaderService.getAll(payload);
      console.log(reader);
      return reader.length === 0;
    },
    async handleRegister(values) {
      const reader = {
        HoLot: values.HoLot,
        Ten: values.Ten,
        Username: values.Username,
        Password: values.Password,
        NgaySinh: values.NgaySinh,
        Phai: values.GioiTinh,
        SoDienThoai: values.SoDienThoai,
      };

      try {
        const data = await ReaderService.create(reader);
        if (!data) throw new Error();
        window.alert("Đăng ký thành công!");
        this.$router.push({ name: "Login" });
      } catch (error) {
        window.alert("Đăng ký thất bại, vui lòng thử lại sau!");
      }
    },
  },
};
</script>
