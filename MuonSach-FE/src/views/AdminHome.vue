<style scoped>
/* Tận dụng lại file css của trang home để đồng bộ giao diện */
@import "@/assets/css/home.css";

/* Có thể thêm custom style cho admin nếu cần */
.hero-card {
  background: linear-gradient(
    135deg,
    #2c3e50 0%,
    #4ca1af 100%
  ); /* Màu tối hơn cho admin */
}
</style>

<template>
  <div class="container py-3">
    <div class="row mb-5">
      <div class="col-12">
        <div class="card hero-card text-white border-0 shadow-lg">
          <div
            class="card-body p-5 d-flex align-items-center justify-content-between"
          >
            <div>
              <h1 class="display-5 fw-bold mb-3">Hệ thống Quản lý mượn sách</h1>
              <p class="lead mb-4">
                Xin chào Quản trị viên/Nhân viên. Tại đây bạn có thể quản lý
                sách, độc giả, nhân viên và theo dõi tình hình mượn trả sách.
              </p>
              <a
                @click.prevent="scrollToModules"
                class="btn btn-light btn-lg fw-semibold text-dark"
                href="#"
              >
                <i class="fas fa-screwdriver-wrench me-2"></i> Vào việc ngay
              </a>
            </div>
            <div class="d-none d-md-block">
              <i class="fas fa-user-shield hero-icon-bg opacity-25"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="module-list" ref="moduleListRef" class="row g-4">
      <div
        v-for="(module, index) in adminModules"
        :key="index"
        class="col-md-4"
      >
        <div class="card feature-card h-100 border-0 shadow-sm text-center p-4">
          <div class="card-body">
            <div
              class="icon-wrapper mb-4 mx-auto rounded-circle d-flex align-items-center justify-content-center"
              :class="`bg-light-${module.colorName}`"
            >
              <i
                :class="[module.icon, 'fa-3x', `text-${module.colorName}`]"
              ></i>
            </div>

            <h3 class="h4 fw-bold mb-3">{{ module.title }}</h3>
            <p class="text-muted mb-4">
              {{ module.description }}
            </p>

            <router-link
              :to="module.endPoint"
              class="btn btn-outline-secondary rounded-pill px-4 stretched-link"
            >
              Quản lý <i class="fas fa-arrow-right ms-2"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Cấu trúc Vue cũ (Options API)
export default {
  name: "AdminHome",
  data() {
    return {
      // Danh sách các chức năng quản lý
      adminModules: [
        {
          title: "Quản lý Sách",
          description:
            "Thêm mới, cập nhật thông tin sách hoặc xóa các đầu sách cũ.",
          icon: "fas fa-book",
          colorName: "primary", // Xanh dương
          endPoint: "/admin/books",
        },
        {
          title: "Quản lý Nhà xuất bản",
          description:
            "Quản lý thông tin các nhà xuất bản đối tác và nguồn cung cấp tài liệu.",
          icon: "fas fa-building",
          colorName: "success", // Xanh lá
          endPoint: "/admin/publishers",
        },
        {
          title: "Quản lý Mượn/Trả",
          description:
            "Duyệt yêu cầu mượn sách, xác nhận trả sách và xử lý vi phạm.",
          icon: "fas fa-clipboard-list",
          colorName: "warning", // Vàng/Cam
          endPoint: "/admin/book-borrows",
        },
        {
          title: "Quản lý Người dùng",
          description:
            "Xem danh sách độc giả, khóa tài khoản vi phạm hoặc cấp lại mật khẩu.",
          icon: "fas fa-users",
          colorName: "info",
          endPoint: "/admin/readers",
        },
        {
          title: "Quản lý Nhân viên",
          description:
            "Phân quyền và quản lý danh sách nhân viên trong hệ thống.",
          icon: "fas fa-user-tie",
          colorName: "danger",
          endPoint: "/admin/staffs",
        },
      ],
    };
  },
  methods: {
    scrollToModules() {
      // Sử dụng $refs trong Options API
      if (this.$refs.moduleListRef) {
        this.$refs.moduleListRef.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    },
  },
};
</script>
