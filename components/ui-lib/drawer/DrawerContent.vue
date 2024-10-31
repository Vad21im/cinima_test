<script lang="ts" setup>
import { DrawerContent, DrawerPortal } from "vaul-vue";
import type { DialogContentEmits, DialogContentProps } from "radix-vue";
import { useForwardPropsEmits } from "radix-vue";
import type { HtmlHTMLAttributes } from "vue";
import DrawerOverlay from "./DrawerOverlay.vue";
import { cn } from "@/utils";

const props = defineProps<
  DialogContentProps & { class?: HtmlHTMLAttributes["class"] }
>();
const emits = defineEmits<DialogContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerContent
      v-bind="forwarded"
      :class="
        cn(
          'mt-24 border-slate-200 dark:border-slate-800 dark:bg-slate-950 fixed inset-x-0 bottom-0 z-50 flex h-auto flex-col rounded-t-[10px] border bg-white',
          props.class,
        )
      "
    >
      <div
        class="mt-4 bg-slate-100 dark:bg-slate-800 h-2 w-[100px] rounded-full mx-auto"
      />
      <slot />
    </DrawerContent>
  </DrawerPortal>
</template>
