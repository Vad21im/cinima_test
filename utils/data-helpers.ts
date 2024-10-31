import { ASSETS_TYPES } from "~/constants";

/**
 * Возвращает кортеж из Типа Контента и ID контента
 * @param oid – например: "collection:1"
 */
export const getContentID = (oid) => {
  let [type, id] = [null, null];
  if (oid && oid.includes(":")) {
    [type, id] = oid.split(":");
  }
  return Object.fromEntries(
    new Map([
      ["type", type],
      ["id", id],
    ]),
  );
};

/**
 * Хелпер возвращающий ID из OID.
 * @param oid:
 *  - OID: season:7vzgmaW-T7SMluCXGC5P3g
 *  - или ID: 7vzgmaW-T7SMluCXGC5P3g
 * @return: ID, 7vzgmaW-T7SMluCXGC5P3g
 */
export const getIdFromOID = (oid) => {
  return oid.split(":")?.[1] || oid;
};

/**
 * Хелпер возвращающий ContentType из OID.
 * @param oid:
 *  - OID: season:7vzgmaW-T7SMluCXGC5P3g
 * @return: type, season
 */
export const getTypeFromOID = (oid) => {
  return oid && oid.split(":")?.[0];
};

export const mapObject = (arr, mapKey, mapValue = (i) => i) =>
  Object.fromEntries(
    arr.map((el, i, arr) => [
      getContentID(mapKey(el, i, arr)).id,
      mapValue(el, i, arr),
    ]),
  );

export const hashFromObjectArrays = (result) => {
  return Object.fromEntries(
    Object.entries(result).map(([key, value]) => {
      const object = mapObject(value, (item) => item.oid);
      return [key, object];
    }),
  );
};

/**
 * Заменяет данные в ответе api вида job:2 на строки из справочников meta
 */
export function replaceOidsByData(data) {
  const metaStore = useMetaStore();

  if (typeof data === "string" && data.includes(":")) {
    const meta = metaStore.getByOID(data);

    if (meta) {
      return meta.name;
    } else {
      return data;
    }
  } else if (Array.isArray(data)) {
    return data.map((item) => replaceOidsByData(item));
  } else if (typeof data === "object" && data !== null) {
    const newObj = {};
    for (const key in data) {
      newObj[key] = replaceOidsByData(data[key]);
    }
    return newObj;
  } else {
    return data;
  }
}

export const objectToHashByOID = (object, oid) => {
  return Object.fromEntries([[getContentID(oid).id, object]]);
};

/**
 * Достает ассет (изображение) нужного типа (ASSETS_TYPES в constants/assets) из массива assets баннера/трейлера и тд
 * Если не нашли - вернет первый. В результат подставляются значения длины и ширины для ресайза
 * https://docs.google.com/document/d/1a_wp2AAY_8LTjps36KIjBVOgrJpDLZDJ2-HCi9okdaI/edit#heading=h.ltxbt4mvqvyb
 */
export const getImageAssetByType = (assets, assetType, width, height) => {
  const asset = assets.find((item) => item.asset_type === assetType);
  const resizeUrl = asset
    ? asset.resize_url
    : assets.length > 0
      ? assets[0].resize_url
      : null;

  return resizeUrl
    ? resizeUrl.replace("{w}", width).replace("{h}", height)
    : null;
};

export const getAfisha = (assets) => {
  return getImageAssetByType(assets, ASSETS_TYPES.AFISHA, 1920, 785);
};

export const getPoster = (assets) => {
  return getImageAssetByType(assets, ASSETS_TYPES.POSTER, 558, 778);
};

export const getScreenshot = (assets) => {
  return getImageAssetByType(assets, ASSETS_TYPES.SCREENSHOT, 860, 480);
};

export const getPhoto = (assets, size) => {
  return getImageAssetByType(assets, ASSETS_TYPES.PHOTO, size, size);
};

export const getCollectionContentByOid = (oid, collections = {}) => {
  let content = [];

  for (const collection in collections) {
    const item = collections[collection];

    if (item.collection.oid === oid) {
      content = item.content;
    }
  }

  return content;
};

/**
 * Возвращает playback_url соответсвующий минимальной возрастной версии.
 * @param versions - список доступных возрастных версий контента.
 * @return sring url
 *
 * TODO: это временное решение, пока на проекте нет авторизации,
 * и нет возможности выбирать версию контента. Потом заменить на выбор версии
 * контента соответсвующей настройкам в профиле.
 */
export const getMinAgeVersionUrl = (versions) => {
  const sorted = useSortedUniqBy(versions, (i) => Math.min(i.age));
  return useGet(sorted, "[0].playback_url");
};
