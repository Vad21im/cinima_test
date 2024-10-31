<script setup lang="ts">
/**
 * Компонент обертка для nuxt-svgo, подключается в nuxt.config.ts.
 * У базового компонента nuxt-svgo есть дефолтные стили и пропсы,
 * которые нам не нужны.
 * @props icon - svg файл в виде vue компонента или строка с названием svg
 * иконки
 */
const { icon } = defineProps({
  icon: {
    type: [Object, String],
    required: true,
  },
});

const getIcon = (name: string) =>
  defineAsyncComponent(() => import(`@/assets/icons/${name}.svg`));

const finalIcon = computed(() => (isObject(icon) ? icon : getIcon(icon)));
</script>

<template>
  <component :is="finalIcon" />
</template>
