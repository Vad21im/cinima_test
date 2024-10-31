<script setup lang="ts">
import { APP_LINKS } from "~/constants";
import { logoVariants } from "~/components/ui/logo";

const { theme } = useAppConfig();
</script>

<template>
  <div class="h-screen w-screen overflow-hidden">
    <div
      class="container relative flex min-h-screen items-center justify-center"
      :class="`bg-${theme}`"
    >
      <div
        class="to-[rgba(5, 38, 94, 0)] absolute left-1/2 top-1/2 z-0 aspect-square w-5/6 min-w-[698px] -translate-x-1/2 -translate-y-1/2 transform bg-gradient-radial-50 from-[#1F5DC1] from-0% to-100% lg:min-w-[1640px]"
      />
      <div class="z-1 relative flex flex-col items-center gap-14 lg:gap-20">
        <IconLogo :class="cn(logoVariants({ theme, size: 'xlg' }))" />

        <div
          class="to-indigo-400 inline-block bg-gradient-to-b from-white to-blue-200 bg-clip-text text-center text-4xl text-transparent lg:text-6xl"
        >
          <slot name="title" />
        </div>
        <div class="text-base text-blue-200"><slot name="description" /></div>
        <slot name="stack" />
        <UiButton size="lg" color="white" @click="navigateTo(APP_LINKS.HOME)">
          На главную
        </UiButton>
      </div>
    </div>
  </div>
</template>
