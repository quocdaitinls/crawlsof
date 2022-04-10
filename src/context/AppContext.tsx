import React, {useState} from "react";
import firebase from "firebase/compat/app";

export type AppContextValue = {
  user: firebase.User | null;
  userToken: string;
  proxyToken: string;
  setUser: (user: any) => void;
  setUserToken: (userToken: string) => void;
  setProxyToken: (proxyToken: string) => void;
};

const AppContext = React.createContext<AppContextValue>({
  user: null,
  userToken: "",
  proxyToken: "",
  setUser: () => null,
  setUserToken: () => null,
  setProxyToken: () => null,
});

export const useAppCtx = () => React.useContext(AppContext);

export const AppProvider: React.FC = (props) => {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState("");
  const [proxyToken, setProxyToken] = useState("");

  const value = {
    user,
    userToken,
    proxyToken,
    setUser,
    setUserToken,
    setProxyToken,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
