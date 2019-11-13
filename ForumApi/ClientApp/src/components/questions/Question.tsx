import React, { Component } from "react";
import "./question.css";
import { Link } from "react-router-dom";
import { IQuestion, IUser } from "../../utils/Models";
import { Utility } from "../../utils/Utility";
import { QuestionProps } from "./Types";
import { getUser } from "./services";
import { Auth0Context } from "../../utils/Contexts";

interface state {
    isLoading: boolean;
}

export class Question extends Component<QuestionProps, state>{

    private tags: string[] = [];
    private user: IUser = {} as IUser;
    static contextType = Auth0Context;
    constructor(props: QuestionProps) {
        super(props);
        console.log(props.data);
        this.state = { isLoading: true }
    }

    componentDidMount() {
        this.init();
    }

    private init() {
        this.tags = this.props.data.tags.trim().split(/\s+/);
        console.log(this.tags);
        this.loadUserInfo();
    }


    private async loadUserInfo() {
        getUser(this.props.data.userId).then(data => {
            console.log('user info:');
            console.log(data);
            this.user = data;
            this.setState({ isLoading: false });
        }, err => {
            console.error(err);
        })
    }

    public render() {
        if (this.state.isLoading) return <p></p>;
        return (
            <div className="questions">
                <div className="question_status">
                    <Link to="/answer" className="votes statusItem">
                        <span className="vote_number">{Utility.convertToBengaliText(this.props.data.ratings)}</span>
                        <span className="vote_text">ভোট</span>
                    </Link>
                    <Link to="/answer" className="answered statusItem">
                        <span className="answer_number">{Utility.convertToBengaliText(this.props.data.ratings)}</span>
                        <span className="answer_text">উত্তর</span>
                    </Link>
                    <Link to="/answer" className="views statusItem">
                        <span className="view_number">{Utility.convertToBengaliText(this.props.data.views)}</span>
                        <span className="view_text">দেখা</span>
                    </Link>
                </div>

                <div className="question_text">
                    <Link to={"/answer/" + this.props.data.id} className="question_title">{this.props.data.title}</Link>
                    <div className="question_tags">
                        {this.tags.map((tag, index) => <a key={"tagKey" + index} className="tagItem" href="#">{tag}</a>)}

                    </div>
                    <div className="question_time">
                        <a className="question_time_tex" href="">{new Date(this.props.data.dateTime).toLocaleString()}</a>
                        <a className="question_time_user" href="">{this.user.name}</a>
                        <span className="question_time_user_rating">{this.user.reputation}</span>
                    </div>
                </div>
            </div>
        )
    }
}