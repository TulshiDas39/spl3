import React, { useState, useEffect, useContext, Component } from "react";
//@ts-ignore
import createAuth0Client from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";
import { async } from "q";

export const Auth0Context = React.createContext({});

interface state {
  isAuthenticated: boolean;
  user: any;
  auth0Client?: Auth0Client;
  loading: boolean;
  popupOpen: boolean;
}

interface props {
  onRedirectCallback(appState?: any): void;
  children: any;
  domain: string;
  client_id: string;
  redirect_uri: string;

}

export class Auth0Provider extends Component<props, state>{
  private children: any;
  private onRedirectCallback: (appState?: any) => void;
  private initOptions: {
    domain: string;
    client_id: string
    redirect_uri: string
  };

  constructor({ children, onRedirectCallback, ...initOptions }: props) {
    super({ children, onRedirectCallback, ...initOptions });
    this.children = children;
    this.onRedirectCallback = onRedirectCallback;
    this.initOptions = initOptions;
    this.state = {
      isAuthenticated: false,
      user: {},
      loading: true,
      popupOpen: false,
    };
  }

  componentDidUpdate() {
    //@ts-ignore
    this.updateComponent();
  }

  async updateComponent() {
    const auth0FromHook = await createAuth0Client(this.initOptions);
    //setAuth0(auth0FromHook);
    this.setState({
      auth0Client: auth0FromHook
    });

    if (window.location.search.includes("code=")) {
      const { appState } = await auth0FromHook.handleRedirectCallback();
      //@ts-ignore
      this.onRedirectCallback(appState);
    }

    const isAuthenticated = await auth0FromHook.isAuthenticated();

    //setIsAuthenticated(isAuthenticated);
    this.setState({
      isAuthenticated: isAuthenticated
    })

    if (this.state.isAuthenticated) {
      const user = await auth0FromHook.getUser();
      //setUser(user);
      this.setState({
        user: user
      });
    }

    //setLoading(false);
    this.setState({
      loading: false
    })
  }

  private loginWithPopup = async (params = {}) => {
    //setPopupOpen(true);
    this.setState({
      popupOpen: true
    })
    try {
      if (this.state.auth0Client)
        await this.state.auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      //setPopupOpen(false);
      this.setState({
        popupOpen: false
      })
    }
    if (this.state.auth0Client) {
      const user = await this.state.auth0Client.getUser();
      //setUser(user);
      this.setState({
        user: user
      })
      //setIsAuthenticated(true);
      this.setState({
        isAuthenticated: true
      })
    }

  };

  private handleRedirectCallback = async () => {
    //setLoading(true);
    this.setState({
      loading: true
    });

    if (this.state.auth0Client) {
      await this.state.auth0Client.handleRedirectCallback();
      const user = await this.state.auth0Client.getUser();
      //setLoading(false);
      this.setState({
        loading:false
      })
      //setIsAuthenticated(true);
      this.setState({
        isAuthenticated:true
      })
      //setUser(user);
      this.setState({
        user:user
      })
    }
  };

  public render() {

    let { isAuthenticated, auth0Client, loading, popupOpen, user } = this.state;
    let loginWithPopup = () => {
      this.loginWithPopup();
    }
    let handleRedirectCallback = () => {
      this.handleRedirectCallback();
    }
    let contextValues = {
      isAuthenticated,
      user,
      loading,
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
    }
    return (
      <Auth0Context.Provider
        value={contextValues}
      >
        {this.children}
      </Auth0Context.Provider>

    )
  }
}
