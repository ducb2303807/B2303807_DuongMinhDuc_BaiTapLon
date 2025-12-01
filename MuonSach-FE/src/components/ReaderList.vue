<template>
  <div
    class="page p-3 container-fluid p-0 fixed-page-height d-flex flex-column"
  >
    <div class="row mb-4 align-items-center">
      <div class="col-md-6">
        <h2 class="text-primary fw-bold">
          <i class="fas fa-users me-2"></i>Danh sách độc giả
        </h2>
      </div>
      <div class="col-md-6">
        <SearchField
          :placeHolder="searchPlaceholder"
          @update:search-query="updateSearchQuery"
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
            v-for="reader in filteredReaders"
            :key="reader._id"
            @click="handleSelectReader(reader)"
            class="list-group-item list-group-item-action py-3 border-bottom"
            :class="{
              active: selectedReader && selectedReader._id === reader._id,
            }"
          >
            <div class="d-flex justify-content-between align-items-center">
              <div class="me-3 overflow-hidden w-100">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-1 fw-bold text-truncate">
                    Tên độc giả: {{ reader.HoLot }} {{ reader.Ten }}
                  </h6>
                  <small class="text-muted fst-italic"
                    >@{{ reader.Username }}</small
                  >
                </div>

                <div class="small text-muted d-flex flex-column mt-1">
                  <span
                    ><i class="fas fa-phone-alt me-1"></i
                    >{{ reader.SoDienThoai }}</span
                  >
                  <span class="text-truncate" style="max-width: 200px">
                    <i class="fas fa-map-marker-alt me-1"></i
                    >{{ reader.DiaChi }}
                  </span>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <span
                class="badge rounded-pill border fw-normal"
                :class="
                  reader.Phai === 'Nam'
                    ? 'bg-info text-dark bg-opacity-25 border-info'
                    : 'bg-danger text-danger bg-opacity-10 border-danger'
                "
              >
                {{ reader.Phai }}
              </span>
            </div>
          </button>

          <div
            v-if="filteredReaders.length === 0"
            class="text-center mx-auto my-auto p-4"
          >
            <i class="fas fa-user-slash fa-3x text-muted mb-3"></i>
            <p>Không tìm thấy độc giả nào phù hợp.</p>
          </div>
        </div>
      </div>

      <div
        class="detail-column border-start"
        :class="{ 'show-mobile': selectedReader }"
      >
        <div v-if="selectedReader" class="h-100 bg-white">
          <ReaderDetails
            :reader="selectedReader"
            @close="selectedReader = null"
            @save="handleUpdateReader"
            @delete="handleDeleteReader"
          />
        </div>
        <div
          v-else
          class="h-100 d-flex flex-column align-items-center justify-content-center bg-light text-muted"
        >
          <i class="fas fa-id-card fa-3x mb-3 opacity-25"></i>
          <p>Chọn độc giả để xem thông tin chi tiết</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReaderService from "@/services/reader.service";
import ReaderDetails from "@/components/ReaderDetails.vue";
import SearchField from "@/components/SearchField.vue";

export default {
  name: "ReaderList",
  components: { ReaderDetails, SearchField },
  emits: ["select-reader"],
  data() {
    return {
      readers: [],
      loading: false,
      searchQuery: "",
      searchPlaceholder: "Tìm theo tên, username, SĐT hoặc địa chỉ",
      selectedReader: null,
    };
  },
  computed: {
    filteredReaders() {
      if (!this.searchQuery) return this.readers;
      const lowerSearch = this.searchQuery.toLowerCase();
      return this.readers.filter((r) => {
        const fullName = `${r.HoLot} ${r.Ten}`.toLowerCase();
        const username = r.Username ? r.Username.toLowerCase() : "";
        const phone = r.SoDienThoai ? r.SoDienThoai : "";
        const diaChi = r.DiaChi ? r.DiaChi.toLowerCase() : "";
        return (
          fullName.includes(lowerSearch) ||
          username.includes(lowerSearch) ||
          phone.includes(lowerSearch) ||
          diaChi.includes(lowerSearch)
        );
      });
    },
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      handler(newId) {
        this.syncSelectedReader(newId);
      },
    },
  },
  mounted() {
    this.getAllReaders();
  },
  methods: {
    async getAllReaders() {
      this.loading = true;
      try {
        this.readers = await ReaderService.getAll();
        const currentId = this.$route.params.id;
        if (currentId) this.syncSelectedReader(currentId);
      } catch (error) {
        console.error("Lỗi tải danh sách:", error);
      } finally {
        this.loading = false;
      }
    },
    syncSelectedReader(readerId) {
      if (readerId && this.readers.length > 0) {
        this.selectedReader =
          this.readers.find((r) => r._id === readerId) || null;
      } else {
        this.selectedReader = null;
      }
    },
    updateSearchQuery(val) {
      this.searchQuery = val;
    },
    handleSelectReader(reader) {
      this.$emit("select-reader", reader);

      if (this.selectedReader && this.selectedReader._id === reader._id) {
        this.selectedReader = null;
      } else {
        this.selectedReader = reader;
      }
    },
    async handleUpdateReader(updatedData) {
      try {
        const updatedReader = await ReaderService.update(
          updatedData._id,
          updatedData
        );
        const index = this.readers.findIndex((r) => r._id === updatedData._id);
        if (index !== -1) {
          this.readers.splice(index, 1, updatedReader);
          this.selectedReader = updatedReader;
        }
        alert("Cập nhật thành công!");
      } catch (err) {
        alert("Lỗi cập nhật: " + err.message);
      }
    },
    async handleDeleteReader(readerId) {
      if (
        !confirm(
          "Bạn có chắc muốn xóa độc giả này? Hành động này không thể hoàn tác."
        )
      )
        return;
      try {
        await ReaderService.delete(readerId);
        this.readers = this.readers.filter((r) => r._id !== readerId);
        this.selectedReader = null;
        alert("Đã xóa độc giả!");
      } catch (err) {
        console.log(err);
        alert("Lỗi xóa: " + err.message);
      }
    },
  },
};
</script>
<style scoped>
@import "@/assets/css/book-list.css";
</style>
