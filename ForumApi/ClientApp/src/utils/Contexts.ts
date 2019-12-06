import React, { useContext } from "react";
import { IAuth0Context } from "./Structures";
import { BehaviorSubject } from 'rxjs';
import { SideBar } from "./Enums";
export const Auth0Context = React.createContext<IAuth0Context>({} as IAuth0Context);
export const useAuth0 = () => useContext(Auth0Context);
 
export const sideBarSubject = new BehaviorSubject(SideBar.MAIN_PAGE);


