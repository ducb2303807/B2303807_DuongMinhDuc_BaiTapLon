<style scoped>
@import "@/assets/css/app-header.css";
</style>

<template>
  <nav
    class="navbar sticky-top navbar-expand-lg navbar-light bg-white shadow-sm"
  >
    <div class="container-fluid">
      <router-link
        class="navbar-brand d-flex justify-content-center logo ms-2"
        to="/"
      >
        <img class="img-fluid" src="../assets/image/CTU_logo.png" alt="logo" />
      </router-link>
      <button
        id="nav-button"
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="collapse navbar-collapse justify-content-start text-center text-lg-start"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link fw-bold" aria-current="page" to="/">
              <span>Trang chủ</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link fw-bold" to="/sach">
              <span>Tìm sách</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link fw-bold" to="/nxb">
              <span>Tìm nhà xuất bản</span>
            </router-link>
          </li>
          <li class="nav-item fw-bold">
            <router-link class="nav-link" to="/muon-sach">
              <span>Mượn sách</span>
            </router-link>
          </li>
        </ul>

        <div class="navbar-nav me-1 mb-2 mb-lg-0 gap-2 align-items-center">
          <ul
            class="navbar-nav me-1 mb-2 mb-lg-0 gap-2 w-100"
            v-if="!currentUser"
          >
            <li class="nav-item">
              <router-link class="w-100" to="/login">
                <button class="btn btn-outline-primary w-100" type="button">
                  Đăng nhập
                </button>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="w-100" to="/register">
                <button class="btn btn-primary w-100" type="button">
                  Đăng ký
                </button>
              </router-link>
            </li>
          </ul>
          <!-- // đã đăng nhập // -->
          <div v-else>
            <UserMenu :current-user="currentUser" @request-logout="logout" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import UserMenu from "./UserMenu.vue";
export default {
  name: "AppHeader",
  components: {
    UserMenu,
  },
  data() {
    return {
      currentUser: null, // Biến lưu thông tin user
    };
  },
  watch: {
    // theo dõi route thay đổi
    $route() {
      this.checkLogin();
      this.closeMenu();
    },
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          this.currentUser = JSON.parse(userStr);
        } catch (e) {
          this.currentUser = null;
        }
      }
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.currentUser = null;

      this.$router.push("/login");
    },
    closeMenu() {
      const navButton = document.getElementById("nav-button");
      if (!navButton.classList.contains("collapsed")) {
        navButton.click();
      }
    },
  },
};
</script>
