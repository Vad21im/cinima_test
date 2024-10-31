<script setup>
const { isCard } = defineProps({
  isCard: {
    type: Boolean,
    required: false,
    default: false,
  },
});

// TODO: убрать и заменить на нормальные классы tailwind, как было в удаленном компоненте badge
const backgrounsColor =
  "background: linear-gradient(270deg, #961CC7 0%, #7015C8 50%, #0000C9 100%)";
// TODO: позиционированием должен заниматься контейнер лейбла, тогда if-then-else не нужен
const classNames = isCard
  ? "absolute top-2 flex items-center justify-center left-0 right-0 my-auto"
  : "";
</script>

<template>
  <div :class="classNames">
    <div :style="backgrounsColor" class="inline-block rounded-[10px] p-xs">
      <span class="text-sm font-bold uppercase text-white">
        <slot />
      </span>
    </div>
  </div>
</template>
