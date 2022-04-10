import {CrawlByUrlForm} from "../apiForm/CrawlByUrlForm";
import {fetchSOFByUrlBuilder} from "../apis/fetchSOF";
import {ApiBox} from "./ApiBox";

export const CrawlByUrl = () => {
  return (
    <ApiBox
      title='Crawl by url'
      form={CrawlByUrlForm}
      fetcherBuilder={fetchSOFByUrlBuilder}
    />
  );
};
