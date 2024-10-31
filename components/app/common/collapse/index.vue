<script setup lang="ts">
const isOpen = ref(false);

const iconClass = computed(() => [
  "h-[24px] w-[24px]",
  {
    "rotate-180": !isOpen.value,
  },
]);

const buttonText = computed(() =>
  isOpen.value ? "Свернуть" : "Читать полностью",
);
</script>

<template>
  <UiCollapsible v-model:open="isOpen" class="">
    <slot name="visibleContent"></slot>
    <UiCollapsibleContent class="space-y-2">
      <slot name="collapsibleContent"></slot>
    </UiCollapsibleContent>
    <div
      v-if="$slots.collapsibleContent"
      class="space-x-4 px-4 flex items-center justify-between"
    >
      <UiCollapsibleTrigger as-child>
        <UiButton size="sm" variant="stroke">
          {{ buttonText }}
          <template #suffix>
            <Icon :class="iconClass" name="icon:arrow-top" />
          </template>
        </UiButton>
      </UiCollapsibleTrigger>
    </div>
  </UiCollapsible>
</template>
