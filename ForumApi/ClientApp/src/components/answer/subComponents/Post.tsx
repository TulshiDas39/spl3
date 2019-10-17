import React, { Component } from "react";
import { User } from "./User";
import "./styles/post.css";
import { Comment } from "./Comment";
import { QuestionData } from "../Answer";
import { AnswerData } from "./Discusstion";

interface props{
    data:QuestionData | AnswerData
}

export class Post extends Component<props, any>{

    public render() {
        return (
            <div id="postDiv">
                <div id="question_vote" className="vote_system">
                    <span className="fa fa-sort-asc vote_icon"></span>
                    <span>{this.props.data.ratings}</span>
                    <span className="fa fa-sort-desc vote_icon"></span>
                </div>
                <div id="question_description">
                    <span className="question_description_text">{this.props.data.description}</span>
                    {/* <img className="questionImage" src="res/images/sample.PNG" alt="" /> */}
                    {/* <span> তাই আমি এর একটা সমাধান চাই, অগ্রীম ধন্যবাদ</span> */}

                    <User />

                    <Comment />
                </div>
            </div>
        )
    }
}