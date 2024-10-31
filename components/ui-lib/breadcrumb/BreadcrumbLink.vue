<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

import { breadcrumbsVariants } from "./index";
import { cn } from "@/utils";

const props = withDefaults(
  defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>(),
  {
    class: "",
  },
);

const { theme } = useAppConfig();
</script>

<template>
  <NuxtLink
    :as-child="asChild"
    :class="cn(breadcrumbsVariants({ theme }), props.class)"
  >
    <slot />
  </NuxtLink>
</template>
