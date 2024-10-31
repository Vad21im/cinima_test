<script setup lang="ts">
import type { PrimitiveProps } from "radix-vue";

interface Props extends PrimitiveProps {
  src?: string;
  alt: string;
}

const props = withDefaults(defineProps<Props>(), {
  src: "",
});
</script>

<template>
  <UiAvatar>
    <UiAvatarImage :src="src" :alt="alt" />
    <UiAvatarFallback />
  </UiAvatar>
</template>
