<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-primary fw-bold">Quản Lý Nhân Viên</h2>
      <router-link class="btn btn-primary" :to="{ name: 'StaffAdd' }">
        <i class="fas fa-user-plus me-1"></i> Thêm nhân viên
      </router-link>
    </div>

    <StaffList
      ref="staffListComponent"
      @select-staff="handleSelectStaff"
      @request-update="onStaffUpdate"
      ><template #actions="{ staff, enableEdit }">
        <div class="d-flex justify-content-end gap-2">
          <button
            type="button"
            class="btn fw-bold px-4 btn-warning"
            @click="enableEdit()"
          >
            <i class="fas fa-edit me-1"></i>Sửa
          </button>
          <button
            type="button"
            class="btn btn-danger fw-bold px-4"
            @click="onStaffDelete(staff._id)"
          >
            <i class="fas fa-trash me-1"></i>Xóa
          </button>
        </div>
      </template>
    </StaffList>
  </div>
</template>

<script>
import StaffList from "@/components/StaffList.vue";
import StaffService from "@/services/staff.service";
export default {
  components: {
    StaffList,
  },
  methods: {
    handleSelectStaff(staff) {
      if (staff) {
        this.$router.push({ name: "AdminStaff", params: { id: staff._id } });
      } else {
        this.$router.push({ name: "AdminStaff" });
      }
    },
    // ADMIN UPDATE
    async onStaffUpdate(updatedData) {
      try {
        await StaffService.update(updatedData._id, updatedData);
        alert("Cập nhật nhân viên thành công!");
        this.$refs.staffListComponent.getAllStaffs();
      } catch (err) {
        alert("Lỗi cập nhật: " + err.message);
      }
    },

    async onStaffDelete(id) {
      if (!confirm("Bạn có chắc muốn xóa nhân viên này?")) return;
      try {
        await StaffService.delete(id);
        alert("Đã xóa nhân viên!");
        this.$refs.staffListComponent.getAllStaffs();
        this.$refs.staffListComponent.handleSelectStaff({});
      } catch (err) {
        alert("Lỗi xóa: " + err.message);
      }
    },
  },
};
</script>
