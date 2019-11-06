import React, { useContext } from "react";
import { IAuth0Context } from "./Structures";
export const Auth0Context = React.createContext<IAuth0Context>({} as IAuth0Context);
export const useAuth0 = () => useContext(Auth0Context);
