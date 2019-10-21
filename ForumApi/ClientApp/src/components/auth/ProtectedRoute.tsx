import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../../utils/Contexts";
//@ts-ignore
const ProtectedRoute = ({ component: Component, path, ...rest }) => {
  console.log('in private route');
  const { isAuthenticated, loginWithRedirect } = useAuth0() as any;
  console.log('isAuthenticated:');
  console.log(isAuthenticated);
  console.log('loginwithredirect:')
  console.log(loginWithRedirect);

  const render = (props:any) => <Component {...props} />;

  return <Route path={path} render={render} {...rest} />;
};


export default ProtectedRoute;
