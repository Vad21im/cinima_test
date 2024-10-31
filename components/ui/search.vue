<script setup lang="ts">
import type { HTMLAttributes } from "vue";

import { cn } from "~/utils";

const props = defineProps<{
  modelValue: string;
  class?: HTMLAttributes["class"];
  name: string;
  placeholder?: string;
}>();

const model = defineModel<string>();

const searchInputRef = ref();

const clearSearchInput = () => {
  searchInputRef.value.clearValue();
};

const searching = () => {
  // eslint-disable-next-line
  console.log("start search");
};

const isShowClearIcon = computed(() => !!model.value);
</script>

<template>
  <div :class="cn('relative flex w-full', props.class)">
    <UiInput
      ref="searchInputRef"
      v-model="model"
      :name="props.name"
      :placeholder="placeholder"
    />
    <IconSearch
      class="absolute right-[10px] top-1/2 h-[16px] w-[16px] -translate-y-1/2 cursor-pointer !text-navy-400 lg:right-[16px] xl:right-[20px] xl:h-[24px] xl:w-[24px]"
      @click="searching"
    />
    <IconClose
      v-if="isShowClearIcon"
      class="absolute right-[40px] top-1/2 h-[16px] w-[16px] -translate-y-1/2 cursor-pointer text-navy-400 lg:right-[42px] xl:right-[54px] xl:h-[24px] xl:w-[24px]"
      @click="clearSearchInput"
    />
  </div>
</template>
