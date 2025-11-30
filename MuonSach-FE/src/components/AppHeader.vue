<style scoped>
@import "@/assets/css/app-header.css";
</style>

<template>
  <nav
    class="navbar sticky-top navbar-expand-lg navbar-light bg-white shadow-sm"
  >
    <div class="container-fluid">
      <router-link
        v-if="!isStaff()"
        class="navbar-brand d-flex justify-content-center logo ms-2"
        exact
        to="/"
      >
        <img class="img-fluid" src="../assets/image/CTU_logo.png" alt="logo" />
      </router-link>
      <router-link
        v-else
        class="navbar-brand d-flex justify-content-center logo ms-2"
        to="/admin"
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
        <!-- // header cho độc giả // -->
        <div v-if="!isStaff()">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-1">
            <li class="nav-item">
              <router-link
                class="nav-link fw-bold"
                aria-current="page"
                to="/"
                active-class=" "
                exact-active-class="router-link-active"
              >
                <i class="fas fa-home me-1"></i>Trang chủ
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link fw-bold" to="/books">
                Tìm sách
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link fw-bold" to="/publishers">
                Tìm nhà xuất bản
              </router-link>
            </li>
            <li class="nav-item fw-bold">
              <router-link class="nav-link fw-bold" to="/book-borrows">
                Mượn sách
              </router-link>
            </li>
          </ul>
        </div>
        <!-- // header cho nhân viên // -->
        <div v-else>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-1">
            <li class="nav-item">
              <router-link
                class="nav-link fw-bold"
                aria-current="page"
                to="/admin"
                active-class=" "
                exact-active-class="router-link-active"
              >
                <i class="fas fa-home me-1"></i>Trang chủ
              </router-link>
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle fw-bold"
                href="#"
                id="navbarDropdownCatalog"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Quản lý danh mục
              </a>
              <ul
                class="dropdown-menu animate-menu border-0 shadow"
                aria-labelledby="navbarDropdownCatalog"
              >
                <li>
                  <router-link class="dropdown-item" :to="{ name: 'AdminBook' }"
                    >Quản lý Sách</router-link
                  >
                </li>
                <li>
                  <router-link class="dropdown-item" to="/admin/publishers"
                    >Nhà xuất bản</router-link
                  >
                </li>
              </ul>
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle fw-bold"
                href="#"
                id="navbarDropdownUser"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Người dùng
              </a>
              <ul
                class="dropdown-menu animate-menu border-0 shadow"
                aria-labelledby="navbarDropdownUser"
              >
                <li>
                  <router-link class="dropdown-item" to="/admin/readers"
                    >Độc giả</router-link
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <router-link class="dropdown-item" to="/admin/staffs"
                    >Nhân viên hệ thống</router-link
                  >
                </li>
              </ul>
            </li>

            <li class="nav-item">
              <router-link class="nav-link fw-bold" to="/admin/book-borrows">
                Quản lý Mượn sách
              </router-link>
            </li>
          </ul>
        </div>

        <div class="navbar-nav ms-auto mb-2 mb-lg-0 gap-2">
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
import { logout as appLogout } from "@/utils/auth.utils";
import UserMenu from "@/components/UserMenu.vue";
export default {
  name: "AppHeader",
  components: {
    UserMenu,
  },
  data() {
    return {
      currentUser: null,
    };
  },
  computed: {},
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
      appLogout();
      this.currentUser = null;
      this.$router.push("/login");
    },

    closeMenu() {
      const navButton = document.getElementById("nav-button");
      const isExpanded = navButton.getAttribute("aria-expanded") === "true";
      if (isExpanded) navButton.click();
    },
    isStaff() {
      if (!this.currentUser) return false;
      return this.currentUser.role === "staff";
    },
  },
};
</script>
