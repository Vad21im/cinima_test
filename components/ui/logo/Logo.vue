<script setup lang="ts">
import { logoVariants } from "./index";
import { cn } from "@/utils";

const { theme } = useAppConfig();

const { isDesktop } = useBreakpoints();

const size = "sm";
</script>

<template>
  <NuxtLink to="/">
    <IconLogo v-if="isDesktop" :class="cn(logoVariants({ theme }))" />
    <IconLogoMobile v-else :class="cn(logoVariants({ theme, size }))" />
  </NuxtLink>
</template>
