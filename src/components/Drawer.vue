<script setup lang="ts">
import CartItem from './CartItem.vue';
import DrawerHead from './DrawerHead.vue';
import CartLItemList from './CartLItemList.vue';

</script>

<template>
    <div>
        <div class="fixed top-0 left-0 w-full h-full bg-black z-10 opacity-60"></div>
        <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
            <DrawerHead/>

            <CartLItemList/>

            <div class="flex flex-col gap-4 mb-5 my-6">
                <div class="flex justify-between gap-2">
                    <span>Итого:</span>
                    <div class="flex-1 border-b border-dashed"></div>
                    <b>12900 руб.</b>
                </div>

                <div class="flex justify-between gap-2">
                    <span>Налог: 5%</span>
                    <div class="flex-1 border-b border-dashed"></div>
                    <b>900 руб.</b>
                </div>
                
                <button 
                  disabled=""
                  class="transition cursor-pointer bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 disabled:bg-slate-300 active:bg-lime-700"
                >
                  Оформить заказ

                </button>
            </div>



        </div>
    </div>
</template>