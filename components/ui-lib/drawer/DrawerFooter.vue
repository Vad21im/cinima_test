<script lang="ts" setup>
import type { HtmlHTMLAttributes } from "vue";
import { cn } from "@/utils";

const props = defineProps<{
  class?: HtmlHTMLAttributes["class"];
}>();
</script>

<template>
  <div :class="cn('p-4 flex flex-col gap-2 mt-auto', props.class)">
    <slot />
  </div>
</template>
