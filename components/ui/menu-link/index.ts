import { cva, type VariantProps } from "class-variance-authority";

export { default as MenuLink } from "./MenuLink.vue";

export const menuLinkVariants = cva(
  "whitespace-nowrap font-bold cursor-pointer",
  {
    variants: {
      color: {
        navy: "text-navy-400 hover:text-violet-500 active:text-violet-700",
        navyDark: "text-navy-500 hover:text-violet-300",
      },
      theme: {
        white: "",
        navy: "text-white",
      },
      size: {
        sm: "text-base lg:text-lg xl:text-xl",
        lg: "text-base xl:text-2xl",
      },
    },
    defaultVariants: {
      theme: "navy",
      size: "lg",
      color: "navy",
    },
  },
);

export type MenuLinkVariants = VariantProps<typeof menuLinkVariants>;
