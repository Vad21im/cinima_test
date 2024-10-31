import { type VariantProps, cva } from "class-variance-authority";

export { default as Avatar } from "./Avatar.vue";
export { default as AvatarImage } from "./AvatarImage.vue";
export { default as AvatarFallback } from "./AvatarFallback.vue";

export const avatarVariant = cva(
  "text-navy-300 bg-navy-700 rounded-full flex items-center justify-center font-normal select-none shrink-0 overflow-hidden",
  {
    variants: {
      size: {
        sm: "size-12 lg:size-14",
        base: "size-12 xl:size-14",
        lg: "size-16",
        xl: "size-14 lg:size-24",
        xxl: "w-[101px] h-[101px] lg:w-[200px] lg:h-[200px] xl:w-[265px] xl:h-[265px]",
      },
    },
  },
);

export type AvatarVariants = VariantProps<typeof avatarVariant>;
