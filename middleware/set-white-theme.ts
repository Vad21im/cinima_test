import type { AppConfig } from "nuxt/schema";

export default defineNuxtRouteMiddleware(() => {
  const appConfig: AppConfig = useAppConfig();
  appConfig.theme = "white";
});
