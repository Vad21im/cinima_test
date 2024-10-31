<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <ol
    :class="
      cn('flex flex-wrap items-center break-words text-sm gap-xs', props.class)
    "
  >
    <slot />
  </ol>
</template>
