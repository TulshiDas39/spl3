import React, { Component } from "react";
import { Leftbar } from "../elements/leftbar/Leftbar";
import { Profile } from "./subComponents/Profile";
import "./activity.css";

export class Activity extends Component<any, any>{
    public render() {
        return (
            <div className="mainContainer">
                <Leftbar />
                <div className="right">
                    <div className="head-bar">
                        <span className="user-profile">প্রোফাইল</span>
                        <span className="user-activity">সক্রিয়তা</span>
                        <span className="user-story">ব্যবহারকারী বিবরণ</span>
                    </div>

                    <Profile />
                </div>

            </div>
        )
    }
}