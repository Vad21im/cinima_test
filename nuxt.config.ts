import { createResolver } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  target: "static",

  // Полезно при отладке, в остальное время включен по умолчанию
  ssr: false,

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
      failOnError: false,
    },
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL,
    defaultLocale: process.env.NUXT_PUBLIC_DEFAULT_LOCALE,
  },

  seo: {
    fallbackTitle: false,
    automaticDefaults: true,
  },

  sitemap: {
    // TODO:  Реализовать генерацию sitemap
  },

  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },

  runtimeConfig: {
    public: {
      apiBase: "", // NUXT_PUBLIC_API_BASE
    },
  },

  app: {
    head: {
      titleTemplate: process.env.NUXT_HEAD_TITLE,
      link: [
        { rel: "icon", type: "image/png", href: process.env.NUXT_SITE_FAVICON },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: process.env.NUXT_HEAD_DESCRIPTION },
      ],
    },
  },

  modules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxt/test-utils/module",
    "shadcn-nuxt",
    "@nuxtjs/google-fonts",
    "@nuxtjs/seo",
    "nuxt-prepare",
    "nuxt-viewport",
    "dayjs-nuxt",
    "nuxt-lodash",
    "nuxt-svgo",
    "@nuxtjs/device",
  ],

  device: {
    refreshOnResize: true, // https://nuxt.com/modules/device#options
  },

  eslint: {
    lintOnStart: false,
  },

  svgo: {
    autoImportPath: process.env.ICONS_DIR,
    componentPrefix: "icon",
    customComponent: "UiCustomIcon",
  },

  imports: {
    dirs: [resolve("./stores"), "~/stores"],
  },

  shadcn: {
    prefix: "Ui",
    componentDir: "./components/ui-lib",
  },

  pinia: {
    storesDirs: ["~/stores/**", "#/stores/**", "@/stores/**"],
  },

  googleFonts: {
    display: "block",
    subsets: ["cyrillic", "latin"],
    families: {
      Manrope: {
        wght: [400, 500, 700],
      },
    },
  },

  compatibilityDate: "2024-07-04",
});
