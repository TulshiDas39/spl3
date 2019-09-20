import React, { Component } from "react";
import "./user.css";

export class User extends Component<any, any>{

    public render() {
        return (
            <div className="user">
                <div className="user-img">
                    <img src="res/images/meanduddipda.jpg" alt="" />
                </div>
                <div className="user-info">
                    <span className="user-info-name">Charlie chapline</span>
                    <span className="user-info-place">New york, united states</span>
                    <span className="user-info-rating">2,1200</span>
                    <span className="user-info-tags">mysql, c++, javascript</span>
                </div>
            </div>
        );
    }
}