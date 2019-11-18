import React from "react";
import "./styles/head.css";
import { Link } from "react-router-dom";
import { IQuestion } from "../../../utils/Models";
export class Head{
    private questionData:IQuestion;
    constructor(questionData:IQuestion){
        this.questionData = questionData;
    }
    public getHead() {
        return (
            <div id="head_bar">
                <div id="title">
                    <h1 style={{ marginBottom: '2px' }}>{this.questionData.title}</h1>
                    <div id="title_info" style={{ fontSize: '13px' }}>
                        <span className="title_info_time" style={{ color: '#6a737c' }}>Time </span>
                        <span id="title_info_time" className="title_info_time" style={{ paddingRight: '8px' }}>{new Date(this.questionData.datetime).toDateString() }</span>
                        {/* <span className="title_info_view" style={{ color: '#6a737c' }}>দেখা</span>
                        <span id="title_info_view" className="title_info_view">৬</span> */}
                    </div>

                </div>
                <Link to="/ask" id="ask_btn">প্রশ্ন করুন</Link>
            </div>
        )
    }

}