import { cva, type VariantProps } from "class-variance-authority";

export { default as Views } from "./Views.vue";

export const viewsIconVariants = cva("flex w-[24px] h-[24px]", {
  variants: {
    size: {
      lg: "lg:w-[32px] lg:h-[32px]",
      sm: "",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export const viewsTextVariants = cva("text-white font-bold", {
  variants: {
    size: {
      lg: "text-base lg:text-lg xl:text-2xl",
      sm: "text-xs",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export type ViewsVariants = VariantProps<
  typeof viewsIconVariants | typeof viewsTextVariants
>;
