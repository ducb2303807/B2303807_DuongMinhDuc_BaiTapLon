import { createWebHistory, createRouter } from "vue-router";
import { isTokenValid } from "@/utils/auth.utils";
import Home from "@/views/Home.vue";

const routes = [
  { path: "/", name: "Home", component: Home, meta: { title: "Trang Chủ" } },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: { title: "Đăng Nhập" },
  },
  {
    path: "/register",
    component: () => import("../views/Register.vue"),
    meta: { title: "Đăng Ký" },
  },

  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/NotFound.vue"),
    meta: { title: "Không Tìm Thấy Trang" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Mượn sách";

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  // 1. Kiểm tra đăng nhập
  if (to.meta.requiresAuth && !isTokenValid()) {
    alert("Vui lòng đăng nhập!");
    return next({ name: "Login" });
  }

  // 2. Kiểm tra Role (Quyền)
  if (to.meta.role) {
    // Nếu trang yêu cầu role cụ thể (ví dụ 'admin')
    // Mà user hiện tại không có role đó
    if (!user || user.role !== to.meta.role) {
      alert("Bạn không có quyền truy cập trang này!");
      return next({ name: "Home" }); // Đá về trang chủ
    }
  }
  next();
});

export default router;
