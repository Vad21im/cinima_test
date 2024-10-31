<script lang="ts" setup>
import type { HTMLAttributes } from "vue";

import { cn } from "@/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const { theme } = useAppConfig();

const themeTextColor = computed(() => (theme ? "text-navy-400" : "text-white"));
</script>

<template>
  <li
    :class="
      cn(
        'inline-flex items-center gap-1.5 text-xs font-bold lg:text-lg xl:text-2xl',
        themeTextColor,
        props.class,
      )
    "
  >
    <slot />
  </li>
</template>
