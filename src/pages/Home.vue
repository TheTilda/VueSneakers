<script setup>
import { onMounted, ref, watch, reactive, provide, computed } from 'vue';
import axios from 'axios';
import CardList from '../components/CardList.vue';
import { inject } from 'vue';

const items = ref([]);
const cart = inject('cart')
const addToCart = inject('addToCart')
const countFavorites = inject('countFavorites')

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

onMounted(async() => {
    await fetchItems();
    await fetchFavorites();
})

watch(filters, fetchItems)
</script>

<template>
<div>
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
</template>