<script setup>
import { inject } from 'vue';


defineProps({
    countFavorites: Number,
})

const changeDrawerState = inject('changeDrawerState')


</script>

<template>
<header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <div class="flex items-center gap-4">
        <img src="/logo.png" alt="logo" class="w-10">
        <div>
            <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
            <p class="text-slate-500">Магазин лучших кроссовок</p>
        </div>
    </div>
    <ul class="flex items-center gap-10 text-gray-500 ">
        <li @click="changeDrawerState" class="flex items-center gap-3 hover:text-black cursor-pointer">
            <img src="/cart.svg" alt="Cart">
            <b>1205 руб.</b>
        </li>
        <li class="flex items-center gap-3 hover:text-black cursor-pointer">
            <div class="relative">
                <img src="/heart.svg" alt="Cart">
                <p class="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex justify-center items-center">{{ countFavorites }}</p>
            </div>
            <span>Закладки</span>
        </li>
        <li class="flex items-center gap-3 hover:text-black cursor-pointer">
            <img src="/profile.svg" alt="Cart">
            <span>Профиль</span>
        </li>
    </ul>
</header>
</template>