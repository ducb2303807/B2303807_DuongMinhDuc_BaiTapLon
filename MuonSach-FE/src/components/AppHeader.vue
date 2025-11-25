
<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-white  shadow-sm">
    <div class="container-fluid">
      <router-link class="navbar-brand d-flex justify-content-center logo ms-2" to="/">
          <img class="img-fluid" src="../assets/image/CTU_logo.png"></img>
      </router-link>
      <button
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
      <div class="collapse navbar-collapse justify-content-start text-center text-lg-start" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link fw-bold" aria-current="page" to="/">
              <span>Trang chủ</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link fw-bold" to="/sach">
              <span>Tìm sách</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link fw-bold" to="/nxb">
              <span>Tìm nhà xuất bản</span>
            </router-link>
          </li>
          
          <li class="nav-item fw-bold">
            <router-link class="nav-link" to="/muon-sach">
              <span>Mượn sách</span>
            </router-link>
          </li>
        </ul>

        <ul class="navbar-nav me-1 mb-2 mb-lg-0 gap-2">
          <li class="nav-item">
            <router-link class="w-100" to="/login">
              <button class="btn btn-outline-primary w-100" type="button">Đăng nhập</button>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="w-100" to="/register">
              <button class="btn btn-primary w-100" type="button">Đăng ký</button>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script></script>

<style scoped>
@import "@/assets/css/app-header.css";
</style>
