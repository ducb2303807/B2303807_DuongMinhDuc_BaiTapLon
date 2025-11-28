<template>
  ]
  <footer class="bg-dark text-white pt-5 pb-4 mt-auto">
    <div class="container">
      <div
        class="d-flex flex-column flex-md-row text-center justify-content-md-around"
      >
        <h5 class="text-uppercase mb-4 fw-bold text-warning">
          <i class="fas fa-user-graduate me-2"></i>Thực hiện bởi
        </h5>
        <p>
          <i class="fas fa-user me-2 text-secondary"></i>
          <strong>Dương Minh Đức</strong>
        </p>
        <p>
          <i class="fas fa-id-card me-2 text-secondary"></i>
          MSSV: B2303807
        </p>
      </div>
      <hr class="mb-4 mt-4" style="opacity: 0.2" />

      <div class="row align-items-center">
        <div class="col-12 text-center">
          <p class="m-0">
            <strong class="text-warning">
              © Dương Minh Đức - B2303807 - CT449
            </strong>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-custom {
  /* Màu nền tối hiện đại (Xanh đen đậm) */
  background-color: #1c2331;
  color: #eceeef;
  /* Đổ bóng phía trên để tách biệt nội dung */
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
}

/* Hiệu ứng hover cho các link */
a {
  transition: all 0.3s ease;
}
a:hover {
  color: #fff !important;
  text-decoration: underline;
}

/* Style cho các nút mạng xã hội tròn */
.btn-floating {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}

.btn-floating:hover {
  background-color: #ffc107; /* Màu vàng khi hover */
  color: #1c2331;
  border-color: #ffc107;
}

/* Custom scrollbar nếu cần */
::-webkit-scrollbar {
  width: 8px;
}
</style>
