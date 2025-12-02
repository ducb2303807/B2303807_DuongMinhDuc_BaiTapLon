<template>
  <div class="d-flex gap-2 w-100">
    <div class="input-group">
      <span class="input-group-text bg-white border-end-0">
        <i class="fas fa-search text-muted"></i>
      </span>
      <input
        @input="$emit('update:searchQuery', $event.target.value)"
        type="text"
        class="form-control border-start-0 ps-0 shadow-none"
        :placeholder="placeHolder"
      />
    </div>
    <button
      class="btn btn-primary border shadow-sm"
      @click="$emit('refresh')"
      title="Tải lại danh sách"
    >
      <i class="fas fa-sync-alt text-light"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    placeHolder: {
      String,
      default: "Tìm kiếm...",
    },
  },
  emits: ["update:searchQuery", "refresh"],
};
</script>
