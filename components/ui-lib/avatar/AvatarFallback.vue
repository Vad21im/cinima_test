<script setup lang="ts">
import { AvatarFallback, type AvatarFallbackProps } from "radix-vue";

const props = defineProps<AvatarFallbackProps>();
</script>

<template>
  <AvatarFallback v-bind="props" class="size-full">
    <slot>
      <div class="flex size-full items-center justify-center">
        <IconUser class="size-7/12" />
      </div>
    </slot>
  </AvatarFallback>
</template>
