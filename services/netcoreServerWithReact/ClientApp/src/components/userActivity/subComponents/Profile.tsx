import React, { Component } from "react";
import { UserInfo } from "./UserInfo";
import { TopTags } from "./TopTags";
import { Badges } from "./Badges";

export class Profile extends Component<any, any>{
    public render() {
        return (
            <div>
                <UserInfo />
                <TopTags />
                <Badges />
            </div>
        )
    }
}