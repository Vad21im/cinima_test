<script setup lang="ts">
import { useMainPageStore } from "~/stores/main-page";
import { getIdFromOID } from "~/utils";
import AppContentCardVertical from "@/components/app/content/card-vertical.vue";
import AppContentCard from "@/components/app/content/card.vue";

definePageMeta({
  layout: "default",
});

const pageStore = useMainPageStore();
await pageStore.loadData();

const cardComponent = (collectionKind) => {
  return collectionKind === "vertical"
    ? AppContentCardVertical
    : AppContentCard;
};
</script>

<template>
  <div>

    <div
      v-if="pageStore?.page?.collections?.length"
      class="overflow-hidden px-sm lg:px-xl"
    >
      <div class="flex flex-col mb-sm gap-base lg:mb-xl">
        <UiSection
          v-for="collection in pageStore?.page?.collections"
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
