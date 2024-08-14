<script setup>
import CartItem from './CartItem.vue';

const onClickAdd = () => {
    alert('Товар добавлен в корзину');
}
</script>

<template>
<div class="flex flex-col gap-4 flex-1 justify-between">

    <CartItem/>
    <CartItem/>
    <CartItem/>
    <CartItem/>


</div>
</template>