import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Box, IconButton, Typography} from "@mui/material";
import {Formik, FormikValues} from "formik";
import {useState} from "react";
import ReactJson from "react-json-view";
import {useMutation} from "react-query";
import styled from "styled-components";
import {FetcherBuilder} from "../apis/fetchSOF";
import {useAppCtx} from "../context/AppContext";
import {useFormConfig} from "../hook/useFormConfig";
import {Constructor} from "../types";
import {SOF} from "../types/sof";
import {Config} from "../services/form";
import {Input} from "./Input";
import {toArray} from "../util";
import {buildSOFConverter} from "../services/converter";
import {postAll} from "../services/postStdHub";
import {LoadingButton} from "@mui/lab";

const StyledApiBox = styled(Box)`
  width: 100%;
  border: 2px solid black;
  border-radius: 10px;
  margin: 10px 0;
  overflow: hidden;

  .header {
    border-bottom: 2px solid black;
    padding: 10px 20px;
    display: flex;
  }

  .body {
  }

  .title {
    font-weight: bold;
    font-size: 20px;
    flex: 1;
  }

  .form {
    padding: 10px 40px;
  }

  .form__header {
    font-weight: bold;
    font-size: 18px;
  }

  .form__body {
    display: flex;
    flex-direction: column;
  }

  .crawl-button {
    margin: 10px 0;
    padding: 8px 40px;
    align-self: flex-end;
  }

  .result {
    padding: 10px 40px;
  }

  .result__header {
    font-weight: bold;
    font-size: 18px;
  }

  .result__view {
    margin: 10px 0;
    border: 1px solid gray;
    border-radius: 10px;
    max-height: 400px;
    overflow: hidden scroll;
  }

  .post-result-btn {
    margin: 10px 0;
  }

  .collapsed {
    display: none !important;
  }
`;

export type Result = SOF | SOF[] | null;

type CrawlFormProps<V extends FormikValues, R extends Result> = {
  form: Constructor<V>;
  fetcherBuilder: FetcherBuilder<V, R>;
  setResult: (result: R) => any;
};

const CrawlForm = <V extends FormikValues, R extends Result>(
  props: CrawlFormProps<V, R>
) => {
  const {proxyToken} = useAppCtx();
  const {form, fetcherBuilder, setResult} = props;

  const fetcher = fetcherBuilder(proxyToken);
  const fetchSOF = useMutation(fetcher, {
    onSuccess: (result) => setResult(result),
  });

  const formConfig = useFormConfig(form, (values) => {
    fetchSOF.mutate(values);
  });

  const xxx: Config<V> = Reflect.getMetadata("config", form.prototype);
  const InputFields = Object.keys(xxx).map((key) => {
    const {label, required} = xxx[key];
    return <Input key={key} name={key} label={label} required={required} />;
  });

  return (
    <Formik {...formConfig}>
      {(formikProps) => (
        <form onSubmit={formikProps.handleSubmit}>
          {InputFields}
          <LoadingButton
            type='submit'
            className='crawl-button'
            variant='contained'
            loading={fetchSOF.isLoading}
          >
            Crawl
          </LoadingButton>
        </form>
      )}
    </Formik>
  );
};

type ApiBoxProps<V extends FormikValues, R extends Result> = {
  title: string;
} & Omit<CrawlFormProps<V, R>, "setResult">;

export const ApiBox = <V extends FormikValues, R extends Result>(
  props: ApiBoxProps<V, R>
) => {
  const {user, userToken} = useAppCtx();

  const {title, form, fetcherBuilder} = props;
  const [collapsed, setCollapsed] = useState(true);
  const [result, setResult] = useState<Result>();

  const handlePost = async () => {
    if (!user) return;

    const arrSOF = toArray(result).filter((sof) => sof) as SOF[];

    const SOFConverters = arrSOF.map((sof) => buildSOFConverter(sof));
    const res = await SOFConverters.reduce(
      (chain, current) =>
        chain
          .catch((err) => console.log(err))
          .finally(() => postAll(current, user.uid!, userToken)),
      Promise.resolve()
    );
    return res;
  };

  const postToStdHub = useMutation(handlePost, {
    onSuccess: (value) => {
      console.log(value);
    },
  });

  return (
    <StyledApiBox component='div'>
      <Box component='div' className='header'>
        <Typography component='h2' className='title'>
          {title}
        </Typography>
        <IconButton
          onClick={() => setCollapsed((preCollapsed) => !preCollapsed)}
        >
          {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
      </Box>
      <Box component='div' className={`body ${collapsed ? "collapsed" : ""}`}>
        <Box component='div' className='form'>
          <Typography component='h3' className='form__header'>
            Inputs
          </Typography>
          <CrawlForm
            form={form}
            fetcherBuilder={fetcherBuilder}
            setResult={setResult}
          />
        </Box>
        <Box component='div' className='result'>
          <Typography component='h3' className='result__header'>
            Result
          </Typography>
          <Box component='div' className='result__view'>
            <ReactJson
              src={result || {}}
              name={false}
              theme='flat'
              collapsed={2}
              style={{
                width: "100%",
                padding: "30px",
                fontSize: "14px",
              }}
            />
          </Box>
          <LoadingButton
            variant='contained'
            className='post-result-btn'
            onClick={() => postToStdHub.mutate()}
            loading={postToStdHub.isLoading}
          >
            Post StudentHub
          </LoadingButton>
        </Box>
      </Box>
    </StyledApiBox>
  );
};
