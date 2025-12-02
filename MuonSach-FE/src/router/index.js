import { createWebHistory, createRouter } from "vue-router";
import { isTokenValid } from "@/utils/auth.utils";
import Home from "@/views/Home.vue";

const staffMetaTemplate = {
  role: "staff",
  requiresAuth: true,
};
const readerMetaTemplate = {
  role: "reader",
  requiresAuth: true,
};

const routes = [
  // public
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
    path: "/books/:id?",
    name: "Book",
    component: () => import("@/views/Book.vue"),
    meta: { title: "Tìm sách" },
    props: true,
  },
  {
    path: "/publishers/:id?",
    name: "Publisher",
    props: true,
    component: () => import("@/views/Publisher.vue"),
    meta: { title: "Tìm nhà xuất bản" },
  },
  // reader
  {
    path: "/book-borrows",
    name: "BookBorrow",
    component: () => import("@/views/BookBorrow.vue"),
    meta: { title: "Mượn sách", ...readerMetaTemplate },
  },
  // staff
  // 1. Trang Dashboard (/admin)
  {
    path: "/admin",
    name: "AdminHome",
    // Lưu ý: Trỏ thẳng vào View nội dung, không qua Layout trung gian ở router nữa
    component: () => import("@/views/AdminHome.vue"),
    meta: {
      ...staffMetaTemplate,
      title: "Trang quản lý",
    },
  },

  // 2. Thêm sách (/admin/books/add)
  {
    path: "/admin/books/add",
    name: "BookAdd",
    component: () => import("@/views/AddBook.vue"),
    meta: {
      ...staffMetaTemplate,
      title: "Thêm sách",
    },
  },
  // 3. Quản lý sách
  {
    path: "/admin/books/:id?",
    name: "AdminBook",
    component: () => import("@/views/AdminBook.vue"),
    props: true,
    meta: {
      ...staffMetaTemplate,
      title: "Quản lý sách",
    },
  },
  // 4. Quản lý nhà xuất bản
  {
    path: "/admin/publishers/:id?",
    name: "AdminPublisher",
    props: true,
    component: () => import("@/views/AdminPublisher.vue"),
    meta: {
      ...staffMetaTemplate,
      title: "Quản lý nhà xuất bản",
    },
  },
  {
    path: "/admin/publishers/add",
    name: "PublisherAdd",
    component: () => import("@/views/AddPublisher.vue"),
    meta: {
      ...staffMetaTemplate,
      title: "Thêm nhà xuất bản",
    },
  },
  // 5. Quản lý Độc giả
  {
    path: "/admin/readers/:id?",
    name: "AdminReader",
    props: true,
    component: () => import("@/views/AdminReader.vue"),
    meta: {
      ...staffMetaTemplate,
      title: "Quản lý độc giả",
    },
  },
  {
    path: "/admin/readers/add",
    name: "ReaderAdd",
    component: () => import("@/views/AddReader.vue"),
    meta: {
      ...staffMetaTemplate,
      title: "Thêm độc giả",
    },
  },
  // 5. Quản lý Nhân viên
  {
    path: "/admin/staffs/:id?",
    name: "AdminStaff",
    props: true,
    component: () => import("@/views/AdminStaff.vue"),
    meta: {
      ...staffMetaTemplate,
      title: "Quản lý nhân viên",
    },
  },
  {
    path: "/admin/staffs/add",
    name: "StaffAdd",
    component: () => import("@/views/AddStaff.vue"),
    meta: {
      ...staffMetaTemplate,
      title: "Thêm nhân viên",
    },
  },
  {
    path: "/admin/book-borrows",
    name: "AdminBookBorrow",
    component: () => import("@/views/AdminBookBorrow.vue"),
    props: true,
    meta: {
      ...staffMetaTemplate,
      title: "Quản lý mượn sách",
    },
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
    if (savedPosition) {
      return savedPosition;
    }
    if (to.name === from.name) {
      return false;
    }
    // Nếu chuyển trang bình thường -> Lên đầu trang
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Website mượn sách";

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  //Kiểm tra đăng nhập
  if (to.meta.requiresAuth && !isTokenValid()) {
    alert("Vui lòng đăng nhập để truy cập hoặc thực hiện chức năng này!");
    return next({ name: "Login" });
  }

  // không auth nữa
  const authPages = ["/login", "/register"];
  if (authPages.includes(to.path) && user) {
    if (user.role === "staff") return next("/admin");
    return next("/");
  }

  // admin không vào / của reader/guest
  if (to.path === "/" && user && user.role === "staff") {
    return next("/admin");
  }

  //Kiểm tra quyền
  if (to.meta.role) {
    if (!user || user.role !== to.meta.role) {
      alert("Bạn không có quyền truy cập trang này!");
      return next({ name: "Home" });
    }
  }

  next();
});

export default router;
