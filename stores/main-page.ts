import { defineStore } from "pinia";

import { getContentID, replaceOidsByData } from "~/utils";
import { APP_MENU_LINKS } from "~/constants";

const API_MAIN_PAGE = "showcases/showcases/mainpage/";
const API_COLLECTION_CONTENT = (collectioId) =>
  `showcases/collections/${collectioId}/content/`;

export const useMainPageStore = defineStore("main-page", () => {
  const page = ref({});
  const collections = ref({});

  const loadData = async () => {
    const fetcher = async () => {
      const fetch = useNuxtApp().$apiNg;

      const page = replaceOidsByData(await fetch(API_MAIN_PAGE));
      const collections = {};

      for (const col of page.collections) {
        const collectionId = getContentID(col.oid).id;
        const collection = await fetch(API_COLLECTION_CONTENT(collectionId));
        // добавляем в коллекцию id для html разметки, для якорных ссылок
        const linkKey = Object.keys(APP_MENU_LINKS).find((link) => {
          return APP_MENU_LINKS?.[link]?.LABEL === col.name;
        });
        col.htmlId = APP_MENU_LINKS[linkKey]?.ID;

        collections[collectionId] = {
          collection: replaceOidsByData(col),
          content: replaceOidsByData(collection.results),
        };
      }

      return { page, collections };
    };

    const { data } = await useAsyncData(
      "mainPage",
      async () => await fetcher(),
      { deep: false },
    );

    page.value = data.value?.page;
    collections.value = data.value?.collections;
  };

  return { page, collections, loadData };
});
