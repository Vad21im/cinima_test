<script setup>
import dayjsFilter from "@/utils/dayjs";

const { bannerVal, isMainBanner } = defineProps({
  bannerVal: {
    type: Object,
    required: true,
  },
  isMainBanner: {
    type: Boolean,
    required: false,
  },
});

const dateRange = computed(() => {
  const dates = [
    dayjsFilter(bannerVal.air_date, "toYear"),
    dayjsFilter(bannerVal.end_date, "toYear"),
  ];
  return useEvery(dates) ? dates.join(" – ") : useGet(dates, "[0]");
});
</script>

<template>
  <div
    :style="`background-image: url(${bannerVal?.image})`"
    class="relative aspect-[16/9] w-full bg-cover bg-center px-sm lg:pt-0 lg:px-xl"
  >
    <div
      class="z-1 absolute left-0 top-0 h-full w-full bg-banner-gradient"
    ></div>

    <NuxtLink
      v-if="isMainBanner"
      class="bg-red absolute left-0 top-0 z-10 h-full w-full cursor-pointer"
      :to="bannerVal.link"
    ></NuxtLink>
    <div
      class="relative z-10 w-full py-base lg:absolute lg:bottom-0 lg:left-0 lg:pb-lg"
    >
      <div class="flex flex-col gap-base lg:px-xl">
        <div class="flex justify-end gap-base lg:justify-start">
          <AppContentLabel v-for="badge in bannerVal?.labels" :key="badge">
            {{ badge }}
          </AppContentLabel>
        </div>

        <h2
          class="overflow-hidden truncate whitespace-nowrap text-2xl font-bold uppercase text-white lg:text-5xl xl:text-7xl"
        >
          {{ bannerVal.name }}
        </h2>

        <div class="flex max-w-[675px] flex-col gap-base">
          <div class="flex flex-col gap-xs">
            <div class="flex gap-xs">
              <p
                v-if="dateRange"
                class="text-base font-bold lg:text-xl xl:text-2xl"
              >
                {{ dateRange }}
              </p>
              <UiAgeBadge>{{ bannerVal.ageRating }}+</UiAgeBadge>
            </div>
            <p class="text-base font-bold lg:text-xl xl:text-2xl">
              {{ bannerVal.genre }}
            </p>
          </div>
          <p
            v-if="!isMainBanner"
            class="line-clamp-4 overflow-hidden text-sm lg:line-clamp-6 lg:text-base xl:text-xl"
          >
            {{ bannerVal.description }}
          </p>
        </div>

        <div class="relative z-10 flex gap-base">
          <AppContentPlayerModal
            v-if="bannerVal?.movieUrl"
            :to="bannerVal.movieUrl"
          >
            <UiButton size="lg" color="violet">
              <template #prefix>
                <IconPlay class="h-[24px] w-[24px] lg:h-[32px] lg:w-[32px]" />
              </template>
              Смотреть
            </UiButton>
          </AppContentPlayerModal>
          <AppContentPlayerModal
            v-if="bannerVal.firstTrailerUrl"
            :to="bannerVal.firstTrailerUrl"
          >
            <UiButton size="lg" color="white">
              <template #prefix>
                <IconTrailer
                  class="h-[24px] w-[24px] lg:h-[32px] lg:w-[32px]"
                />
              </template>
              Трейлер
            </UiButton>
          </AppContentPlayerModal>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
