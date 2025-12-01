<template>
  <div class="container">
    <RegisterForm @submit:resister="handleRegister"></RegisterForm>
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
