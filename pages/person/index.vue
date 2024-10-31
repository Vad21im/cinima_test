<script setup lang="ts">
import { usePersonsStore } from "~/stores/persons";
const personsStore = usePersonsStore()

const confMenuPerson = [1,2,4,5,6,7,8,10]
await personsStore.loadData(confMenuPerson)

let persons = computed(()=>{
  console.log(personsStore.persons)
  return personsStore.persons.filter(e=>!!e?.first_name)
})

function getImgUrl(url) {
  return url[0]?.resize_url.replace('{w}x{h}', '200x200')
}

</script>
<template>
  <div class="mx-auto">
    <h1 class="text-center text-2xl" style="margin: 15px;">Список персон</h1>
    <NuxtLink :to="person?.url"  v-if="!!persons" v-for="(person, index) in persons"  :key="index">
      <div class="bg-white text-black rounded-xl" style="margin-bottom:10px; padding:16px;">
        <div class="flex">
          <div  class="" style="margin-right: 10px;">
            <img v-if="person.assets.length > 0"  class="w-[200px]" :src="getImgUrl(person.assets)" :alt="person.first_name + '' + person.last_name">
            <img v-else class="max-w-[200px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnq0NszJp0MgXTa9oB1eZcGv9I-dh_e7u0PA&s" alt="Нет фото">
          </div>
          <div>
            <h1 class="text-xl">{{ person.first_name }} {{ person.last_name }}</h1>
            <p>{{ person.birthday }}</p>
            <p class="max-w-[600px] description">{{ person.biography }}</p>
          </div>
        </div>
      </div>
    </NuxtLink>
  
  </div>
</template>
<style scoped>
.description {
  line-height: 1.5rem; 
  -webkit-box-orient: vertical;
  display: block;
  display: -webkit-box;
  overflow: hidden!important;
  text-overflow: ellipsis;
  -webkit-line-clamp: 5;
}
</style>
