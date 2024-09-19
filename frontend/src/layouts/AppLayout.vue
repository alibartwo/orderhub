<!-- this component serves as the main layout of the application. -->

<template>
  <div>
    <AppHeader />
    <main class="app-content">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
</script>

<style lang="scss"></style>
