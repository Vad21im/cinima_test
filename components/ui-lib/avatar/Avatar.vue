<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { AvatarRoot } from "radix-vue";
import { type AvatarVariants, avatarVariant } from ".";
import { cn } from "@/utils";

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    size?: AvatarVariants["size"];
  }>(),
  {
    class: "",
    size: "base",
  },
);
</script>

<template>
  <AvatarRoot :class="cn(avatarVariant({ size }), props.class)">
    <slot />
  </AvatarRoot>
</template>
