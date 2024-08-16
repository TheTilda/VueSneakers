<script setup>
defineProps({
    id: Number,
    title: String,
    imageUrl: String,
    price: Number,
    isFavorite: Boolean,
    isAdded: Boolean,
    onClickFavorite: Function,
    onClickAdd: Function
})


</script>


<template>
    <div>
        <div class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl">
            <img @click="onClickFavorite" :src="isFavorite ? '/like-2.svg' : '/like-1.svg'" alt="Like 2" class="absolute top-8 left-8">
            <img :src="imageUrl" alt="Sneaker">
            <p>{{ title }}</p>
            <div class="flex justify-between mt-5">
                <div class="flex flex-col">
                    <span class="text-slate-400">Цена:</span>
                    <b>{{ price }} руб.</b>
                </div>
                <img @click="onClickAdd" :src="isAdded ? '/checked.svg' : '/plus.svg'" alt="">
            </div>
        </div>
    </div>
</template>