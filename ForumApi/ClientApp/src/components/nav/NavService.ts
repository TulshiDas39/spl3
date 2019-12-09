import { BehaviorSubject } from "rxjs";
import { SideBarMode } from "../../utils/Enums";

export const navService={
    sideBarModeSubject: new BehaviorSubject(SideBarMode.NORMAL)

}