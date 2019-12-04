import React, { Component } from "react";
import "./userContainer.scss";
import { User } from "./User";
import { IUserContainerProps } from "../Types";

export class UserContainer extends Component<IUserContainerProps, any>{

    public render() {
        return (
            <div id="userInfoContainer">
                {this.props.users.map(user=> <User data={user} key={user.id}/>)}
            </div>
        );
    }
}