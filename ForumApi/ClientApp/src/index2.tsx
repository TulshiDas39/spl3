import React from 'react';
import { Auth0Provider } from "./components/auth/react-auth0-spa";
import config from "./components/auth/auth_config.json";
import { createBrowserHistory } from "history";
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const rootElement = document.getElementById('root');


let history = createBrowserHistory();
const onRedirectCallback = (appState?:any) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

// ReactDOM.render(
//   <App basename={baseUrl} />,
//   rootElement);

ReactDOM.render(
  
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <App basename={baseUrl}/>
  </Auth0Provider>,
  rootElement
);


registerServiceWorker();