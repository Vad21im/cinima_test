<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/utils";
import { breadcrumbsVariants } from "~/components/ui-lib/breadcrumb/index";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const { theme } = useAppConfig();
</script>

<template>
  <li
    role="presentation"
    aria-hidden="true"
    :class="
      cn(breadcrumbsVariants({ theme, variant: 'separator' }), props.class)
    "
  >
    <slot />
  </li>
</template>
