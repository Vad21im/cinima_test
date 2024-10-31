import { type VariantProps, cva } from "class-variance-authority";

export { default as AgeBadge } from "./AgeBadge.vue";

export const ageBadgeVariants = cva(
  "flex w-fit items-center font-bold uppercase text-xs px-xs h-[24px] rounded-[23px] lg:text-lg xl:text-2xl lg:h-[28px] xl:h-[32px] bg-gradient-to-l",
  {
    variants: {
      variant: {
        main: "bg-black",
      },
    },
    defaultVariants: {
      variant: "main",
    },
  },
);

export type AgeBadgeVariants = VariantProps<typeof ageBadgeVariants>;
