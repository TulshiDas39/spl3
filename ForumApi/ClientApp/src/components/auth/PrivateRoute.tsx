import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { useAuth0 } from "../../utilities/Contexts";
//@ts-ignore
const PrivateRoute = ({ component: Component, path, ...rest }) => {
  console.log('in private route');
  const { isAuthenticated, loginWithRedirect } = useAuth0() as any;
  console.log('isAuthenticated:');
  console.log(isAuthenticated);
  console.log('loginwithredirect:')
  console.log(loginWithRedirect);
  useEffect(() => {
    console.log('Private route rendered');
    console.log('is authenticated:');
    console.log(isAuthenticated);
    const fn = async () => {
      if (!isAuthenticated) {
        await loginWithRedirect({
          appState: { targetUrl: path }
        });
      }
    };
    fn();
  });

  const render = (props:any) =>
    isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

// PrivateRoute.propTypes = {
//   component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
//     .isRequired,
//   path: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.arrayOf(PropTypes.string)
//   ]).isRequired
// };

export default PrivateRoute;