<template>
  <h2 class="text-center text-uppercase">Thêm sách</h2>
  <BookEditForm :book="book"></BookEditForm>
</template>

<script>
import BookEditForm from "@/components/BookEditForm.vue";

export default {
  components: {
    BookEditForm,
  },
  data() {
    this.book = {
      TenSach: "",
      DonGia: 0,
      SoQuyen: 0,
      NamXuatBan: 0,
      MaNXB: "",
      TacGia: "",
    };
  },
};
</script>
