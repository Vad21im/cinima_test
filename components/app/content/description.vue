<script setup lang="ts">
const route = useRoute();
const contentStore = useContentStore();
const content = contentStore.getContent(route.params.id);
const { selectedEpisode } = useSeries();

/**
 * Прокси-хелперы:
 *  - description для фильмов и сериалов
 *  - synopsis для эпизода
 */
const description = computed(
  () => selectedEpisode?.value?.synopsis || content.description,
);
const title = computed(() => {
  if (selectedEpisode?.value) {
    return selectedEpisode.value.title;
  }
  return content?.original_title || content?.title;
});

/**
 * Награды
 */
const awardsList = useGet(content, "rewards", []).map((reward) => ({
  label: reward,
}));

/**
 * Оформление коренвого компонента в зависимости от типа страницы, на которой
 * он отображается.
 */
const descriptionClass = [
  "flex flex-wrap gap-base justify-between",
  { "mt-xl": route.params.type === "projects" },
];
</script>

<template>
  <div id="description" :class="descriptionClass">
    <div class="flex w-full flex-col gap-base lg:w-6/12 xl:w-7/12">
      <AppContentSubmenu />

      <div class="flex flex-col gap-sm">
        <h1 class="text-3xl font-bold lg:text-5xl xl:text-7xl">{{ title }}</h1>

        <!-- TODO: integrate -->
        <UiViews v-if="0" size="lg">42 просмотров</UiViews>
      </div>

      <p class="text-sm lg:text-base xl:text-xl">{{ description }}</p>

      <AppContentAwards class="order-2 lg:order-4" :awards-list="awardsList" />
    </div>

    <div
      class="flex w-full flex-col items-start gap-xl lg:w-5/12 lg:items-end xl:w-4/12"
    >
      <AppCommonShare class="order-2 lg:order-1" />

      <AppContentInfo />
    </div>
  </div>
</template>
