import type { $Fetch } from "nitropack";
import type { TRequestMethod } from "~/types";

class ApiClient {
  private $fetch: $Fetch;

  constructor(fetcher) {
    const config = useRuntimeConfig();
    this.$fetch =
      fetcher ||
      $fetch.create({
        baseURL: config.public.apiBase,
        onRequest: (request) => {
          // dispatch global loading
        },
        onResponse: (response) => {
          // stop global loading
        },
        onRequestError: (error) => {
          // dispatch global loading
          // eslint-disable-next-line
          console.log(error);
        },
      });
  }

  async call<T>(
    method: TRequestMethod,
    url: string,
    extras: Extras,
  ): Promise<T> {
    const $res: T = await this.$fetch(url, { method, ...extras });
    return $res;
  }

  async get<T>(url, extras?): Promise<T> {
    return await this.call("GET", url, { ...extras });
  }

  async getAll<T>(urls, extras?): Promise<T> {
    return await Promise.all(
      Object.entries(urls).map(async ([key, url]) => [
        key,
        await this.get(url, extras),
      ]),
    )
      .then((res) => {
        return Object.fromEntries(res);
      })
      // eslint-disable-next-line
      .catch((error) => console.error(error));
  }

  async post() {
    throw await new Error("not implement");
  }

  async put() {
    throw await new Error("not implement");
  }

  async patch() {
    throw await new Error("not implement");
  }

  async delete() {
    throw await new Error("not implement");
  }

  async options() {
    throw await new Error("not implement");
  }
}

export default ApiClient;
