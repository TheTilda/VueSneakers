<script setup>
import Card from './Card.vue';

defineProps({
    items: Array
})

const onClickAdd = () => {
    alert('Товар добавлен в корзину');
}
</script>

<template>
<div class="grid grid-cols-4 gap-5">
    <Card 
        v-for="item in items"
        :title="item.title" 
        :image-url="item.imageUrl" 
        :price="item.price" 

    />

</div>
</template>