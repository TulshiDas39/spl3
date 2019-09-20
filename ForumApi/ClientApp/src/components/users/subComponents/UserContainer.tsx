import React, { Component } from "react";
import "./userContainer.css";
import { User } from "./User";

export class UserContainer extends Component<any, any>{

    public render() {
        return (
            <div id="userInfoContainer">
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
            </div>
        );
    }
}