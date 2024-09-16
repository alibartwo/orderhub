<template>
  <button class="go-back-button" @click="goBack">⬅</button>
</template>

<script lang="ts" setup>
const goBack = () => {
  window.history.back();
};
</script>

<style scoped lang="scss"></style>
