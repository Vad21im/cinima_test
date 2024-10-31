<script setup lang="ts">
const { awardsList } = defineProps({
  awardsList: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div v-if="useSize(awardsList)" class="flex flex-wrap gap-xs">
    <div
      v-for="award in awardsList"
      :key="award.label"
      class="flex w-fit max-w-[132px] flex-col items-center justify-around rounded-[20px] bg-navy-600 p-xs gap-xs lg:max-w-[225px]"
    >
      <IconAward class="h-[46px] w-[80px] shrink-0" />
      <p class="line-clamp-2 text-center text-xs lg:text-base xl:text-xl">
        {{ award.label }}
      </p>
    </div>
  </div>
</template>
