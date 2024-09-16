<template>
  <div>
    <h1>Orders</h1>
    <Card><OrderButtons/></Card>
    <Card><OrderList /></Card>
  </div>
</template>

<script setup>
import Card from '../components/Card.vue';
import OrderButtons from '../components/OrderButtons.vue';
import OrderList from '../components/OrderList.vue';
</script>

<style lang="scss" scoped></style>
