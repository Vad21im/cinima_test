<script setup>
/**
 * Базовый (ui) компонент секции, включающий в себя заголовок и слот с
 * любым содержимым под заголовком. Компонент не должен включать в себя логику!
 * @props {string} title - заголовок секции, отображаемые над контентом в слоте
 * @slot default - дефолтный слот, который принимает компонент или верстку,
 * отображаемую под заголовком (внутри секции)
 * @example
 * <UiSection title="Заголовок над контентом внизу">
 *   <p>Блок для примера</p>
 * </UiSection>
 */
const { title } = defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="flex flex-col -mt-base pt-base">
    <h3 class="text-lg font-bold mb-base lg:text-3xl xl:text-5xl">
      {{ title }}
    </h3>
    <div>
      <slot />
    </div>
  </div>
</template>
