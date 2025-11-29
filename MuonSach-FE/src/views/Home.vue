<style scoped>
@import "@/assets/css/home.css";
</style>

<template>
  <div class="container py-5">
    <div class="row mb-5">
      <div class="col-12">
        <div class="card hero-card text-white border-0 shadow-lg">
          <div
            class="card-body p-5 d-flex align-items-center justify-content-between"
          >
            <div>
              <h1 class="display-5 fw-bold mb-3">
                Chào mừng đến với website mượn sách
              </h1>
              <p class="lead mb-4">
                Tìm kiếm và mượn những cuốn sách bạn yêu thích một cách dễ dàng
                và nhanh chóng.
              </p>
              <a
                @click.prevent="scrollToFeat"
                class="btn btn-light btn-lg fw-semibold text-primary"
              >
                <i class="fas fa-rocket me-2"></i> Bắt đầu ngay
              </a>
            </div>
            <div class="d-none d-md-block">
              <i class="fas fa-book-open-reader hero-icon-bg opacity-25"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="feat-list" ref="featListRef" class="row g-4">
      <div v-for="(feature, index) in features" :key="index" class="col-md-4">
        <div class="card feature-card h-100 border-0 shadow-sm text-center p-4">
          <div class="card-body">
            <div
              class="icon-wrapper mb-4 mx-auto rounded-circle d-flex align-items-center justify-content-center"
              :class="`bg-light-${feature.colorName}`"
            >
              <i
                :class="[feature.icon, 'fa-3x', `text-${feature.colorName}`]"
              ></i>
            </div>
            <h3 class="h4 fw-bold mb-3">{{ feature.title }}</h3>
            <p class="text-muted mb-4">
              {{ feature.description }}
            </p>
            <router-link
              :to="`${feature.endPoint}`"
              class="btn btn-outline-primary rounded-pill px-4 stretched-link"
            >
              Truy cập <i class="fas fa-arrow-right ms-2"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const featListRef = ref(null);

const scrollToFeat = () => {
  // Kiểm tra xem element đã render chưa
  if (featListRef.value) {
    featListRef.value.scrollIntoView({
      behavior: "smooth",
      block: "center", // Hoặc 'center' nếu muốn nó nằm giữa màn hình
    });
  }
};

// Dữ liệu cho 3 ô tính năng bên dưới
// Bạn có thể dễ dàng chỉnh sửa icon, màu sắc và mô tả ở đây
const features = ref([
  {
    title: "Tìm sách",
    description:
      "Tra cứu nhanh chóng hàng ngàn đầu sách theo tên, tác giả hoặc thể loại bạn quan tâm.",
    icon: "fas fa-magnifying-glass",
    colorName: "primary", // Sử dụng màu xanh dương của Bootstrap
    endPoint: "/books",
  },
  {
    title: "Tìm nhà xuất bản",
    description:
      "Lọc và xem danh sách các tài liệu được phát hành bởi các nhà xuất bản uy tín.",
    icon: "fas fa-building",
    colorName: "success", // Sử dụng màu xanh lá của Bootstrap
    endPoint: "/publishers",
  },
  {
    title: "Mượn sách",
    description:
      "Quy trình mượn trả đơn giản. Theo dõi lịch sử và trạng thái mượn sách của bạn.",
    icon: "fas fa-book-bookmark",
    colorName: "warning", // Sử dụng màu vàng cam của Bootstrap
    endPoint: "/book-borrows",
  },
]);
</script>
