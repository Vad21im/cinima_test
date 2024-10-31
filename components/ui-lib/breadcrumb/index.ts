import { cva } from "class-variance-authority";

export { default as Breadcrumb } from "./Breadcrumb.vue";
export { default as BreadcrumbEllipsis } from "./BreadcrumbEllipsis.vue";
export { default as BreadcrumbItem } from "./BreadcrumbItem.vue";
export { default as BreadcrumbLink } from "./BreadcrumbLink.vue";
export { default as BreadcrumbList } from "./BreadcrumbList.vue";
export { default as BreadcrumbPage } from "./BreadcrumbPage.vue";
export { default as BreadcrumbSeparator } from "./BreadcrumbSeparator.vue";

export const breadcrumbsVariants = cva(
  "transition-colors font-bold text-xs lg:text-lg xl:text-2xl",
  {
    variants: {
      theme: {
        white: "text-navy-400",
        navy: "text-white",
      },
      variant: {
        breadcrumb: "hover:text-violet-500 focus-visible:text-violet-700",
        separator: "",
      },
    },
    defaultVariants: {
      theme: "navy",
      variant: "breadcrumb",
    },
  },
);
