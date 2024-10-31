<script setup lang="ts">
import { NuxtLink } from "#components";
import dayjsFilter from "~/utils/dayjs";

const { params } = useRoute();
const { isMobile } = useBreakpoints();

const contentStore = useContentStore();
const bannerStore = useBannerStore();

const content = contentStore.getContent(params.id);
const banner = bannerStore.getBannerById(params.id);

const dateRange = computed(() => {
  const dates = [
    dayjsFilter(useGet(banner, "title.air_date"), "toYear"),
    dayjsFilter(useGet(banner, "title.end_date"), "toYear"),
  ];
  return useEvery(dates) ? dates.join(" – ") : useGet(dates, "[0]");
});

const infoRows = [
  {
    label: computed(() =>
      isMobile.value ? "Оригинал" : "Оригинальное название",
    ),
    value: content?.original_title,
  },
  {
    label: "Выпускается",
    value: dateRange,
  },
  // жанры в 2х вариантах:
  // - из баннера для Фильмов, Сериалов
  // - из контента – для Проектов
  {
    label: "Жанры",
    value: banner?.title?.genres?.join(", "),
  },
  {
    label: "Жанры",
    value: content?.genres?.join(", "),
  },
  {
    label: "Длительность",
    value: content?.duration
      ? dayjsFilter(`1/1/1 ${content?.duration}`, "toTimeLocale")
      : "",
  },
  {
    label: computed(() => (isMobile.value ? "Студия" : "Студия-производитель")),
    value: content?.studio,
  },
  {
    label: computed(() => (isMobile.value ? "Страна" : "Страны производства")),
    value: useGet(content, "countries", []).join(", "),
  },
  {
    label: "Проект",
    value: useGet(content, "project.title"),
    link: useGet(content, "project.url"),
  },
];

const filteredInfo = computed(() => infoRows.filter((info) => info.value));
const componentInfoRow = (infoRow) =>
  useGet(infoRow, "link") ? NuxtLink : "span";
</script>

<template>
  <dl class="order-1 flex w-full flex-col whitespace-nowrap gap-sm lg:order-2">
    <div
      v-for="infoItem in filteredInfo"
      :key="infoItem.label"
      class="flex text-xs gap-sm lg:text-base xl:text-xl"
    >
      <dt class="w-1/2 whitespace-normal text-navy-300">
        {{ infoItem.label }}
      </dt>
      <dd class="w-1/2 whitespace-normal">
        <component
          :is="componentInfoRow(infoItem)"
          :href="infoItem.link"
          :class="{ 'text-blue-300': !!infoItem.link }"
        >
          {{ infoItem.value }}
        </component>
      </dd>
    </div>
  </dl>
</template>
