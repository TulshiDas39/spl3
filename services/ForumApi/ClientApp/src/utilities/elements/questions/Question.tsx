import React, { Component } from "react";
import "./question.css";
import { Link } from "react-router-dom";


export class Question extends React.Component<any, any>{

    public render() {
        return (
            <div className="questions">
                <div className="question_status">
                    <Link to="/answer" className="votes statusItem">
                        <span className="vote_number">৫</span>
                        <span className="vote_text">ভোট</span>
                    </Link>
                    <Link to="/answer" className="answered statusItem">
                        <span className="answer_number">৬</span>
                        <span className="answer_text">উত্তর</span>
                    </Link>
                    <Link to="/answer" className="views statusItem">
                        <span className="view_number">৪০</span>
                        <span className="view_text">দেখা</span>
                    </Link>
                </div>

                <div className="question_text">
                    <Link to="/answer" className="question_title" href="">কোথায় প্রশ্ন করা যায়?</Link>
                    <div className="question_tags">
                        <a className="tagItem" href="">javascript</a>
                        <a className="tagItem" href="">jquery</a>
                        <a className="tagItem" href="">typescript</a>
                        <a className="tagItem" href="">electron</a>
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