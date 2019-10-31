import React, { useState, useEffect } from "react";
//@ts-ignore
import createAuth0Client from "@auth0/auth0-spa-js";
import { Auth0Context } from "../../utils/Contexts";


const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);
//@ts-ignore
// export const Auth0Context = React.createContext();
// export const useAuth0 = () => useContext(Auth0Context);

export const Auth0Provider = ({
  //@ts-ignore
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  console.log('in Auth0Provider');
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  let accessToken = "";
  console.log('isAuthenticated:');
  console.log(isAuthenticated);
  console.log('user:');
  console.log(user);
  useEffect(() => {
    console.log('Auth0Provider rendered');
    const initAuth0 = async () => {
      //@ts-ignore
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes("code=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        //@ts-ignore
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        createUserIfNotExist(user);
        accessToken = await auth0FromHook.getTokenSilently();
        setUser(user);

      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const createUserIfNotExist = (user: any) => {
    fetch('api/users/create', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
       // 'Authorization': 'Bearer ' + token
      }
    }).then((res: Response) => {
      console.log(res);
      return res.json();
    }).then(data => {
      console.log('create user response');
      console.log(data);
     // this.props.history.push('/answer/' + data.id);
    }).catch(err => {
      console.log('error happened in create user');
      console.log(err);
    });
  }

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        accessToken,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        //@ts-ignore
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        //@ts-ignore
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        //@ts-ignore
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        //@ts-ignore
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        //@ts-ignore
        logout: (...p) => auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
