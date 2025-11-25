import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";

const routes = [
  { path: "/", component: Home, meta: { title: "Trang Chủ" } },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
    meta: { title: "Đăng Nhập" },
  },
  {
    path: "/register",
    component: () => import("../views/Register.vue"),
    meta: { title: "Đăng Ký" },
  },

  // {
  //   path: "/admin",
  //   component: AdminLayout,
  //   children: [
  //     { path: "login", component: AdminLogin },
  //     { path: "dashboard", component: AdminDashboard },
  //     { path: "users", component: UserManagement },
  //   ],
  // },
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
  next();
});

export default router;
