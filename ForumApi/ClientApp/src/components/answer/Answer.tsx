import React, { Component } from "react";
import "./answer.css";
import { Leftbar } from "../leftbar/Leftbar";
import { Discussion } from "./subComponents/Discusstion";
import { StatusBar } from "../statusBar/StatusBar";
import { Head } from "./subComponents/Head";
import { getQuestion } from "./Services";
import { IQuestion } from "../../utils/Models";
import { AnswerProps } from "./Types";

export interface AnswerState {
    questionId: string;
    answerCount: string;
    isloading: boolean;
}

export class Answer extends Component<AnswerProps, AnswerState>{
    public static answerState: AnswerState;
    public static setAnswerState: any;
    private questionData: IQuestion = {} as IQuestion;
    constructor(props: any) {
        super(props);
        this.init();
        // Answer.setAnswerState = this.setState;
        // Answer.answerState = this.state;
        this.fetchData();
    }

    private fetchData() {

        getQuestion(this.state.questionId).then(data=>{
            this.questionData = data as IQuestion;
            this.setState({ isloading: false });
        })

    }

    private init() {
        const { handle } = this.props.match.params;
        this.state = { questionId: handle, answerCount: "২", isloading: true }
    }

    private onDeleteQuestion(){
        this.props.history.push('/');
    }

    public render() {
        console.log('rendering answer');
        if (this.state.isloading) return (<p>loading...</p>);

        return (
            <div id="parentDiv">
                <Leftbar />
                <div id="mainDiv">
                    {new Head(this.questionData).getHead()}
                    <div id="middle_Div">
                        <Discussion onDeleteQuestion={this.onDeleteQuestion.bind(this)} questionData={this.questionData} />
                        <StatusBar />
                    </div>
                </div>
            </div>
        )
    }
}