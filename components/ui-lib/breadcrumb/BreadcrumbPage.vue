<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <span
    role="link"
    aria-disabled="true"
    aria-current="page"
    :class="cn('text-slate-950 font-normal', props.class)"
  >
    <slot />
  </span>
</template>
