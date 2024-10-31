export default defineNuxtRouteMiddleware(async () => {
  const metaStore = useMetaStore();

  await callOnce("meta", async () => {
    await metaStore.loadData();
  });
});
