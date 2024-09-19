<template>
  <div>
    <h1>Edit an Order</h1>
    <Card>
      <GoBack />
      <OrderForm />
    </Card>
  </div>
</template>
<script setup>
import Card from '../components/Card.vue';
import OrderForm from '../components/OrderForm.vue';
import GoBack from '../components/GoBack.vue';
</script>
<style lang="scss" scoped></style>
