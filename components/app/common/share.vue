<script setup lang="ts"></script>

<template>
  <div
    class="flex w-full flex-col items-start items-center justify-center rounded-[10px] bg-navy-600 px-sm py-xs gap-sm lg:w-auto lg:flex-row lg:items-center lg:justify-start"
  >
    <p class="text-sm font-bold lg:text-base">Поделиться:</p>
    <div class="flex gap-sm">
      <IconSocialsVk
        class="h-[32px] w-[32px] cursor-pointer xl:h-[40px] xl:w-[40px]"
      />
      <IconSocialsOk
        class="h-[32px] w-[32px] cursor-pointer xl:h-[40px] xl:w-[40px]"
      />
      <IconSocialsTg
        class="h-[32px] w-[32px] cursor-pointer xl:h-[40px] xl:w-[40px]"
      />
      <IconCopyLink
        class="h-[32px] w-[32px] cursor-pointer xl:h-[40px] xl:w-[40px]"
      />
    </div>
  </div>
</template>
