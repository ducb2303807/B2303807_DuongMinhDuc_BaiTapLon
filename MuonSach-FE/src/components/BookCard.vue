<template>
  <div class="card h-100 shadow-sm book-card border-0">
    <div
      class="card-img-top d-flex align-items-center justify-content-center p-3 text-center book-cover"
      :style="{ backgroundColor: getBookColor(book._id) }"
    >
      <div>
        <i class="fas fa-book-open text-white opacity-50"></i>
      </div>
    </div>

    <div class="card-body d-flex flex-column">
      <h5 class="card-title text-truncate" :title="book.TenSach">
        Tên sách: {{ book.TenSach }}
      </h5>
      <p class="card-text text-muted small mb-1">
        <i class="fas fa-user-pen me-1"></i> {{ book.TacGia }}
      </p>
      <div class="mt-auto">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="fw-bold text-success">{{
            formatCurrency(book.DonGia)
          }}</span>
          <span
            class="badge"
            :class="book.SoQuyen > 0 ? 'bg-info' : 'bg-danger'"
          >
            SL: {{ book.SoQuyen }}
          </span>
        </div>

        <div class="d-grid gap-2">
          <button
            class="btn btn-outline-primary btn-sm"
            @click="$emit('select-book', book)"
          >
            <i class="fas fa-circle-info me-1"></i> Chi tiết
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      Object,
      require: true,
    },
  },
  emits: ["select-book"],
  methods: {
    formatCurrency(value) {
      if (!value) return "0 ₫";
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },

    getBookColor(id) {
      if (!id) return "#858796";

      const colors = [
        "#4e73df",
        "#1cc88a",
        "#36b9cc",
        "#f6c23e",
        "#e74a3b",
        "#6f42c1",
        "#fd7e14",
        "#20c997",
      ];

      // MongoDB _id là chuỗi hex dài (ví dụ: 6565aeb...)
      // Ta lấy 6 ký tự cuối để chuyển thành số cho ngẫu nhiên
      const hexSub = id.slice(-6);
      const decimalValue = parseInt(hexSub, 16); // Chuyển Hex sang Int

      return colors[decimalValue % colors.length];
    },
  },
};
</script>
