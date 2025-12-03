<template>
  <div class="container pt-2">
    <h2 class="text-center text-uppercase text-primary fw-bold mb-4">
      Thêm nhà xuất bản mới
    </h2>
    <PublisherEditForm
      @save-changes="saveChanges"
      @cancel-edit="cancelEdit"
      :book="book"
    ></PublisherEditForm>
  </div>
</template>

<script>
import PublisherEditForm from "@/components/PublisherEditForm.vue";
import PublisherService from "@/services/publisher.service";

export default {
  components: {
    PublisherEditForm,
  },

  data() {
    this.publisher = {
      TenNXB: "",
      DiaChi: "",
    };
    return {};
  },
  methods: {
    async saveChanges(publisher) {
      try {
        await PublisherService.create(publisher);
        alert("Thêm thành công");
        this.$router.push("/admin/publishers");
      } catch (error) {
        console.log(error);
      }
    },
    cancelEdit() {
      this.$router.push("/admin/publishers");
    },
  },
};
</script>
