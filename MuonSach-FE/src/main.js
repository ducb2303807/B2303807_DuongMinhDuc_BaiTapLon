import { createApp } from "vue";
import App from "./App.vue";

// 1. Import CSS Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// 2. Import JS Bootstrap (để chạy Modal, Dropdown, Navbar...)
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// 2. IMPORT FONT AWESOME TẠI ĐÂY
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from "./router";

createApp(App).use(router).mount("#app");
