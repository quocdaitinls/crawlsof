import {Box, Button} from "@mui/material";
import {useAppCtx} from "../context/AppContext";
import {signInWithGoogle} from "../services/firebase";

export const Login = () => {
  const {setUser} = useAppCtx();
  return (
    <Box component='div'>
      <Button onClick={() => signInWithGoogle(setUser)}>
        Login with Google
      </Button>
    </Box>
  );
};
