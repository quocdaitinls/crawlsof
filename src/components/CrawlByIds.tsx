import {CrawlByIdForm} from "../apiForm/CrawlByIdForm";
import {fetchSOFByIdBuilder} from "../apis/fetchSOF";
import {ApiBox} from "./ApiBox";

export const CrawlById = () => {
  return (
    <ApiBox
      title='Crawl by id'
      form={CrawlByIdForm}
      fetcherBuilder={fetchSOFByIdBuilder}
    />
  );
};
