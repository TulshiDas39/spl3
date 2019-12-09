import { BehaviorSubject } from "rxjs";
import { SidebarDisplay } from "../../utils/Enums";

export const sideBarService = {
    sideBarDisplay: new BehaviorSubject(SidebarDisplay.NORMAL)
}