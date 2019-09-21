import React, { Component } from "react";
import "./styles/discussion.css";
import { Post } from "./Post";
import { sampleDescription } from "./data";
import { InputEditor } from "../../../utilities/elements/inputEditor/InputEditor";
import { Answer, QuestionData } from "../Answer";

interface AnswerData{
    id:string;
    userId:string;
    questionId:string;
    description:string;
    ratings:number;
    dateTime:string;
}

interface Properties{
    questionData:QuestionData;
}
interface state{
    isLoading:boolean;
}
export class Discussion extends Component<Properties,state>{
  
    //private questionData:QuestionData;
    private answerData = [] as AnswerData[];
    constructor(props:Properties){
        super(props);
        this.init();
        console.log('in discussion: ');
        console.log(this.props.questionData);
        this.fetchAnswerData();
    }

    private init(){
        this.state = {isLoading:true}
    }

    private fetchAnswerData(){
        fetch('api/answers/get/'+this.props.questionData.id,{
            method: 'POST',
        }).then((res:Response)=>{
            return res.json();
        }).then(data=>{
            console.log(data);
            this.answerData = data;
            console.log('Answer of questions:');
            console.log(this.answerData);
            this.setState({isLoading:false});
            
        }).catch(err=>{
            console.log('error fetching question data');
            console.log(err);
        })
    }

    public render() {
        if(this.state.isLoading) return <p>Loading...</p>;
        return (
            <div id="discussion_flow">
                <Post description={this.props.questionData.description} />
                <h1 style={{ marginBottom: '2px' }}>উত্তর {this.answerData.length} টি</h1>
                <hr style={{ height: '0.05px', width: '100%', color: 'rgb(248, 247, 246)' }} />
                <div className="answers">
                    <Post description={sampleDescription} />
                </div>

                <h2>আপনার উত্তর</h2>
                <InputEditor id={this.props.questionData.id}/>

            </div>
        )
    }
}