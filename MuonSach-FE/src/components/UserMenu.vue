<style scoped>
@import "@/assets/css/user-menu.css";
</style>

<template>
  <div class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle d-flex align-items-center gap-2 justify-content-center"
      href="#"
      id="navbarDropdown"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      xin chào,
      <span class="fw-bold text-dark">{{ currentUser.Username }}</span>
      <div
        class="rounded-circle bg-light d-flex justify-content-center align-items-center"
        style="width: 35px; height: 35px"
      >
        <i class="fas fa-user text-primary"></i>
      </div>
    </a>

    <ul
      class="dropdown-menu animate-menu border-0 shadow"
      aria-labelledby="navbarDropdown"
    >
      <li>
        <h6 class="dropdown-header">Vai trò: {{ roleName }}</h6>
      </li>

      <li v-if="currentUser.role === 'reader'">
        <router-link class="dropdown-item" to="/lich-su-muon">
          <i class="fas fa-history me-2"></i> Lịch sử mượn sách
        </router-link>
      </li>
      <li v-if="currentUser.role === 'reader'">
        <router-link class="dropdown-item" to="/profile">
          <i class="fas fa-id-card me-2"></i> Thông tin cá nhân
        </router-link>
      </li>

      <li v-if="currentUser.role === 'staff'">
        <router-link class="dropdown-item" to="/admin/quan-ly-sach">
          <i class="fas fa-book-open me-2"></i> Quản lý sách
        </router-link>
      </li>
      <li v-if="currentUser.role === 'staff'">
        <router-link class="dropdown-item" to="/admin/quan-ly-muon-tra">
          <i class="fas fa-list-alt me-2"></i> Quản lý mượn trả
        </router-link>
      </li>

      <li><hr class="dropdown-divider" /></li>

      <li>
        <button class="dropdown-item text-danger" @click="logout">
          <i class="fas fa-sign-out-alt me-2"></i> Đăng xuất
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UserMenu",
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
  },
  emits: ["request-logout"],
  computed: {
    roleName() {
      return this.currentUser.role === "staff" ? "Nhân viên" : "Độc giả";
    },
  },
  methods: {
    logout() {
      this.$emit("request-logout");
    },
  },
};
</script>
