<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { type AgeBadgeVariants, ageBadgeVariants } from "./index";
import { cn } from "@/utils";

const props = defineProps<{
  variant?: AgeBadgeVariants["variant"];
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div :class="cn(ageBadgeVariants({ variant }), props.class)">
    <slot />
  </div>
</template>
