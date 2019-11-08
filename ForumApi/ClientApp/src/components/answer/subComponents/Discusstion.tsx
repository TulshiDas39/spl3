import React, { Component } from "react";
import "./styles/discussion.css";
import { Post } from "./Post";
import { InputEditor } from "../../inputEditor/InputEditor";
import { IAnswer } from "../../../utils/Models";
import { getAnswers, postAnswer, updateAnswer, deleteAnswer } from "../Services";
import { IAuth0Context } from "../../../utils/Structures";
import { Auth0Context } from "../../../utils/Contexts";
import { Loader } from "../../loader/loader";
import { discussionProps, ActionType } from "../Types";
import { editorProps } from "../../inputEditor/Types";

interface state {
    isLoading: boolean;
}

export class Discussion extends Component<discussionProps, state>{

    private answerData = [] as IAnswer[];
    static contextType = Auth0Context;
    private displayEditor = false;
    private editorInnerHtml = "";
    private actionStatus = ActionType.None;
    private userAnswerIndex = -1;

    constructor(props: discussionProps) {
        super(props);
        console.log('in discussion: ');
        this.state = { isLoading: true };
        console.log(this.props.questionData);
    }

    componentDidMount() {
        this.init();
    }

    componentWillUpdate() {
        this.setUserAnswerIndex();
        this.setDisplayEditor();
    }

    fetchPostedAnswers() {
        getAnswers(this.props.questionData.id).then(data => {
            this.answerData = data as IAnswer[];
            this.setUserAnswerIndex();
            this.updateComponent();
        })
    }


    private async answerPost(text: string) {
        let data: IAnswer;
        data = {
            questionId: this.props.questionData.id,
            description: text,
            ratings: 0,
            datetime: new Date().getTime(),
            userId: this.context.user.sub
        };

        let token = await this.context.getTokenSilently();
        console.log("token:");
        console.log(token);
        postAnswer(data, token).then(data => {
            this.fetchPostedAnswers();
        }, err => {
            console.log(err);
        });

    }

    private updateAnswer(text: string) {
        let answer = this.answerData[this.userAnswerIndex];
        answer.description = text;
        let token = this.context.getTokenSilently();

        updateAnswer(answer, token).then(data => {
            this.actionStatus = ActionType.None;
            this.fetchPostedAnswers();
        }, err => {
            console.log(err);
        });
    }

    private editAnswer() {
        this.editorInnerHtml = this.answerData[this.userAnswerIndex].description;
        this.displayEditor = true;
        this.actionStatus = ActionType.Edit;
        this.updateComponent();
    }

    private async deleteAnswer() {
        let token = await this.context.getTokenSilently();
        let id = this.answerData[this.userAnswerIndex].id as string;
        deleteAnswer(id ,token).then(()=>{
            this.fetchPostedAnswers();
        }, err=>{
            console.error(err);
        });
    }

    private updateComponent() {
        this.setState(this.state);
    }

    private init() {
        this.state = { isLoading: true }

        getAnswers(this.props.questionData.id).then(data => {
            this.answerData = data as IAnswer[];
            this.setState({ isLoading: false });
        })

    }

    private setUserAnswerIndex() {
        let context = this.context as IAuth0Context;
        if (!context.isAuthenticated) {
            return;
        }

        for (let i = 0; i < this.answerData.length; i++) {
            if (this.answerData[i].userId == context.user.sub) {
                this.userAnswerIndex = i;
                break;
            }
        }

    }

    private setDisplayEditor() {

        if (this.userAnswerIndex == -1) {
            this.displayEditor = true;
        }

        else if (this.actionStatus == ActionType.Edit) this.displayEditor = true;

        else this.displayEditor = false;

    }

    private editQuestion() {

    }

    private deleteQuestion() {

    }

    private getEditor() {
        if (this.displayEditor) return this.editor();
    }

    private editor() {
        let props: editorProps;
        props = {
            innterHtml: this.editorInnerHtml,
            onPost: this.actionStatus == ActionType.Edit ? this.updateAnswer.bind(this) : this.answerPost.bind(this),
            actionType: this.actionStatus
        }

        return <InputEditor {...props} />;
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
                        this.answerData.map((item, index) => <Post key={index} data={item} onEdit={this.editAnswer.bind(this)} onDelete={this.deleteAnswer.bind(this)} />)
                    }
                </div>

                {this.getEditor()}

            </div>
        )
    }

}