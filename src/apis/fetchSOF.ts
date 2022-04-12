import axios from "axios";
import {CrawlByTagForm} from "../apiForm/CrawlByTagForm";
import {CrawlByUrlForm} from "../apiForm/CrawlByUrlForm";
import {CrawlByIdForm} from "../apiForm/CrawlByIdForm";
import {SOF} from "../types/sof";

export type Fetcher<V, R> = (form: V) => Promise<R>;

export type FetcherBuilder<V, R> = (proxyToken: string) => Fetcher<V, R>;

export const createFetchSOFBuilder =
  <V, R>(url: string): FetcherBuilder<V, R | null> =>
  (proxyToken) =>
  async (form) => {
    const result = await axios
      .post(url, {proxyToken, ...form})
      .then((result) => result.data as R)
      .catch((err) => {
        console.log(err);
        return null;
      });
    return result;
  };

export const fetchSOFByUrlBuilder = createFetchSOFBuilder<CrawlByUrlForm, SOF>(
  "https://crawlstackoverflow.herokuapp.com/api/question/byurl"
);

export const fetchSOFByTagBuilder = createFetchSOFBuilder<
  CrawlByTagForm,
  SOF[]
>("https://crawlstackoverflow.herokuapp.com/api/question/bytag");

export const fetchSOFByIdBuilder = createFetchSOFBuilder<CrawlByIdForm, SOF[]>(
  "https://crawlstackoverflow.herokuapp.com/api/question/byid"
);
