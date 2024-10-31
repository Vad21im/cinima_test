<script setup lang="ts">
import { APP_FOOTER_LINKS } from "@/constants/app-links";

const { theme } = useAppConfig();

const sections = [
  {
    key: "#contacts",
    title: "Контакты",
    navigation: APP_FOOTER_LINKS.CONTACTS,
  },
  {
    key: "#about",
    title: "О нас",
    navigation: APP_FOOTER_LINKS.ABOUT,
    isCol: true,
  },
  {
    key: "#position",
    title: "Положения",
    navigation: APP_FOOTER_LINKS.POSITION,
    isCol: true,
  },
];

const containerClasses = computed(() => {
  return theme === "white" ? "bg-white text-navy-500" : "bg-navy-600";
});
</script>

<template>

</template>
