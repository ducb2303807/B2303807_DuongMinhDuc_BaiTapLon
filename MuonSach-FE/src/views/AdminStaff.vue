<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-primary fw-bold">Quản Lý Nhân Viên</h2>
      <router-link class="btn btn-primary" :to="{ name: 'StaffAdd' }">
        <i class="fas fa-user-plus me-1"></i> Thêm nhân viên
      </router-link>
    </div>

    <StaffList />
  </div>
</template>

<script>
import StaffList from "@/components/StaffList.vue";

export default {
  components: {
    StaffList,
  },
};
</script>
