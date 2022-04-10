import {CrawlByIdsForm} from "../apiForm/CrawlByIdsForm";
import {fetchSOFByIdsBuilder} from "../apis/fetchSOF";
import {ApiBox} from "./ApiBox";

export const CrawlByIds = () => {
  return (
    <ApiBox
      title='Crawl by ids'
      form={CrawlByIdsForm}
      fetcherBuilder={fetchSOFByIdsBuilder}
    />
  );
};
