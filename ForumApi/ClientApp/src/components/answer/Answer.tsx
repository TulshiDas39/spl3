import React, { Component } from "react";
import "./answer.css";
import { Leftbar } from "../leftbar/Leftbar";
import { Discussion } from "./subComponents/Discusstion";
import { StatusBar } from "../statusBar/StatusBar";
import { Head } from "./subComponents/Head";
import { answerService } from "./AnswerServices";
import { IQuestion } from "../../utils/Models";
import { AnswerProps } from "./Types";
import { rootService } from "../../services/RootService";

export interface AnswerState {
    isloading: boolean;
}
export class Answer extends Component<AnswerProps, AnswerState>{
    public static answerState: AnswerState;
    public static setAnswerState: any;
    private questionData: IQuestion = {} as IQuestion;
    constructor(props: AnswerProps) {
        super(props);
        this.state = {isloading: true };
    }

    componentDidMount(){
        this.fetchData();
    }

    private fetchData() {
        const { handle } = this.props.match.params;
        console.log('fetching question data');
        rootService.getQuestion(handle).then(data=>{
            this.questionData = data as IQuestion;
            console.log('counting views');
            answerService.countView(handle);
            this.setState({ isloading: false });
        });

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