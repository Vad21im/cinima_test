import { defineStore } from "pinia";

import { API_METADATA_ENDPOINTS } from "~/constants";

export const useMetaStore = defineStore("meta", () => {
  const meta = useMapValues(API_METADATA_ENDPOINTS, (v) => ref({}));

  const requests = Object.entries(API_METADATA_ENDPOINTS).map(([key, url]) => [
    key,
    useAPI(url, { immediate: false }),
  ]);

  const loadData = async () => {
    const execs = [];
    const datas = [];

    useForEach(requests, ([key, req]) => {
      const { data, error, execute } = req;
      execs.push(execute());
      datas.push([key, data]);
    });

    await Promise.all(execs);

    const res = useMap(datas, (v) => [v[0], toRaw(v[1]?.value)]);
    useForEach(res, ([key, value]) => (meta[key].value = value));
  };

  const getByOID = (oid) => {
    if (!oid) return null;
    const [listName, id] = oid.split(":");
    if (meta[listName]) {
      return useFind(meta[listName].value, ["oid", oid]);
    }
    return null;
  };

  return { getByOID, loadData, ...meta };
});
