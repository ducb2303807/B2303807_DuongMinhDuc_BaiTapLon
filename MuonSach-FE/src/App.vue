<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<template>
  <div id="app">
    <AppHeader></AppHeader>
    <div class="container mt-3">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
  <AppFooter></AppFooter>
</template>

<style>
@import "@/assets/css/app.css";
.page {
  max-width: 400px;
  margin: auto;
}
</style>
