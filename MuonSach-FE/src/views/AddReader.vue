<template>
  <div class="container pt-2">
    <h2 class="text-center text-uppercase text-primary fw-bold mb-4">
      Thêm độc giả mới
    </h2>
    <div class="bg-white p-4 shadow-sm rounded">
      <ReaderEditForm
        @save-changes="addReader"
        @cancel-edit="cancelEdit"
        :reader="reader"
      ></ReaderEditForm>
    </div>
  </div>
</template>

<script>
import ReaderEditForm from "@/components/ReaderEditForm.vue";
import ReaderService from "@/services/reader.service";

export default {
  components: { ReaderEditForm },
  data() {
    this.reader = {
      Username: "",
      Password: "",
      HoLot: "",
      Ten: "",
      NgaySinh: "",
      Phai: "Nam",
      DiaChi: "",
      SoDienThoai: "",
    };
    return {};
  },
  methods: {
    async addReader(readerData) {
      try {
        await ReaderService.create(readerData);
        alert("Thêm độc giả thành công");
        this.$router.push({ name: "AdminReader" });
      } catch (error) {
        console.log(error);
        const msg = error.response?.data?.message || "Lỗi không xác định";
        alert("Lỗi khi thêm: " + msg);
      }
    },
    cancelEdit() {
      this.$router.push({ name: "AdminReader" });
    },
  },
};
</script>
