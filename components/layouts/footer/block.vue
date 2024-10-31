<script setup lang="ts">
const { section } = defineProps({
  section: {
    type: Object,
    required: true,
  },
});

const { theme } = useAppConfig();

const flexColNavigationClass = computed(() => [
  "flex gap-sm",
  {
    "flex-col": section.isCol,
  },
]);
</script>

<template>
  <div class="flex flex-col gap-sm">
    <h4
      class="text-base font-bold lg:text-xl xl:text-2xl"
      :class="theme === 'white' ? 'text-navy-500' : 'text-white'"
    >
      {{ section.title }}
    </h4>

    <nav :class="flexColNavigationClass">
      <NuxtLink
        v-for="link in section.navigation"
        :key="link.LABEL"
        :href="link.LINK"
      >
        <div>
          <UiCustomIcon
            v-if="link.ICON"
            :icon="link.ICON"
            class="h-[32px] w-[32px] xl:h-[40px] xl:w-[40px]"
            :class="theme === 'white' ? 'text-navy-500' : 'text-white'"
          />
        </div>

        <span
          v-if="link.LABEL"
          class="lg:text-md text-sm font-bold text-blue-300 xl:text-lg"
          :class="
            theme === 'white'
              ? 'text-blue-300 hover:text-violet-500'
              : 'text-blue-300 hover:text-white'
          "
        >
          {{ link.LABEL }}
        </span>
      </NuxtLink>
    </nav>
  </div>
</template>
