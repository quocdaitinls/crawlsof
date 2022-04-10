import React, {useEffect} from "react";
import {Home} from "./components/Home";
import {Login} from "./components/Login";
import {useAppCtx} from "./context/AppContext";
import {auth} from "./services/firebase";

function App() {
  const {userToken, setUser, setUserToken} = useAppCtx();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setUser(user);
      setUserToken((await user?.getIdToken()) || "");
    });
  }, []);

  return <div className='App'>{userToken ? <Home /> : <Login />}</div>;
}

export default App;
