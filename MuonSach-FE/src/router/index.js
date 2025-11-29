import { createWebHistory, createRouter } from "vue-router";
import { isTokenValid } from "@/utils/auth.utils";
import Home from "@/views/Home.vue";

const routes = [
  { path: "/", name: "Home", component: Home, meta: { title: "Trang Chủ" } },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: { title: "Đăng Nhập" },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
    meta: { title: "Đăng Ký" },
  },
  {
    path: "/books",
    name: "Book",
    component: () => import("@/views/Book.vue"),
    meta: { title: "Tìm sách" },
  },
  {
    path: "/publishers",
    name: "Publisher",
    component: () => import("@/views/Publisher.vue"),
    meta: { title: "Tìm nhà xuất bản" },
  },
  {
    path: "/book-borrows",
    name: "BookBorrow",
    component: () => import("@/views/BookBorrow.vue"),
    meta: { title: "Mượn sách", requiresAuth: true },
  },
  {
    path: "/admin/books",
    name: "AdminBook",
    component: () => import("@/views/BookManager.vue"),
  },
  {
    path: "/admin/books/add",
    name: "BookAdd",
    component: () => import("@/views/AddBook.vue"),
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
  scrollBehavior(to, from, savedPosition) {
    // Nếu người dùng bấm nút Back/Forward của trình duyệt,
    // giữ nguyên vị trí cũ (trải nghiệm tốt hơn)
    if (savedPosition) {
      return savedPosition;
    }
    // Nếu chuyển trang bình thường -> Lên đầu trang
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Website mượn sách";

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  // 1. Kiểm tra đăng nhập
  if (to.meta.requiresAuth && !isTokenValid()) {
    alert("Vui lòng đăng nhập để truy cập hoặc thực hiện chức năng này!");
    return next({ name: "Login" });
  }

  // // 2. Kiểm tra Role (Quyền)
  // if (to.meta.role) {
  //   // Nếu trang yêu cầu role cụ thể (ví dụ 'admin')
  //   // Mà user hiện tại không có role đó
  //   if (!user || user.role !== to.meta.role) {
  //     alert("Bạn không có quyền truy cập trang này!");
  //     return next({ name: "Home" }); // Đá về trang chủ
  //   }
  // }
  next();
});

export default router;
