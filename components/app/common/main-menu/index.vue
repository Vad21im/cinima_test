<script setup lang="ts">
import type { PrimitiveProps } from "radix-vue";

import { APP_MENU_LINKS } from "~/constants";

interface Props extends PrimitiveProps {
  color?: "white" | "navy";
}

const props = withDefaults(defineProps<Props>(), {
  color: "white",
});

const { theme } = useAppConfig();
</script>

<template>
  <div class="flex items-center gap-sm">
    <UiMenuLink
      v-for="menuItem in APP_MENU_LINKS"
      :key="menuItem.LABEL"
      :link="menuItem.LINK"
      color="navy"
      size="lg"
      :theme="theme"
    >
      {{ menuItem.LABEL }}
    </UiMenuLink>
  </div>
</template>
