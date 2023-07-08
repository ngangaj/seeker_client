import JwtDecode from "jwt-decode";
import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  const logIn = (authToken) => {
    const user = JwtDecode(authToken);
    setUser(user);
    authStorage.storeToken(authToken);
  };

  return { user, logOut, logIn };
};
