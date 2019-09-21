import React, { Component } from "react";
import "./styles/discussion.css";
import { Post } from "./Post";
import { sampleDescription } from "./data";
import { InputEditor } from "../../../utilities/elements/inputEditor/InputEditor";
import { Answer, QuestionData } from "../Answer";

export class Discussion{
  
    private questionData:QuestionData;
    constructor(questionData:QuestionData){
        this.questionData = questionData;
        console.log('in discussion: ');
        console.log(questionData.description);
    }
    public getDiscussion() {
        return (
            <div id="discussion_flow">
                <Post description={this.questionData.description} />
                <h1 style={{ marginBottom: '2px' }}>উত্তর {Answer.answerState.answerCount} টি</h1>
                <hr style={{ height: '0.05px', width: '100%', color: 'rgb(248, 247, 246)' }} />
                <div className="answers">
                    <Post description={sampleDescription} />
                </div>

                <h2>আপনার উত্তর</h2>
                <InputEditor id={this.questionData.id}/>

            </div>
        )
    }
}