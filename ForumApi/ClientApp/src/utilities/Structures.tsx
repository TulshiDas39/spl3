import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";

export interface IAuth0Contex {
    loginWithPopup(params?: {}):Promise<void>;
    handleRedirectCallback():Promise<void>;
    getIdTokenClaims(...p: any[]):Promise<IdToken>;
    loginWithRedirect(...p: any[]):Promise<void>;
    getTokenSilently(...p: any[]):Promise<any>;
    getTokenWithPopup(...p: any[]):Promise<string>;
    logout(...p: any[]):void;
    isAuthenticated: boolean;
    user: any;
    auth0Client?: Auth0Client;
    loading: boolean;
    popupOpen: boolean;
}   