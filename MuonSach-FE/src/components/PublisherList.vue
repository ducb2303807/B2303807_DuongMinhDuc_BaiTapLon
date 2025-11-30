<template>
  <div
    class="page p-3 container-fluid p-0 fixed-page-height d-flex flex-column"
  >
    <div class="row mb-4 align-items-center">
      <div class="col-md-6">
        <h2 class="text-primary fw-bold">
          <i class="fas fa-building me-2"></i>Danh sách Nhà xuất bản (NXB)
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
            v-for="pub in filteredPublishers"
            :key="pub._id"
            @click="handleSelectPublisher(pub)"
            class="list-group-item list-group-item-action py-3 border-bottom"
            :class="{
              active: selectedPublisher && selectedPublisher._id === pub._id,
            }"
          >
            <div class="d-flex justify-content-between align-items-center">
              <div class="overflow-hidden">
                <h6 class="mb-1 fw-bold text-truncate">
                  Tên NXB: {{ pub.TenNXB }}
                </h6>
                <div class="small text-muted text-truncate">
                  <i class="fas fa-map-marker-alt me-1"></i>Địa chỉ:
                  {{ pub.DiaChi }}
                </div>
              </div>
              <i class="fas fa-chevron-right text-muted small"></i>
            </div>
          </button>
          <div
            v-if="filteredPublishers.length === 0"
            class="text-center mx-auto my-auto"
          >
            <i class="fas fa-building fa-3x text-muted mb-3 opacity-25"></i>
            <p>Không tìm thấy NXB nào.</p>
          </div>
        </div>
      </div>

      <div
        class="detail-column border-start"
        :class="{ 'show-mobile': selectedPublisher }"
      >
        <div v-if="selectedPublisher" class="h-100 bg-white">
          <PublisherDetails
            :publisher="selectedPublisher"
            @close="selectedPublisher = null"
            @save="handleUpdatePublisher"
            @delete="handleDeletePublisher"
          />
        </div>

        <div
          v-else
          class="h-100 d-flex flex-column align-items-center justify-content-center bg-light text-muted"
        >
          <i class="fas fa-building fa-3x mb-3 opacity-25"></i>
          <p>Chọn Nhà Xuất Bản để xem chi tiết</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PublisherService from "@/services/publisher.service";
import PublisherDetails from "@/components/PublisherDetails.vue";
import SearchField from "@/components/SearchField.vue";

export default {
  name: "PublisherList",
  components: {
    PublisherDetails,
    SearchField,
  },
  emits: ["select-publisher"],
  data() {
    return {
      publishers: [],
      loading: false,
      searchQuery: "",
      searchPlaceholder: "Nhập tên NXB, địa chỉ...",
      selectedPublisher: null,
    };
  },
  computed: {
    filteredPublishers() {
      if (!this.searchQuery) return this.publishers;
      const lowerSearch = this.searchQuery.toLowerCase();
      return this.publishers.filter(
        (pub) =>
          pub.TenNXB.toLowerCase().includes(lowerSearch) ||
          pub.DiaChi.toLowerCase().includes(lowerSearch)
      );
    },
  },
  mounted() {
    this.getAllPublishers();
  },
  methods: {
    async getAllPublishers() {
      this.loading = true;
      try {
        this.publishers = await PublisherService.getAll();

        const currentIdFromUrl = this.$route.params.id;
        if (currentIdFromUrl) {
          this.syncSelectedPublisher(currentIdFromUrl);
        }
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        this.loading = false;
      }
    },
    syncSelectedPublisher(publisherId) {
      if (publisherId && this.publishers.length > 0) {
        // Tìm sách trong list đã load
        const foundpublisher = this.publishers.find(
          (p) => p._id === publisherId
        );
        this.selectedPublisher = foundpublisher || null;
      } else {
        this.selectedPublisher = null;
      }
    },
    updateSearchQuery(val) {
      this.searchQuery = val;
    },
    handleSelectPublisher(pub) {
      this.$emit("select-publisher", pub);

      if (this.selectedPublisher && this.selectedPublisher._id === pub._id) {
        this.selectedPublisher = null;
      } else {
        this.selectedPublisher = pub;
      }
    },
    async handleUpdatePublisher(updatedPubData) {
      try {
        const updatedPub = await PublisherService.update(
          updatedPubData._id,
          updatedPubData
        );

        const index = this.publishers.findIndex(
          (p) => p._id === updatedPubData._id
        );
        if (index !== -1) {
          this.publishers.splice(index, 1, updatedPub);
          this.selectedPublisher = updatedPub;
        }
        alert("Cập nhật thành công!");
      } catch (err) {
        alert("Lỗi khi cập nhật: " + err.message);
      }
    },
    async handleDeletePublisher(pubId) {
      if (!confirm("Bạn có chắc muốn xóa NXB này?")) return;
      try {
        await PublisherService.delete(pubId);
        this.publishers = this.publishers.filter((p) => p._id !== pubId);
        this.selectedPublisher = null;
        alert("Đã xóa NXB!");
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
