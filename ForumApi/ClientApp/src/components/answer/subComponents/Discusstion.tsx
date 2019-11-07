import React, { Component } from "react";
import "./styles/discussion.css";
import { Post } from "./Post";
import { InputEditor } from "../../inputEditor/InputEditor";
import { IQuestion, IAnswer } from "../../../utils/Models";
import { getAnswers } from "../Services";


interface Properties{
    questionData:IQuestion;
}
interface state{
    isLoading:boolean;
}
export class Discussion extends Component<Properties,state>{
  
    //private questionData:QuestionData;
    private answerData = [] as IAnswer[];

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
        getAnswers(this.props.questionData.id).then(data=>{
            this.answerData = data as IAnswer[];
            this.setState({isLoading:false});
        })
    }

    public render() {
        if(this.state.isLoading) return <p>Loading...</p>;
        return (
            <div id="discussion_flow">
                <Post data={this.props.questionData} />
                <h1 style={{ marginBottom: '2px' }}>উত্তর {this.answerData.length} টি</h1>
                <hr style={{ height: '0.05px', width: '100%', color: 'rgb(248, 247, 246)' }} />
                <div className="answers">
                    {
                        this.answerData.map((item,index) => <Post key={index} data={item} />)
                    }
                </div>

                <h2>আপনার উত্তর</h2>
                <InputEditor id={this.props.questionData.id}/>

            </div>
        )
    }
}