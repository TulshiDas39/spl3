import React, { Component } from "react";
import "./styles/user.css";
import { UserProps } from "../Types";
import { IUser } from "../../../utils/Models";
import { answerService } from "../AnswerServices";
import { utilityService } from "../../../utils/Utility";

interface state {
    isLoading: boolean;
}

export class User extends Component<UserProps, state>{

    private user = {} as IUser;
    private postDuration = "";
    constructor(props: UserProps) {
        super(props);
        this.state = { isLoading: true };
    }

    componentDidMount() {
        answerService.getUser(this.props.userId).then(data => {
            this.user = data;
            this.postDuration = this.getDurationString();
            this.setState({ isLoading: false });
        })
    }

    private getDurationString() {
        let text = "প্রশ্ন করেছেন";
        let minutes = utilityService.getDurationMinute(this.props.postTime);
        if (minutes == 0) return "এখন " + text;
        if (minutes < 60) return minutes + " মিনিট পুর্বে " + text;
        let hours = Math.floor(minutes / 60);
        if (hours < 24) return hours + " ঘন্টা পুর্বে " + text;
        let days = Math.floor(hours / 24);
        if (days < 30) return days + " দিন পুর্বে " + text;
        let months = Math.floor(days / 30);
        if (months < 12) return months + " মাস পুর্বে " + text;
        let years = months / 12;
        return years + " বছর পুর্বে " + text;
    }

    public render() {
        if (this.state.isLoading) return <p></p>;
        return (
            <div id="user_of_question" className="user_of_discuss">
                <span className="questionTime">{this.getDurationString()}</span>
                <div>
                    <img src={this.user.image} alt="" />
                    <div>
                        <a className="userName" href="" >{this.user.name}</a>
                        <div className="rating_of_user_of_discuss">
                        <span className="fa fa-certificate"></span>
                            <span>{" "+this.user.reputation}</span>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}