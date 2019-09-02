import React, { Component } from "react";
import "./question.css";


export class Question extends React.Component<any, any>{

    public render() {
        return (
            <div className="questions">
                <div className="question_status">
                    <a href="" className="votes statusItem">
                        <span className="vote_number">৫</span>
                        <span className="vote_text">ভোট</span>
                    </a>
                    <a href="" className="answered statusItem">
                        <span className="answer_number">৬</span>
                        <span className="answer_text">উত্তর</span>
                    </a>
                    <a href="" className="views statusItem">
                        <span className="view_number">৪০</span>
                        <span className="view_text">দেখা</span>
                    </a>
                </div>

                <div className="question_text">
                    <a className="question_title" href="">কোথায় প্রশ্ন করা যায়?</a>
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