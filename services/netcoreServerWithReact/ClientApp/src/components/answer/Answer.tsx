import React, { Component } from "react";
import "./answer.css";
import { Leftbar } from "../elements/leftbar/Leftbar";
import { Discussion } from "./subComponents/Discusstion";
import { StatusBar } from "../elements/statusBar/StatusBar";
import { Head } from "./subComponents/Head";

export class Answer extends Component<any, any>{
    public render() {
        return (
            <div id="parentDiv">
                <Leftbar />
                <div id="mainDiv">
                    <Head />
                    <div id="middle_Div">
                        <Discussion />
                        <StatusBar />
                    </div>
                </div>
            </div>
        )
    }
}