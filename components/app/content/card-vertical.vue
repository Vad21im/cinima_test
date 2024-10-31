<script setup>
/**
 * Вертикальная карточка контента.
 * Используется для Фильмов, Сериалов.
 *
 */
const { data, type } = defineProps({
  data: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: "",
  },
});

const firstLabel = data?.labels?.[0];
const genres = useJoin(data.genres, ", ");
</script>

<template>
  <NuxtLink v-if="data" :to="data.url" class="relative flex flex-col gap-sm">
    <AppContentLabel v-if="firstLabel" :is-card="true">{{
      firstLabel
    }}</AppContentLabel>

    <div class="aspect-[5/7] overflow-hidden rounded-[10px] mb-xs">
      <NuxtImg
        preload
        :src="getScreenshot(data.assets)"
        :alt="data.title"
        class="h-full w-full rounded-[10px] object-cover"
      />
    </div>

    <div class="flex flex-col gap-xs">
      <h4 class="line-clamp-2 text-base font-bold text-white lg:text-2xl">
        {{ data.title }}
      </h4>
      <h6 v-if="type" class="text-xs text-blue-400 lg:text-sm">
        {{ type }}
      </h6>
      <p class="text-xs text-blue-200 lg:text-sm">{{ genres }}</p>
    </div>
  </NuxtLink>
</template>
