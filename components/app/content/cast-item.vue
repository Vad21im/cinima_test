<script setup>
const { person } = defineProps({
  person: {
    type: Object,
    required: true,
  },
});

const personName = computed(
  () => `${useGet(person, "first_name")} ${useGet(person, "last_name")}`,
);
const personPhoto = computed(() => getPhoto(person.assets, 56));
</script>

<template>
  <NuxtLink :href="person.url" class="flex items-center">
    <AppCommonAvatar :src="personPhoto" size="sm" :alt="personName" />
    <span class="text-base font-bold ml-sm lg:text-lg xl:text-xl">
      {{ personName }}
    </span>
  </NuxtLink>
</template>
