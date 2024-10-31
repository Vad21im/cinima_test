<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useField } from "vee-validate";
import { vMaska } from "maska";
import type { RuleExpression } from "vee-validate";

import { cn } from "@/utils";

const props = defineProps<{
  modelValue: string | number;
  class?: HTMLAttributes["class"];
  name: string;
  rules?: RuleExpression<string | number>;
  maska?: object | string;
  placeholder?: string;
  label?: string;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const inputRef = ref();

const { value, errorMessage } = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});

const clearValue = () => {
  value.value = "";
  inputRef.value.focus();
};

watch(value, (newValue) => {
  emits("update:modelValue", newValue);
});

defineExpose({
  clearValue,
});
</script>

<template>
  <label class="w-full">
    <slot name="label">
      <span v-if="props.label" class="flex mb-xs">{{ props.label }}</span>
    </slot>
    <input
      ref="inputRef"
      v-model="value"
      v-maska:[props.maska]
      :placeholder="props.placeholder"
      :name="props.name"
      :class="
        cn(
          'flex h-[36px] h-[46px] w-full rounded-[10px] border border-blue-200 bg-white text-sm text-black px-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-lg placeholder:text-blue-200 hover:border-violet-200 focus-visible:border-violet-500 focus-visible:outline-none lg:text-lg xl:h-[56px] xl:text-lg',
          props.class,
          errorMessage
            ? 'border-red-300 hover:border-red-300 focus-visible:border-red-300'
            : '',
        )
      "
    />
    <span v-if="props.rules" class="flex h-[15px] text-sm text-red-300">{{
      errorMessage
    }}</span>
  </label>
</template>
