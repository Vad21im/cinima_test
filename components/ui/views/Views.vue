<script setup lang="ts">
import {
  viewsTextVariants,
  viewsIconVariants,
  type ViewsVariants,
} from "./index";

const props = defineProps<{
  size?: ViewsVariants["size"];
}>();
</script>

<template>
  <div class="flex items-center gap-xs">
    <IconView :class="cn(viewsIconVariants({ size }))" />
    <p :class="cn(viewsTextVariants({ size }))">
      <slot />
    </p>
  </div>
</template>
