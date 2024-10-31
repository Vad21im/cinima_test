<script setup lang="ts">
import type { PrimitiveProps } from "radix-vue";

import { menuLinkVariants, type MenuLinkVariants } from "./index";
import { cn } from "@/utils";

interface Props extends PrimitiveProps {
  color: MenuLinkVariants["color"];
  theme: MenuLinkVariants["theme"];
  size: MenuLinkVariants["size"];
  link: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "navy",
  size: "lg",
});

// TODO убрать theme из props
// const { theme } = useAppConfig();
// grep usage UiMenuLink & remove theme props
</script>

<template>
  <NuxtLink
    :class="cn(menuLinkVariants({ color, theme, size }))"
    :href="props.link"
  >
    <slot />
  </NuxtLink>
</template>
