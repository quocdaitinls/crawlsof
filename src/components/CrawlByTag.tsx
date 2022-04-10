import {CrawlByTagForm} from "../apiForm/CrawlByTagForm";
import {fetchSOFByTagBuilder} from "../apis/fetchSOF";
import {ApiBox} from "./ApiBox";

export const CrawlByTag = () => {
  return (
    <ApiBox
      title='Crawl by tag'
      form={CrawlByTagForm}
      fetcherBuilder={fetchSOFByTagBuilder}
    />
  );
};
