<script setup lang="ts">
/**
 * Горизонтальная карточка контента.
 * Используется для эпизодов сериала, трейлеров, фрагментов.
 *
 */
import { AppContentPlayerModal, NuxtLink } from "#components";

const { data, preview } = defineProps({
  data: {
    type: Object,
    required: true,
  },
  /**
   * Открывать или нет плеер в модалке по клику на карточку.
   * - true – открываем попап с плеером
   * - false – переход по роуту
   */
  preview: {
    type: Boolean,
    // true по умолчанию, т.к. переходы нужны только в переключении сезонов
    default: true,
  },
});

const wrapper = preview ? AppContentPlayerModal : NuxtLink;
const to = preview
  ? getMinAgeVersionUrl(useGet(data, "versions"))
  : useGet(data, "url");
</script>

<template>
  <div>
    <component :is="wrapper" :to="to">
      <div class="relative aspect-[16/9] mb-sm">
        <NuxtImg
          preload
          :src="getScreenshot(data.assets)"
          :alt="data.title"
          class="h-full w-full rounded-[10px] object-cover"
        />

        <div class="absolute bottom-0 left-0 w-full px-xs py-xs">
          <div class="flex items-center justify-end">
            <div v-if="data.duration" class="text-xs text-white">
              {{ data.duration }}
            </div>
          </div>
        </div>

        <IconPlayerPlay
          v-if="preview"
          class="absolute inset-0 block size-16 m-auto"
        />
      </div>

      <div class="flex flex-col gap-sm">
        <h5 class="line-clamp-2 text-base font-bold text-white xl:text-2xl">
          {{ data.title }}
        </h5>
        <h6 v-if="data.type" class="text-xs text-blue-400 lg:text-sm">
          {{ data.type }}
        </h6>
        <p
          v-if="data.synopsis"
          class="line-clamp-3 overflow-hidden text-sm text-blue-200 lg:text-xs xl:text-sm"
        >
          {{ data.synopsis }}
        </p>
      </div>
    </component>
  </div>
</template>
