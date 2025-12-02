<template>
  <div
    class="page p-3 container-fluid p-0 fixed-page-height d-flex flex-column"
  >
    <div class="row mb-4 align-items-center">
      <div class="col-md-6">
        <h2 class="text-primary fw-bold">
          <i class="fas fa-users-cog me-2"></i>Danh sách nhân viên
        </h2>
      </div>
      <div class="col-md-6">
        <SearchField
          :placeHolder="searchPlaceholder"
          @update:search-query="updateSearchQuery"
          @refresh="getAllStaffs"
        ></SearchField>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2 text-muted">Đang tải dữ liệu...</p>
    </div>

    <div v-else class="main-layout border rounded shadow-sm bg-white">
      <div class="list-column d-flex flex-column">
        <div
          class="list-group list-group-flush flex-grow-1 overflow-auto custom-scrollbar"
        >
          <button
            v-for="staff in filteredStaffs"
            :key="staff._id"
            @click="handleSelectStaff(staff)"
            class="list-group-item list-group-item-action py-3 border-bottom"
            :class="{
              active: selectedStaff && selectedStaff._id === staff._id,
            }"
          >
            <div class="d-flex justify-content-between align-items-center">
              <div class="me-3 overflow-hidden">
                <h6 class="mb-1 fw-bold text-truncate">
                  Tên nhân viên: {{ staff.HoTenNV }}
                </h6>

                <div class="small text-muted d-flex flex-column">
                  <span
                    ><i class="fas fa-user-tag me-1"></i
                    >{{ staff.ChucVu }}</span
                  >
                  <span
                    ><i class="fas fa-phone me-1"></i
                    >{{ staff.SoDienThoai }}</span
                  >
                </div>
              </div>
              <small class="text-muted mb-auto fst-italic"
                >@{{ staff.Username }}</small
              >
            </div>
          </button>

          <div
            v-if="filteredStaffs.length === 0"
            class="text-center mx-auto my-auto"
          >
            <i class="fas fa-user-slash fa-3x text-muted mb-3"></i>
            <p>Không tìm thấy nhân viên nào.</p>
          </div>
        </div>
      </div>

      <div
        class="detail-column border-start"
        :class="{ 'show-mobile': selectedStaff }"
      >
        <div v-if="selectedStaff" class="h-100 bg-white">
          <StaffDetails
            :staff="selectedStaff"
            @close="selectedStaff = null"
            @save="handleUpdateStaff"
            @delete="handleDeleteStaff"
          />
        </div>

        <div
          v-else
          class="h-100 d-flex flex-column align-items-center justify-content-center bg-light text-muted"
        >
          <i class="fas fa-users fa-3x mb-3 opacity-25"></i>
          <p>Chọn nhân viên để xem chi tiết</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StaffService from "@/services/staff.service";
import StaffDetails from "@/components/StaffDetails.vue";
import SearchField from "@/components/SearchField.vue";

export default {
  name: "StaffList",
  components: {
    StaffDetails,
    SearchField,
  },
  data() {
    return {
      staffs: [],
      loading: false,
      searchQuery: "",
      searchPlaceholder: "Nhập tên, số điện thoại...",
      selectedStaff: null,
    };
  },
  computed: {
    filteredStaffs() {
      if (!this.searchQuery) return this.staffs;
      const lowerSearch = this.searchQuery.toLowerCase();
      return this.staffs.filter(
        (st) =>
          st.HoTenNV.toLowerCase().includes(lowerSearch) ||
          st.SoDienThoai.includes(lowerSearch) ||
          st.Username.toLowerCase().includes(lowerSearch)
      );
    },
  },
  mounted() {
    this.getAllStaffs();
  },
  methods: {
    async getAllStaffs() {
      this.loading = true;
      try {
        this.staffs = await StaffService.getAll();
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        this.loading = false;
      }
    },
    updateSearchQuery(val) {
      this.searchQuery = val;
    },
    handleSelectStaff(staff) {
      if (this.selectedStaff && this.selectedStaff._id === staff._id) {
        this.selectedStaff = null;
      } else {
        this.selectedStaff = staff;
      }
    },
    async handleUpdateStaff(updatedData) {
      try {
        const result = await StaffService.update(updatedData._id, updatedData);
        const index = this.staffs.findIndex((s) => s._id === updatedData._id);
        if (index !== -1) {
          this.staffs.splice(index, 1, result);
          this.selectedStaff = result;
        }
        alert("Cập nhật thành công!");
      } catch (err) {
        alert("Lỗi khi cập nhật: " + err.message);
      }
    },
    async handleDeleteStaff(id) {
      if (!confirm("Bạn có chắc muốn xóa nhân viên này?")) return;
      try {
        await StaffService.delete(id);
        this.staffs = this.staffs.filter((s) => s._id !== id);
        this.selectedStaff = null;
        alert("Đã xóa nhân viên!");
      } catch (err) {
        alert("Lỗi khi xóa: " + err.message);
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/book-list.css";
</style>
