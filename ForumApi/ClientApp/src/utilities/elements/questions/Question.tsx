import React, { Component } from "react";
import "./question.css";
import { Link } from "react-router-dom";
import { TQuestion } from "../../Models";
import { Utility } from "../../Utility";

interface props {
    data: TQuestion;
}

export class Question extends Component<props, any>{

    private tags: string[] = [];
    private utility = new Utility();
    constructor(props: props) {
        super(props);
        console.log(props.data);
        this.init();
    }

    private init() {
        this.tags = this.props.data.tags.trim().split(/\s+/);
        console.log(this.tags);
    }

    public render() {
        return (
            <div className="questions">
                <div className="question_status">
                    <Link to="/answer" className="votes statusItem">
                        <span className="vote_number">{Utility.convertToBengaliText(this.props.data.ratings)}</span>
                        <span className="vote_text">ভোট</span>
                    </Link>
                    <Link to="/answer" className="answered statusItem">
                        <span className="answer_number">৬</span>
                        <span className="answer_text">উত্তর</span>
                    </Link>
                    <Link to="/answer" className="views statusItem">
                        <span className="view_number">{Utility.convertToBengaliText(this.props.data.views)}</span>
                        <span className="view_text">দেখা</span>
                    </Link>
                </div>

                <div className="question_text">
                    <Link to="/answer" className="question_title">{this.props.data.title}</Link>
                    <div className="question_tags">
                        {this.tags.map((tag,index) => <a key={"tagKey"+index} className="tagItem" href="#">{tag}</a>)}
                    
                    </div>
                    <div className="question_time">
                        <a className="question_time_tex" href="">তিন ঘন্টা আগে প্রশ্ন করেছেন</a>
                        <a className="question_time_user" href="">তুলশী দাস</a>
                        <span className="question_time_user_rating">১০৩৯</span>
                    </div>
                </div>
            </div>
        )
    }
}