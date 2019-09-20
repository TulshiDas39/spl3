import React, { Component } from "react";
import "./answer.css";
import { Leftbar } from "../../utilities/elements/leftbar/Leftbar";
import { Discussion } from "./subComponents/Discusstion";
import { StatusBar } from "../../utilities/elements/statusBar/StatusBar";
import { Head } from "./subComponents/Head";

export interface AnswerState{
    questionId:string;
    answerCount:string;
    isloading:boolean;
}

export interface QuestionData{
    id:string;
    userId:string;
    description:string;
    title:string;
    tags:string;
    ratings:number;
    dateTime:string;
}

export class Answer extends Component<any, AnswerState>{
    public static answerState:AnswerState;
    public static setAnswerState:any;
    private questionData:QuestionData= {} as QuestionData;
    constructor(props:any){
        super(props);
        this.init();
        Answer.setAnswerState = this.setState;
        Answer.answerState = this.state;
        this.fetchData();
        //console.log('handle:'+handle);
    }

    private fetchData(){
        fetch('api/questions/'+this.state.questionId).then((res:Response)=>{
            //console.log(res.json());
            return res.json();
        }).then(data=>{
            console.log(data);
            this.questionData = data;
            console.log('in Answer:');
            console.log(this.questionData.description);
            this.setState({isloading:false})
            
        }).catch(err=>{
            console.log('error fetching question data');
            console.log(err);
        })
    }

    private init(){
        const { handle } = this.props.match.params;
        this.state = {questionId:handle,answerCount:"২", isloading:true}
    }

    public render() {
        if(this.state.isloading) return(<p>loading...</p>);
        return (
            <div id="parentDiv">
                <Leftbar />
                <div id="mainDiv">
                    {new Head(this.questionData).getHead()}
                    <div id="middle_Div">
                        {new Discussion(this.questionData).getDiscussion()}
                        <StatusBar/>
                    </div>
                </div>
            </div>
        )
    }
}