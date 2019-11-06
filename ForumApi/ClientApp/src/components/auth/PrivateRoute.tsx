import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../../utils/Contexts";
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
  },[isAuthenticated,path,loginWithRedirect]);

  const render = (props:any) =>
    isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
