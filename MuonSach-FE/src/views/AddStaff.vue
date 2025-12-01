<template>
  <div class="container pt-2">
    <h2 class="text-center text-uppercase text-primary fw-bold mb-4">
      Thêm độc giả mới
    </h2>
    <div class="bg-white p-4 rounded shadow-sm mt-3">
      <StaffEditForm
        @save-changes="createStaff"
        @cancel-edit="cancelEdit"
        :staff="newStaff"
      ></StaffEditForm>
    </div>
  </div>
</template>

<script>
import StaffEditForm from "@/components/StaffEditForm.vue";
import StaffService from "@/services/staff.service";

export default {
  components: {
    StaffEditForm,
  },
  data() {
    return {
      // Khởi tạo object rỗng cho form thêm mới
      newStaff: {
        Username: "",
        Password: "",
        HoTenNV: "",
        ChucVu: "",
        DiaChi: "",
        SoDienThoai: "",
      },
    };
  },
  methods: {
    async createStaff(data) {
      try {
        await StaffService.create(data);
        alert("Thêm nhân viên thành công");
        this.$router.push("/admin/staffs");
      } catch (error) {
        console.log(error);
        alert("Lỗi: " + error.message);
      }
    },
    cancelEdit() {
      this.$router.push("/admin/staffs");
    },
  },
};
</script>
