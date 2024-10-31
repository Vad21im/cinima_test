import { cva, type VariantProps } from "class-variance-authority";

export { default as Logo } from "./Logo.vue";

export const logoVariants = cva("cursor-pointer", {
  variants: {
    theme: {
      white: "text-logo",
      navy: "text-white",
    },
    size: {
      xlg: "w-[206px] h-[64px]",
      lg: "w-[103px] h-[32px] xl:w-[206px] xl:h-[64px]",
      sm: "w-[44px] h-[44px]",
    },
  },
  defaultVariants: {
    theme: "navy",
    size: "lg",
  },
});

export type LogoVariants = VariantProps<typeof logoVariants>;
