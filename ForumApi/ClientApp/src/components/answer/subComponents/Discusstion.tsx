import React, { Component } from "react";
import "./styles/discussion.css";
import { Post } from "./Post";
import { InputEditor } from "../../inputEditor/InputEditor";
import { IQuestion, IAnswer } from "../../../utils/Models";
import { getAnswers, postAnswer } from "../Services";
import { IAuth0Context } from "../../../utils/Structures";
import { Auth0Context } from "../../../utils/Contexts";
import { Loader } from "../../loader/loader";
import { discussionProps, ActionType } from "../Types";
import { editorProps } from "../../inputEditor/Types";
//import {Auth0Context} from "../../../utils/Contexts";

interface state {
    isLoading: boolean;
}

export class Discussion extends Component<discussionProps, state>{

    private answerData = [] as IAnswer[];
    static contextType = Auth0Context;
    private displayEditor: boolean = false;
    private editorInnerHtml = "";
    private actionStatus = ActionType.None;;


    constructor(props: discussionProps) {
        super(props);
        this.init();
        console.log('in discussion: ');
        this.state = { isLoading: true };
        console.log(this.props.questionData);
        // this.fetchPostedAnswers();
    }


    fetchPostedAnswers() {
        getAnswers(this.props.questionData.id).then(data => {
            this.answerData = data as IAnswer[];
            this.updateComponent();
        })
    }

    post(text: string) {
        let data: IAnswer;
        data = {
            questionId: this.props.questionData.id,
            description: text,
            ratings: 0,
            datetime: new Date().getTime(),
            userId: this.context.user.sub
        };

        let token = this.context.getTokenSilently();
        postAnswer(data, token).then(data => {
            this.fetchPostedAnswers();
        }, err => {
            console.log(err);
        });

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

    private setDisplayEditor() {
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
                <Post data={this.props.questionData} onEdit={() => this.editQuestion()} onDelete={() => this.deleteQuestion()} />
                <h1 style={{ marginBottom: '2px' }}>উত্তর {this.answerData.length} টি</h1>
                <hr style={{ height: '0.05px', width: '100%', color: 'rgb(248, 247, 246)' }} />
                <div className="answers">
                    {
                        this.answerData.map((item, index) => <Post key={index} data={item} onEdit={() => this.editAnswer(index)} onDelete={() => this.deleteAnswer(index)} />)
                    }
                </div>

                {this.getEditor()}

            </div>
        )
    }

    private editQuestion() {

    }

    private deleteQuestion() {

    }

    private editAnswer(index: number) {
        console.log("editing answer:" + index);
        this.editorInnerHtml = this.answerData[index].description;
        this.displayEditor = true;
        this.actionStatus = ActionType.Edit;
        this.updateComponent();
    }

    private deleteAnswer(index: number) {

    }

    private getEditor() {
        if (this.displayEditor) return this.editor();
    }

    private editor() {
        let props:editorProps;
        props={
            questionId:this.props.questionData.id,
            innterHtml:this.editorInnerHtml,
            onPost:this.fetchPostedAnswers.bind(this),
            actionType:this.actionStatus
        }

        return  <InputEditor {...props} />;
    }

    private answered(context: IAuth0Context): boolean {
        console.log("user id:" + context.user.sub);
        for (let i = 0; i < this.answerData.length; i++) {
            if (this.answerData[i].userId == context.user.sub) return true;
        }

        return false;
    }
}