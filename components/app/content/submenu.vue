<script setup lang="ts">
const { theme } = useAppConfig();
const { params } = useRoute();

const contentStore = useContentStore();

const pageSections = [
  {
    label: "Описание",
    field: "description",
  },
  {
    label: "Сезоны и серии",
    field: "seasons",
  },
  {
    label: "Трейлер",
    field: "trailers",
  },
  {
    label: "Фрагменты",
    field: "fragments",
  },
  {
    label: "Актеры и съемочная группа",
    field: "participants",
  },
];

const pageMapFiltered = pageSections.filter((page) =>
  contentStore.showSection(useGet(params, "id", ""), page.field),
);

const showSubMenu = computed(() =>
  ["movies", "series"].includes(useGet(params, "type", "")),
);
</script>

<template>
  <div
    v-if="showSubMenu"
    class="flex flex-nowrap overflow-y-auto gap-sm hide-scrollbar"
  >
    <UiMenuLink
      v-for="menuItem in pageMapFiltered"
      :key="menuItem.field"
      :link="`#${menuItem.field}`"
      target="_self"
      rel="author"
      color="navyDark"
      size="sm"
      :theme="theme"
    >
      {{ menuItem.label }}
    </UiMenuLink>
  </div>
</template>
