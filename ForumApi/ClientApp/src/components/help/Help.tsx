import React from "react";
import styles from "./help.module.scss";
import { Button } from "@material-ui/core";
import {SideBarMode, SidebarDisplay } from "../../utils/Enums";
import { navService } from "../nav/NavService";
import { sideBarService } from "../leftbar/LeftBarService";
export class Help extends React.Component<any, any>{

    constructor(props:any){
        super(props);
        navService.sideBarModeSubject.next(SideBarMode.POPUP);
        sideBarService.sideBarDisplay.next(SidebarDisplay.NONE);
    }
    componentWillUnmount(){
        navService.sideBarModeSubject.next(SideBarMode.NORMAL);
    }
    render() {
        return (
            <div className={styles.container}>
                <h2 className={styles.heading}>How can we help you today?</h2>
                <p>Contact: bsse0811@iit.du.ac.bd</p>
                <Button className={styles.sendMailBtn} variant="outlined" color="primary" href="mailto:bsse0811@iit.du.ac.bd?Subject=Help">
                    Send Your Query
                </Button>
            </div>
        )
    }
}