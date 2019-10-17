import React from 'react';
import config from "./components/auth/auth_config.json";
import { createBrowserHistory } from "history";
import { Auth0Provider } from './components/auth/react-auth0-spa';
import App from './App';


interface props {
    basename: string;
}

export default class StartUp extends React.Component<props, any> {

    private getAuth0Credentials() {
        let history = createBrowserHistory();
        let onRedirectCallback = (appState?: any) => {
            history.push(
                appState && appState.targetUrl
                    ? appState.targetUrl
                    : window.location.pathname
            );
        };

        return {
            domain: config.domain,
            client_id: config.clientId,
            redirect_uri: window.location.origin,
            onRedirectCallback: onRedirectCallback
        }
    }

    render() {
        return (
            <Auth0Provider {...this.getAuth0Credentials()}>
                <App basename={this.props.basename} />
            </Auth0Provider>
        );
    }
}
