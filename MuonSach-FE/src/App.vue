<style>
@import "@/assets/css/app.css";
</style>

<template>
  <div style="background-color: #f5f7fa">
    <AppHeader></AppHeader>
    <router-view class="mt-3" v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>
