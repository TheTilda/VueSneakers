<script setup>
import { onMounted, ref, watch, reactive } from 'vue';
import axios from 'axios';
import Header from './components/Header.vue';
import CardList from './components/CardList.vue';
import Drawer from './components/Drawer.vue';

const items = ref([]);

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
        const {data: favorites} = await axios.get(
            `https://75ad0bbae141dd64.mokky.dev/favorites`, {params: params}
        )

        items.value = items.value.map((item) => {
            const favorites = favorites.find(favorite => favorite.id === item.id)
            if (!favorite) {
                return item;
            }
            return {
                ...item,
                isFavorite: true,
                favoriteId: favorite.id
            }
        })
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

onMounted(async() => {
    await fetchItems();

})
watch(filters, fetchItems)


</script>

<template>
<div>
    <!-- <Drawer /> -->

    <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">

        <Header/>
        
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
                <CardList :items="items"/>
            </div>
        </div>
    </div>  
</div>
</template>


