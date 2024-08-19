<script setup>
import { onMounted, ref, watch, reactive, provide, computed } from 'vue';

import Header from './components/Header.vue';
import CardList from './components/CardList.vue';
import Drawer from './components/Drawer.vue';


const cart = ref([]);
const countFavorites = ref(0);

const totalPrice = computed(() => {
    return cart.value.reduce((acc, item) => {
        return acc + item.price
    }, 0)
})

const drawerOpen = ref(false);

const changeDrawerState = () => {
    drawerOpen.value = !drawerOpen.value
}

const addToCart = (item) => {
    if (!item.isAdded) {
        cart.value.push(item)
        item.isAdded = true
    } else {
        cart.value.splice(cart.value.indexOf(item), 1)
        item.isAdded = false
    }
    
    console.log(cart)
}





provide('countFavorites', countFavorites)
// provide('addFavorite', addFavorite)
provide('changeDrawerState', changeDrawerState)
provide('cart', cart)
provide('addToCart', addToCart)

</script>

<template>
<div>

    <Drawer :total-price="totalPrice" v-if="drawerOpen"/>

    <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">

        <Header :totalPrice="totalPrice" :countFavorites="countFavorites"/>
        
        <div class="p-10">
            <RouterView />
        </div>
    </div>  
</div>
</template>


