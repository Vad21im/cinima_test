import { COLORS_SCHEME } from "./constants";
const animate = require("tailwindcss-animate");
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import type { PluginAPI } from "tailwindcss/types/config";
import tailwindTypography from "@tailwindcss/typography";
import tailwindScrollbar from "tailwind-scrollbar";

import spacing from "./utils/tailwind";

export default <Partial<Config>>{
  content: [
    "./pages/**/*.{html,js,ts,tsx,vue}",
    "./components/**/*.{html,js,ts,tsx,vue}",
    "./layouts/**/*.{html,js,ts,tsx,vue}",
  ],
  prefix: "",
  theme: {
    screens: {
      sm: "640px",
      lg: "1024px",
      xl: "1920px",
    },
    colors: COLORS_SCHEME,
    fontWeight: {
      normal: "400",
      medium: "500",
      bold: "700",
    },
    fontSize: {
      xs: ["12px", "1.25"],
      sm: ["14px", "1.25"],
      base: ["16px", "1.5"],
      lg: ["18px", "1.5"],
      xl: ["20px", "1.5"],
      "2xl": ["24px", "1.5"],
      "3xl": ["30px", "1.25"],
      "4xl": ["36px", "1.25"],
      "5xl": ["48px", "1"],
      "6xl": ["60px", "1"],
      "7xl": ["72px", "1"],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "16px",
        sm: "24px",
        lg: "32px",
        xl: "64px",
      },
    },
    extend: {
      typography: (theme: PluginAPI["theme"]) => ({
        white: {
          css: {
            "--tw-prose-body": theme("colors.white"),
            "--tw-prose-headings": theme("colors.white"),
            "--tw-prose-lead": theme("colors.white"),
            "--tw-prose-links": theme("colors.white"),
            "--tw-prose-bold": theme("colors.white"),
            "--tw-prose-counters": theme("colors.white"),
            "--tw-prose-bullets": theme("colors.white"),
            "--tw-prose-hr": theme("colors.white"),
            "--tw-prose-quotes": theme("colors.white"),
            "--tw-prose-quote-borders": theme("colors.white"),
            "--tw-prose-captions": theme("colors.white"),
            "--tw-prose-th-borders": theme("colors.white"),
            "--tw-prose-td-borders": theme("colors.white"),
            "--tw-prose-invert-body": theme("colors.white"),
            "--tw-prose-invert-headings": theme("colors.white"),
            "--tw-prose-invert-lead": theme("colors.white"),
            "--tw-prose-invert-links": theme("colors.white"),
            "--tw-prose-invert-bold": theme("colors.white"),
            "--tw-prose-invert-counters": theme("colors.white"),
            "--tw-prose-invert-bullets": theme("colors.white"),
            "--tw-prose-invert-hr": theme("colors.white"),
            "--tw-prose-invert-quotes": theme("colors.white"),
            "--tw-prose-invert-quote-borders": theme("colors.white"),
            "--tw-prose-invert-captions": theme("colors.white"),
            "--tw-prose-invert-code": theme("colors.white"),
            "--tw-prose-invert-th-borders": theme("colors.white"),
            "--tw-prose-invert-td-borders": theme("colors.white"),
          },
        },
      }),
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "gradient-radial-50":
          "radial-gradient(50% 50% at 50% 50%, var(--tw-gradient-stops))",
        "banner-gradient":
          "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), linear-gradient(180deg, rgba(9, 23, 94, 0) 36.16%, #09175E 100%)",
      },
    },
  },
  corePlugins: {
    fontFamily: false,
    padding: false,
    margin: false,
    space: false,
  },
  plugins: [
    animate,
    tailwindTypography,
    spacing,
    tailwindScrollbar,
    plugin(({ addBase, theme }) => {
      addBase({
        // Добавление базовых стилей для <html>
        html: {
          fontFamily: "Manrope, sans-serif",
          color: theme("colors.white"),
          backgroundColor: theme("colors.navy.500"),
          scrollBehavior: "smooth",
        },
      });
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".hide-scrollbar": {
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
};
