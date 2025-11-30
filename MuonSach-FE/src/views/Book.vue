<style scoped></style>

<template>
  <div class="page">
    <BookList @select-book="handleSelectBook"></BookList>
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";
export default {
  components: {
    BookList,
  },
  methods: {
    handleSelectBook(book) {
      if (book) {
        this.$router.push({ name: "Book", params: { id: book._id } });
      } else {
        this.$router.push({ name: "Book" });
      }
    },
  },
};
</script>
