<script setup lang="ts">
/**
 * Компонент разметки в колонки, 2 видов. На данный момент используется для
 * карточек контента (фильмы, сериалы и т.д.).
 * @props {Array} gridItems - массив данных для элементов разметки,
 * например данные фильмов для вывода карточек фильмов
 * @props {"horizontal" | "vertical"} [variant=horizontal] - вариант
 * отображения элементов разметки на странице,
 * на данный момент "horizontal" | "vertical", решают во сколько колонок
 * выводить элементы разметки
 * @slot default - дефолтный слот, который принимает компонент или верстку,
 * отображаемую как элемент сетки
 * @example
 * <UiGrid
 *   v-slot="slotProps"
 *   :grid-items="movies"
 *   variant="horizontal"
 * >
 *   <AppContentCard :data="slotProps.item" />
 * </UiGrid>
 */
const { gridItems, variant } = defineProps({
  gridItems: {
    type: Array,
    required: true,
  },
  variant: {
    type: String,
    default: "horizontal",
  },
});

const containerClass = computed(() => [
  "grid gap-y-base gap-x-sm",
  {
    "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6":
      variant === "vertical",
    "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4":
      variant === "horizontal",
  },
]);
</script>

<template>
  <div :class="containerClass">
    <slot v-for="(item, index) in gridItems" :key="index" :item="item" />
  </div>
</template>
