<script lang="ts" setup>
/**
 *  Подпорка из 2х строк кода:
 *  import { ConfigProvider } from "radix-vue";
 *  const useIdFunction = () => useId();
 *  нужна для исправления ошибок гидратации в аттрибутах компонентов
 *  UI-библиотеки https://www.shadcn-vue.com/
 */
import { ConfigProvider } from "radix-vue";
const useIdFunction = () => useId();
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <Body
      class="bg-navy-500 text-white antialiased transition-colors duration-300"
    >
      <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </ConfigProvider>
</template>
