<script setup>
import { inject } from 'vue';
import CartItem from './CartItem.vue';

const cart = inject('cart');
const addToCart = inject('addToCart');

</script>

<template>
<div class="flex flex-col gap-4 flex-1 justify-between">
    <CartItem v-for="item in cart" :key="item.id" :title="item.title" :image-url="item.imageUrl" :price="item.price" @add-to-cart="() => addToCart(item)"/>

</div>
</template>