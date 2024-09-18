<!-- this is reusable button component with going back functionality -->
<template>
  <button type="button" class="go-back-button" @click="goBack">⬅</button>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<style lang="scss"></style>
