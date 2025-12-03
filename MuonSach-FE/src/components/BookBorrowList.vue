<template>
  <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
    <div class="card-header bg-white border-0 pt-4 px-4 pb-0">
      <div class="row align-items-center mb-3">
        <div class="col-md-6 col-12 mb-2 mb-md-0">
          <h5 class="fw-bold text-dark mb-0">Danh sách yêu cầu</h5>
        </div>

        <div class="col-md-6 col-12">
          <div class="d-flex justify-content-md-end gap-2 w-100">
            <SearchField
              placeHolder="Tìm tên sách, độc giả..."
              @update:searchQuery="updateSearchQuery"
              @refresh="this.$emit('refresh')"
            />
          </div>
        </div>
      </div>

      <div class="border-bottom pb-3">
        <div class="nav nav-pills custom-pills overflow-auto flex-nowrap pb-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="nav-link btn-sm fw-bold me-2 text-nowrap"
            :class="{ active: currentTab === tab.id }"
            @click.prevent="currentTab = tab.id"
          >
            {{ tab.label }}
            <span
              class="badge ms-1"
              :class="
                currentTab === tab.id
                  ? 'bg-white text-primary'
                  : 'bg-light text-secondary'
              "
            >
              {{ countByStatus(tab.id) }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <div class="card-body px-0 pb-0">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0 custom-table">
          <thead class="bg-light text-uppercase text-secondary small fw-bold">
            <tr>
              <th class="ps-4">Sách / Mã sách</th>
              <th v-if="isAdmin">Độc giả</th>
              <th>NV Xử lý</th>
              <th>Thời gian</th>
              <th>Trạng thái</th>
              <th class="text-end pe-4">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredBorrows" :key="item._id" class="py-3">
              <td class="ps-4">
                <div class="d-flex align-items-center">
                  <div
                    class="icon-box bg-primary-subtle text-primary rounded-3 me-3"
                  >
                    <i class="fas fa-book"></i>
                  </div>
                  <div>
                    <h6
                      class="mb-0 text-dark fw-bold text-wrap"
                      style="max-width: 250px"
                    >
                      {{ item.sach_info?.TenSach || "Sách không xác định" }}
                    </h6>
                    <small class="text-muted" style="font-size: 0.8rem">
                      Mã: {{ item.MaSach }}
                    </small>
                  </div>
                </div>
              </td>

              <td v-if="isAdmin">
                <div class="d-flex align-items-center">
                  <div class="avatar avatar-blue me-2">
                    {{ getInitials(item.docgia_info?.Username) }}
                  </div>
                  <div class="d-flex flex-column">
                    <span class="fw-bold text-dark">
                      {{ item.docgia_info?.Username || "N/A" }}
                    </span>
                    <small class="text-muted" style="font-size: 0.75rem">
                      {{ item.MaDocGia }}
                    </small>
                  </div>
                </div>
              </td>

              <td>
                <div
                  v-if="item.nhanvien_info"
                  class="d-flex align-items-center"
                >
                  <div class="avatar avatar-green me-2">
                    {{ getInitials(item.nhanvien_info?.HoTenNV) }}
                  </div>
                  <div class="d-flex flex-column">
                    <span class="text-dark fw-medium small">
                      {{ item.nhanvien_info?.HoTenNV }}
                    </span>
                    <small class="text-muted" style="font-size: 0.75rem">
                      {{ item.MaNhanVien }}
                    </small>
                  </div>
                </div>
                <div v-else class="text-muted small fst-italic">
                  <i class="fas fa-minus me-1"></i>Chưa duyệt
                </div>
              </td>

              <td>
                <div class="d-flex flex-column">
                  <span class="small text-muted"
                    >Mượn:
                    <span class="text-dark fw-bold">{{
                      formatDate(item.NgayMuon)
                    }}</span></span
                  >

                  <span
                    class="small"
                    :class="
                      checkOverdue(item) ? 'text-danger fw-bold' : 'text-muted'
                    "
                  >
                    Hạn: {{ getDueDate(item) }}
                  </span>
                </div>
              </td>

              <td>
                <span
                  class="badge-soft"
                  :class="getStatusBadgeClass(item.TrangThai)"
                >
                  <i
                    class="fas fa-circle small me-1"
                    style="font-size: 6px; vertical-align: middle"
                  ></i>
                  {{ item.TrangThai }}
                </span>
                <div v-if="checkOverdue(item)" class="mt-1">
                  <span
                    class="badge bg-danger rounded-pill"
                    style="font-size: 0.65rem"
                    >Quá hạn</span
                  >
                </div>
              </td>

              <td class="text-end pe-4">
                <div v-if="isAdmin">
                  <div
                    class="d-flex flex-column gap-2 flex-md-row justify-content-end"
                    v-if="item.TrangThai === 'Chờ duyệt'"
                  >
                    <button
                      class="btn btn-icon btn-light-success"
                      @click="$emit('approve', item)"
                      title="Duyệt"
                    >
                      <i class="fas fa-check"></i>
                    </button>
                    <button
                      class="btn btn-icon btn-light-danger"
                      @click="$emit('reject', item)"
                      title="Từ chối"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                  <div v-else-if="item.TrangThai === 'Đang mượn'">
                    <button
                      class="btn btn-sm btn-primary px-3 rounded-pill shadow-sm"
                      @click="$emit('return', item)"
                    >
                      <i class="fas fa-undo me-1"></i> Trả sách
                    </button>
                  </div>
                  <span v-else class="text-muted opacity-50"
                    ><i class="fas fa-lock"></i
                  ></span>
                </div>

                <div v-else>
                  <button
                    v-if="item.TrangThai === 'Chờ duyệt'"
                    class="btn btn-sm btn-outline-danger rounded-pill px-3"
                    @click="$emit('cancel', item)"
                  >
                    Hủy yêu cầu
                  </button>
                  <span v-else class="text-success small fw-bold">
                    <i class="fas fa-check-circle me-1"></i>Hoàn tất
                  </span>
                </div>
              </td>
            </tr>

            <tr v-if="filteredBorrows.length === 0">
              <td :colspan="isAdmin ? 6 : 5" class="text-center py-5">
                <div class="empty-state">
                  <div class="bg-light rounded-circle d-inline-flex p-4 mb-3">
                    <i
                      class="fas fa-search fa-3x text-secondary opacity-50"
                    ></i>
                  </div>
                  <h6 class="text-secondary fw-bold">Không tìm thấy dữ liệu</h6>
                  <p class="text-muted small">
                    Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// 1. Import Component SearchField
import SearchField from "@/components/SearchField.vue";
import { formatDate } from "@/utils/format-date.utils";

export default {
  name: "BookBorrowList",
  components: {
    SearchField, // Đăng ký component
  },
  props: {
    borrows: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false },
  },
  // Thêm emit 'refresh' để báo cho cha tải lại data
  emits: ["approve", "reject", "return", "cancel", "refresh"],
  data() {
    return {
      currentTab: "all",
      searchQuery: "", // Biến lưu từ khóa tìm kiếm
      tabs: [
        { id: "all", label: "Tất cả" },
        { id: "Chờ duyệt", label: "Chờ duyệt" },
        { id: "Đang mượn", label: "Đang mượn" },
        { id: "Đã trả", label: "Đã trả" },
        { id: "Đã từ chối", label: "Đã từ chối" }, // 2. Thêm tab Đã từ chối
        { id: "overdue", label: "Quá hạn" },
      ],
    };
  },
  computed: {
    // 3. Logic lọc kết hợp (Tab + Search)
    filteredBorrows() {
      // B1: Lọc theo Tab trước
      let result = this.borrows;
      if (this.currentTab !== "all") {
        if (this.currentTab === "overdue") {
          result = result.filter(
            (b) => b.TrangThai === "Đang mượn" && this.checkOverdue(b)
          );
        } else {
          result = result.filter((b) => b.TrangThai === this.currentTab);
        }
      }

      // B2: Lọc theo từ khóa Search (Nếu có)
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter((item) => {
          // Tìm trong Tên sách, Tên độc giả, Mã sách
          const tenSach = item.sach_info?.TenSach?.toLowerCase() || "";
          const usernameDocGia =
            item.docgia_info?.Username?.toLowerCase() || "";

          return tenSach.includes(query) || usernameDocGia.includes(query);
        });
      }

      return result;
    },
  },
  methods: {
    formatDate,
    updateSearchQuery(val) {
      this.searchQuery = val;
    },
    getDueDate(item) {
      if (!item.NgayMuon || typeof item.SoNgayMuon !== "number") return "---";
      const date = new Date(item.NgayMuon);
      date.setDate(date.getDate() + item.SoNgayMuon);
      return date.toLocaleDateString("vi-VN");
    },
    checkOverdue(item) {
      if (item.TrangThai !== "Đang mượn") return false;
      const date = new Date(item.NgayMuon);
      date.setDate(date.getDate() + item.SoNgayMuon);
      return new Date() > date;
    },
    // Hàm đếm số lượng (Cần đếm dựa trên toàn bộ list gốc)
    countByStatus(statusId) {
      if (statusId === "all") return this.borrows.length;
      if (statusId === "overdue")
        return this.borrows.filter(
          (b) => b.TrangThai === "Đang mượn" && this.checkOverdue(b)
        ).length;
      return this.borrows.filter((b) => b.TrangThai === statusId).length;
    },
    getStatusBadgeClass(status) {
      switch (status) {
        case "Chờ duyệt":
          return "badge-soft-warning";
        case "Đang mượn":
          return "badge-soft-primary";
        case "Đã trả":
          return "badge-soft-success";
        case "Đã từ chối":
          return "badge-soft-danger";
        default:
          return "badge-soft-secondary";
      }
    },
    getInitials(name) {
      if (!name) return "?";
      const words = name.trim().split(" ");
      if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/book-borrow-list.css";
</style>
