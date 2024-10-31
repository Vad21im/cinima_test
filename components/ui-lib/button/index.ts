import { type VariantProps, cva } from "class-variance-authority";

export { default as Button } from "./Button.vue";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition-colors disabled:pointer-events-none disabled:bg-grey-900 disabled:text-grey-700 rounded-[50px] gap-xs",
  {
    variants: {
      variant: {
        default: "",
        stroke:
          "border-[2px] border-white bg-transparent hover:border-blue-200 active:border-blue-300 disabled:bg-transparent disabled:border-grey-900",
        link: "text-xs font-normal text-violet-200 hover:text-violet-500 disabled:bg-transparent",
      },
      size: {
        default: "",
        lg: "text-base lg:text-xl xl:text-3xl h-[44px] lg:h-[54px] xl:h-[64px] px-sm",
        sm: "text-xs font-bold lg:text-base xl:text-xl h-[34px] lg:h-[38px] xl:h-[44px] px-sm",
        round: "h-[34px] w-[34px] min-w-[34px]",
      },
      color: {
        default: "",
        violet:
          "bg-violet-500 text-white hover:bg-violet-400 active:bg-violet-300",
        red: "bg-red-400 hover:bg-red-300 active:bg-red-200",
        blue: "bg-blue-400 text-slate-900 hover:bg-blue-300 active:bg-blue-200 active:text-black",
        white: "bg-white text-black hover:bg-blue-200 active:bg-blue-300",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      color: "default",
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
