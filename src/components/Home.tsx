import {Box, TextField} from "@mui/material";
import styled from "styled-components";
import {useAppCtx} from "../context/AppContext";
import {CrawlById} from "./CrawlByIds";
import {CrawlByTag} from "./CrawlByTag";
import {CrawlByUrl} from "./CrawlByUrl";
import MyAppBar from "./MyAppBar";

const StyledHome = styled.div`
  width: 100vw;
  height: 100vh;

  .config-box {
    width: 40%;
    margin: 30px auto;
    text-align: center;
  }

  .api-box {
    width: 70%;
    padding: 10px;
    margin: 0 auto;
  }
`;

export const Home = () => {
  const {proxyToken, setProxyToken} = useAppCtx();

  return (
    <StyledHome className='home'>
      <MyAppBar />
      <Box component='div' className='config-box'>
        <TextField
          label='PROXY TOKEN'
          placeholder='Proxy token'
          value={proxyToken}
          onChange={(e) => setProxyToken(e.target.value)}
          fullWidth
          required
        />
      </Box>
      <Box component='div' className='api-box'>
        <CrawlByUrl />
        <CrawlById />
        <CrawlByTag />
      </Box>
    </StyledHome>
  );
};
