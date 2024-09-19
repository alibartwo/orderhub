<template>
  <div>
    <h1>Order Details</h1>
    <Card>
      <GoBack />
      <OrderDetails />
    </Card>
  </div>
</template>
<script setup>
import Card from '../components/Card.vue';
import OrderDetails from '../components/OrderDetails.vue';
import GoBack from '../components/GoBack.vue';
</script>
<style lang="scss" scoped></style>
