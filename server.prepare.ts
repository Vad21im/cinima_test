// import { defineNuxtPrepareHandler } from "nuxt-prepare/config";
// import { $fetch } from "ofetch";
// import { API_ENDPOINTS } from "./constants";

/**
 * Модифицируем nuxt-конфиг с возможностью использования запросов к API
 *
 * @see {@link https://nuxt.com/modules/prepare}
 */
// export default defineNuxtPrepareHandler(async () => {
// const getDefaultSiteTitle = async (): Promise<string> => {
//   const url = new URL(
//     API_ENDPOINTS.SEO,
//     process.env.NUXT_PUBLIC_API_BASE,
//   ).toString();
//   const response = await $fetch(url);
//   return response?.default?.title;
// };
// return {
//   appConfig: {
//     site: {
//       name: await getDefaultSiteTitle(),
//     },
//   },
// };
// });
