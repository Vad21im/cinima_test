<script setup lang="ts">
const { isDesktop } = useBreakpoints();

const props = defineProps({
  breadcrumbs: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <UiBreadcrumb>
    <UiBreadcrumbList>
      <UiBreadcrumbItem>
        <UiBreadcrumbLink v-if="isDesktop" href="/">Главная</UiBreadcrumbLink>
        <UiBreadcrumbLink v-else href="/">
          <IconHome class="aspect-1/1 flex w-[20px]" />
        </UiBreadcrumbLink>
      </UiBreadcrumbItem>

      <template v-for="({ name, link }, index) in breadcrumbs" :key="index">
        <UiBreadcrumbSeparator>/</UiBreadcrumbSeparator>
        <UiBreadcrumbItem v-if="link">
          <UiBreadcrumbLink :href="link">{{ name }}</UiBreadcrumbLink>
        </UiBreadcrumbItem>
        <UiBreadcrumbItem v-else>
          {{ name }}
        </UiBreadcrumbItem>
      </template>
    </UiBreadcrumbList>
  </UiBreadcrumb>
</template>
