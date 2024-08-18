<script setup>
import { onMounted, ref, watch, reactive, provide, computed } from 'vue';
import axios from 'axios';
import Header from './components/Header.vue';
import CardList from './components/CardList.vue';
import Drawer from './components/Drawer.vue';

const items = ref([]);
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

const filters = reactive({
    sortBy: 'title',
    searchQuery: ''
});


const onChangeSelect = (event) => {
    filters.sortBy = event.target.value
}
const onChangeSearchInput = (event) => {
    filters.searchQuery = event.target.value
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

const fetchFavorites = async () => {
    try{
        const { data: favorites } = await axios.get(
            `https://75ad0bbae141dd64.mokky.dev/favorites`
        )
        countFavorites.value = favorites.length
        items.value = items.value.map((item) => {
            const favorite = favorites.find((favorite) => favorite.parentId === item.id)
            console.log(favorite)
            if (!favorite) {
                return item;
            }
            return {
                ...item,
                isFavorite: true,
                favoriteId: favorite.id
            }
        })
        console.log(items.value)
    } catch(e){
        console.log(e)
    }
}

const addFavorite = async (item) => {
    try{
        if (!item.isFavorite) {
            const obj = {
                parentId: item.id
            }
            const {data} = await axios.post(
                `https://75ad0bbae141dd64.mokky.dev/favorites`, obj
            )
            countFavorites.value += 1
            item.isFavorite = !item.isFavorite;
            item.favoriteId = data.id
            console.log(data)
        }else {
            await axios.delete(`https://75ad0bbae141dd64.mokky.dev/favorites/${item.favoriteId}`)
            countFavorites.value -= 1
            item.isFavorite = !item.isFavorite;
            item.favoriteId = null
        }

    } catch (err){

    }
    
    console.log(item);
}

const fetchItems = async () => {
    try{
        const params = {
            sortBy: filters.sortBy,
        }
        if (filters.searchQuery) {
            params.title = `*${filters.searchQuery}*`
        }

        const {data} = await axios.get(
            `https://75ad0bbae141dd64.mokky.dev/items`,
            {
                params: params
            }
        )

        items.value = data.map((obj) => ({
            ...obj,
            isFavorite: false,
            isAdded: false
        }))
    } catch(e){
        console.log(e)
    }
}

onMounted(async() => {
    await fetchItems();
    await fetchFavorites();

})
watch(filters, fetchItems)

provide('addFavorite', addFavorite)
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
            <div class="flex justify-between items-center">
                <h2 class="text-3xl font-bold mb-10">Все кроссовки</h2>
                
                <div class="flex gap-4">
                    <select @change="onChangeSelect" class="py-2 px-3 border rounded-xl outline-none">
                        <option value="name">По названию</option>
                        <option value="price">По цене (дешевые)</option>
                        <option value="-price">По цене (дорогие)</option>
                    </select>
                    <div class="relative">
                        <img class="absolute left-3 top-3" src="/search.svg" alt="Search">
                        <div>
                            <input @input="onChangeSearchInput" class="transition border rounded-xl pl-10 py-1.5 pr-4 outline-none focus:border-gray-400" type="text" placeholder="Поиск...">
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <CardList :items="items" @addToFavorite="addFavorite" @add-to-cart="addToCart"/>
            </div>
        </div>
    </div>  
</div>
</template>


