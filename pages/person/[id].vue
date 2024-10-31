<script setup lang="ts">
import { useMainPageStore } from "~/stores/main-page";
import { usePersonStore } from "~/stores/person";
import { getIdFromOID } from "~/utils";
import AppContentCardVertical from "@/components/app/content/card-vertical.vue";
import AppContentCard from "@/components/app/content/card.vue";

definePageMeta({
  layout: "default",
});

const route = useRoute()
const pageStore = useMainPageStore();
await pageStore.loadData();

const personStore = usePersonStore()
await personStore.loadData(route.params.id);

const cardComponent = (collectionKind) => {
  return collectionKind === "vertical"
    ? AppContentCardVertical
    : AppContentCard;
};

const collections = computed(()=>{
  const filter = ["ФИЛЬМЫ", "Интересные фрагменты", "Новинки"]
  const priority = {
  'ФИЛЬМЫ': 1,
  'Интересные фрагменты': 2,
  'Новинки': 3
  };
  let pageStoreFiltered = pageStore?.page?.collections?.filter(e=>{
    return filter.includes(e.name)
  }).sort((a, b) => {
  const aPriority = priority[a.name] || Infinity;
  const bPriority = priority[b.name] || Infinity;

  return aPriority - bPriority;
})
  console.log(pageStoreFiltered)
  return pageStoreFiltered
})

function getImgUrl(url) {
  return url[0]?.resize_url.replace('{w}x{h}', '200x200')
}

</script>

<template>
  <div>
    
    <div
      v-if="pageStore?.page?.collections?.length"
      class="overflow-hidden px-sm lg:px-xl"
    >
      <div class="flex flex-col mb-sm gap-base lg:mb-xl">
        <div class="flex" style="margin-top: 30px; margin-left: 50px">
          <div class="circle-image" style="margin-right: 30px;">
            <img v-if="personStore.person.assets.length > 0" :src="getImgUrl(personStore.person.assets)" :alt="personStore.person.first_name + '' + personStore.person.last_name">
            <img v-else  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnq0NszJp0MgXTa9oB1eZcGv9I-dh_e7u0PA&s" alt="Нет фото">
          </div>
          <div class="w-[900px]">
            <h1 class="text-6xl text-bold" style="font-weight: bold; margin-bottom: 16px;">{{ personStore.person.first_name + ' ' + personStore.person.last_name }}</h1>
            <h4 class="text-[#646D9A] text-bold text-[24px]">Родился {{ personStore.person.birthday }}</h4>
            <div class="text-[20px]" v-html="personStore.person.biography"></div>
            <div v-for="reward in rewards">
              {{ reward }} TODO Можно было бы обернуть в UiCustomIcon и показать нужную иконку награды
            </div>
          </div>
        </div>
        <UiSection
          v-for="collection in collections"
          :id="collection.htmlId"
          :key="collection.name"
          :title="collection.name"
        >
          <AppContentSlider
            :id="getIdFromOID(collection.name)"
            v-slot="slotProps"
            :slider-items="
              getCollectionContentByOid(collection.oid, pageStore.collections)
            "
            :variant="collection.kind"
          >
            <component
              :is="cardComponent(collection.kind)"
              :data="slotProps.item"
              :type="collection.name"
            /> 
        </AppContentSlider> 
        </UiSection>
      </div>
    </div>
  </div>
</template>
<style scoped>
.circle-image{
	  display: inline-block;
	  border-radius: 50%;
	  overflow: hidden;
	  width: 200px;
	  height: 200px;
	}
	.circle-image img{
	  width:100%;
	  height:100%;
	  object-fit: cover;
	}
</style>
