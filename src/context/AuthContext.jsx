import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export  function AuthContextProvider(props) {
  const [token, setToken_] = useState(localStorage.getItem("token"));

  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  });

  //memoized value of the authentication context

  // const contextValue = useMemo(() => {
  //   token, setToken;
  // }, [token]);

  const contextValue = {
    token,
    setToken,
  };

  return <AuthContext.Provider value={contextValue}> {props.children} </AuthContext.Provider>;
}
