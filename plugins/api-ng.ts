import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const { public: config } = nuxtApp.$config;
  const apiNg = $fetch.create({
    baseURL: config.apiBase,
  });

  return {
    provide: {
      apiNg,
    },
  };
});
