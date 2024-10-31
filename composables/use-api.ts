import type { UseFetchOptions } from "nuxt/app";

export const useAPI = (
  url: string | (() => string),
  options: Omit<UseFetchOptions<T>, "default"> & { default: () => T | Ref<T> },
) => {
  const orig = useFetch(url, {
    deep: false,
    $fetch: useNuxtApp().$apiNg,
    ...options,
  });

  orig.then((res) => {
    const error = res.error?.value;
    if (error) {
      showError(error);
    }
    return res;
  });

  return orig;
};
