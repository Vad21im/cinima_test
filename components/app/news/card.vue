<script setup>
const description =
  'В трейлере фильма "Марвелы" намекнули на Стражей Галактики. Милли Бобби Браун выходит замуж за сына';
const date = "11 Апреля 2023";
</script>

<template>
  <div class="rounded-[10px] bg-grey-600">
    <div class="relative aspect-[16/9] mb-sm">
      <NuxtLink class="cursor-pointer" to="">
        <NuxtImg
          preload
          src="/card/card-demo.png"
          alt="Новость"
          class="h-full w-full rounded-t-[10px] object-cover"
        />
        <p
          class="absolute bottom-[20px] left-[20px] rounded-[5px] bg-blue-100 text-base font-bold text-black p-xs"
        >
          Дайджест
        </p>
      </NuxtLink>
    </div>

    <div class="flex flex-col p-sm gap-xs">
      <NuxtLink class="cursor-pointer" to="">
        <p class="text-xl font-bold text-black">{{ description }}</p>
      </NuxtLink>
      <p class="text-sm text-grey-800">{{ date }}</p>
    </div>
  </div>
</template>
