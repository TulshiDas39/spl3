import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";
//@ts-ignore
const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0() as any;

  useEffect(() => {
    const fn = async () => {
      if (!isAuthenticated) {
        await loginWithRedirect({
          appState: { targetUrl: path }
        });
      }
    };
    fn();
  }, [isAuthenticated, loginWithRedirect, path]);

  const render = (props:any) =>
    isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired
};

export default PrivateRoute;
