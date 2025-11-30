<template>
  <div class="page">
    <PublisherList @select-publisher="handleSelectPublisher"></PublisherList>
  </div>
</template>

<script>
import PublisherList from "@/components/PublisherList.vue";
export default {
  components: {
    PublisherList,
  },
  methods: {
    handleSelectPublisher(pub) {
      if (pub) {
        this.$router.push({ name: "Publisher", params: { id: pub._id } });
      } else {
        this.$router.push({ name: "Publisher" });
      }
    },
  },
};
</script>
