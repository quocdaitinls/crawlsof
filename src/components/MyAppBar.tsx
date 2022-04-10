import {Button, Typography} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import styled from "styled-components";
import {useAppCtx} from "../context/AppContext";
import {auth} from "../services/firebase";

const StyledAppBar = styled(AppBar)`
  background-color: #cd6f5c;

  .navbar-body {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .toolbar {
  }

  .name {
    margin: 0 20px;
    font-weight: bold;
  }

  .logout-button {
    color: cyan;
  }
`;

const MyAppBar = () => {
  const {user} = useAppCtx();

  return (
    <StyledAppBar position='static'>
      <Container maxWidth='xl' className='navbar-body'>
        <Toolbar component='div' disableGutters className='toolbar'>
          <Typography component='p' className='name'>
            {user?.displayName}
          </Typography>
          <Button
            variant='outlined'
            className='logout-button'
            onClick={() => auth.signOut()}
          >
            Logout
          </Button>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};
export default MyAppBar;
