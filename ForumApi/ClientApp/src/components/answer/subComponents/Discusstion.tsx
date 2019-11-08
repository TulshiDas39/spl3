import React, { Component } from "react";
import "./styles/discussion.css";
import { Post } from "./Post";
import { InputEditor } from "../../inputEditor/InputEditor";
import { IQuestion, IAnswer } from "../../../utils/Models";
import { getAnswers } from "../Services";
import { IAuth0Context } from "../../../utils/Structures";
import { Auth0Context } from "../../../utils/Contexts";
import { Loader } from "../../loader/loader";
//import {Auth0Context} from "../../../utils/Contexts";

interface Properties {
    questionData: IQuestion;
}
interface state {
    isLoading: boolean;
}
export class Discussion extends Component<Properties, state>{

    //private questionData:QuestionData;
    private answerData = [] as IAnswer[];
    static contextType = Auth0Context;
    private displayEditor:boolean = false;
    private editorInnerHtml = "";
    

    constructor(props: Properties) {
        super(props);
        this.init();
        console.log('in discussion: ');
        this.state = {isLoading:true};
        console.log(this.props.questionData);
        // this.fetchPostedAnswers();
    }


    fetchPostedAnswers() {
        getAnswers(this.props.questionData.id).then(data => {
            this.answerData = data as IAnswer[];
            this.updateComponent();
        })
    }

    private updateComponent() {
        this.setState(this.state);
    }

    private init() {
        this.state = { isLoading: true }
        
        getAnswers(this.props.questionData.id).then(data => {
            this.answerData = data as IAnswer[];
            this.setDisplayEditor();
        })

       
    }

    private setDisplayEditor(){
        let context = this.context as IAuth0Context;

        if (this.context.isAuthenticated) {
            if (!this.answered(context)) {
                this.displayEditor = true;
            }
            else this.displayEditor = false;
        }

        else this.displayEditor = true;

        this.setState({ isLoading: false });
    }

    private fetchAnswerData() {
        getAnswers(this.props.questionData.id).then(data => {
            this.answerData = data as IAnswer[];
        })
    }

    public render() {
        if (this.state.isLoading) return <Loader />;
        return (
            <div id="discussion_flow">
                <Post data={this.props.questionData} onEdit={()=> this.editQuestion()} onDelete={()=> this.deleteQuestion()} />
                <h1 style={{ marginBottom: '2px' }}>উত্তর {this.answerData.length} টি</h1>
                <hr style={{ height: '0.05px', width: '100%', color: 'rgb(248, 247, 246)' }} />
                <div className="answers">
                    {
                        this.answerData.map((item, index) => <Post key={index} data={item} onEdit={()=> this.editAnswer(index)} onDelete={()=> this.deleteAnswer(index)} />)
                    }
                </div>

                {this.getEditor()}

            </div>
        )
    }

    private editQuestion(){

    }

    private deleteQuestion(){

    }

    private editAnswer(index:number){
        console.log("editing answer:"+index);
        this.editorInnerHtml = this.answerData[index].description;
        this.displayEditor = true;
        this.updateComponent();
    }

    private deleteAnswer(index:number){

    }

    private getEditor() {
        if(this.displayEditor) return this.answerEditor();
    }

    private answerEditor() {
        return [<h2 key="answerEditorHeading">আপনার উত্তর</h2>,
        <InputEditor key="answerEditorTextArea" id={this.props.questionData.id} onPost={this.fetchPostedAnswers.bind(this)} innterHtml={this.editorInnerHtml}/>]
    }

    private answered(context: IAuth0Context): boolean {
        console.log("user id:"+context.user.sub);
        for(let i = 0;i<this.answerData.length;i++){
            if(this.answerData[i].userId == context.user.sub) return true;
        }

        return false;
    }
}