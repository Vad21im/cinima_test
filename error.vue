<script lang="ts" setup>
import type { NuxtError } from "#app";
import type { NuxtErrorData } from "./types";

const props = defineProps<{ error: NuxtError<NuxtErrorData> }>();

const { title, description } = computed<{
  title: string;
  description?: string;
}>(() => {
  switch (props.error?.statusCode) {
    case 404:
      return {
        title: "Контент не найден",
        description: "Ошибка 404",
        ...props.error?.data,
      };

    default:
      return {
        title: "Что-то пошло не так",
        description: Number.isFinite(props.error?.statusCode)
          ? `Ошибка ${props.error?.statusCode}`
          : undefined,
        ...props.error?.data,
      };
  }
}).value;

const canShowDetails = import.meta.dev;

onMounted(() => {
  if (canShowDetails) {
    // eslint-disable-next-line
    console.error(props.error.message, "\n", props.error);
  }
});

onBeforeUnmount(() => {
  clearError();
});
</script>

<template>
  <NuxtLayout name="error">
    <template #title> {{ title }} </template>
    <template #description> {{ description }} </template>
    <template v-if="canShowDetails" #stack>
      <div class="flex flex-col gap-4 text-lg">
        <strong>{{ props.error.message }}</strong>

        <!--        eslint-disable-next-line           -->
        <code v-html="props.error.stack" class="text-xs" /></div
    ></template>
  </NuxtLayout>
</template>
