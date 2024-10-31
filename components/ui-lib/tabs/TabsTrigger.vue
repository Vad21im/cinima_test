<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from "radix-vue";
import { cn } from "@/utils";

const props = defineProps<
  TabsTriggerProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TabsTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'h-[34px] rounded-[50px] bg-blue-400 text-xs font-bold text-white px-sm data-[state=active]:bg-blue-200 data-[state=active]:text-black',
        props.class,
      )
    "
  >
    <slot />
  </TabsTrigger>
</template>
