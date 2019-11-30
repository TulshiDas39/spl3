import React, { Component } from "react";
import "./styles/user.css";
import { IUserProps } from "../Types";
import { utilityService } from "../../../services/UtilityService";
import { Link } from "react-router-dom";

interface state {
    isLoading: boolean;
}

export class User extends Component<IUserProps, state>{

    private getDurationString() {
        let text = "প্রশ্ন করেছেন";
        let minutes = utilityService.getDurationMinute(this.props.postTime);
        if (minutes === 0) return "এখন " + text;
        if (minutes < 60) return utilityService.convertToBengaliText(minutes) + " মিনিট পুর্বে " + text;
        let hours = Math.floor(minutes / 60);
        if (hours < 24) return utilityService.convertToBengaliText(hours) + " ঘন্টা পুর্বে " + text;
        let days = Math.floor(hours / 24);
        if (days < 30) return utilityService.convertToBengaliText(days) + " দিন পুর্বে " + text;
        let months = Math.floor(days / 30);
        if (months < 12) return utilityService.convertToBengaliText(months) + " মাস পুর্বে " + text;
        let years = months / 12;
        return utilityService.convertToBengaliText(years) + " বছর পুর্বে " + text;
    }

    public render() {
        return (
            <div id="user_of_question" className="user_of_discuss">
                <span className="questionTime">{this.getDurationString()}</span>
                <div>
                    <img src={this.props.user.image} alt="" />
                    <div>
                        <Link to={"/profile/"+this.props.user.id} className="userName" >{this.props.user.name}</Link>
                        <div className="rating_of_user_of_discuss">
                            <span className="fa fa-certificate"></span>
                            <span>{" " + this.props.user.reputation}</span>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}