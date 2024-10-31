<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["onChangeSlide"]);

const { sliders, activeBanner } = defineProps({
  sliders: {
    type: Array,
    required: true,
  },
  activeBanner: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="hidden lg:block">
      <div class="flex items-center gap-sm">
        <button
          v-for="slider in sliders"
          :key="slider.oid"
          class="h-[13px] w-[13px] rounded-full bg-navy-400"
          :class="slider.oid === activeBanner.oid ? 'bg-white' : 'bg-navy-400'"
          @click="emit('onChangeSlide', slider)"
        />
      </div>
    </div>

    <div
      class="flex w-full items-center justify-center gap-sm lg:w-auto lg:justify-end"
    />
  </div>
</template>
