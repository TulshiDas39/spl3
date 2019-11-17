import React, { Component } from "react";
import "./styles/discussion.css";
import { Post } from "../../post/Post";
import { InputEditor } from "../../inputEditor/InputEditor";
import { IAnswer } from "../../../utils/Models";
import { answerService } from "../AnswerServices";
import { IAuth0Context } from "../../../utils/Structures";
import { Auth0Context } from "../../../utils/Contexts";
import { Loader } from "../../loader/loader";
import { discussionProps } from "../Types";
import { editorProps } from "../../inputEditor/Types";
import { utilityService } from "../../../utils/Utility";

interface state {
    isLoading: boolean;
}

export class Discussion extends Component<discussionProps, state>{

    private answerData = [] as IAnswer[];
    static contextType = Auth0Context;
    private displayEditor = false;
    private editorInnerHtml = "";
    private userAnswerIndex = -1;
    private post: (text: string) => Promise<void>;

    constructor(props: discussionProps) {
        super(props);
        console.log('in discussion: ');
        this.state = { isLoading: true };
        console.log(this.props.questionData);
        this.post = this.answerPost.bind(this);
    }

    componentDidMount() {
        this.init();
    }

    componentWillUpdate() {
        this.setUserAnswerIndex();
    }

    private init() {

        answerService.getAnswers(this.props.questionData.id).then(data => {
            this.answerData = data as IAnswer[];
            this.setUserAnswerIndex();
            this.setDisplayEditor();
            this.setState({ isLoading: false });
        })

    }

    fetchPostedAnswers() {
        answerService.getAnswers(this.props.questionData.id).then(data => {
            this.answerData = data as IAnswer[];
            this.setUserAnswerIndex();
            this.updateComponent();
        })
    }


    private async answerPost(text: string) {
        let data: IAnswer;
        data = {
            id:undefined as any,
            questionId: this.props.questionData.id,
            description: text,
            ratings: 0,
            datetime: new Date().getTime(),
            userId: this.context.user.sub
        };

        let token = await this.context.getTokenSilently();

        answerService.postAnswer(data, token).then(data => {
            this.displayEditor = false;
            this.editorInnerHtml = "";
            this.fetchPostedAnswers();
        }, err => {
            console.error(err);
        });

    }

    private async updateAnswer(text: string) {
        let answer = this.answerData[this.userAnswerIndex];
        answer.description = text;
        let token = await this.context.getTokenSilently();

        answerService.updateAnswer(answer, token).then(() => {
            this.displayEditor = false;
            this.editorInnerHtml = "";
            this.fetchPostedAnswers();
        }, err => {
            console.log(err);
        });

    }

    private editAnswer() {
        this.editorInnerHtml = this.answerData[this.userAnswerIndex].description;
        this.displayEditor = true;
        this.post = this.updateAnswer.bind(this);
        this.displayEditor = true;
        this.updateComponent();
    }

    private async deleteAnswer() {
        let token = await this.context.getTokenSilently();
        let id = this.answerData[this.userAnswerIndex].id as string;
        answerService.deleteAnswer(id, token).then(() => {
            this.displayEditor = true;
            this.fetchPostedAnswers();
        }, err => {
            console.error(err);
        });
    }


    private editQuestion() {
        this.editorInnerHtml = this.props.questionData.description;
        this.displayEditor = true;
        this.post = this.updateQuestion.bind(this);
        this.displayEditor = true;
        this.updateComponent();
    }

    private async updateQuestion(text:string) {
        let question = this.props.questionData;
        question.description = text;
        let token = await this.context.getTokenSilently();

        answerService.updateQuestion(question, token).then(() => {
            this.editorInnerHtml = "";
            this.setDisplayEditor();
            this.fetchPostedAnswers();
        }, err => {
            console.log(err);
        });
    }

    private async deleteQuestion() {
        let token = await this.context.getTokenSilently();
        let id = this.props.questionData.id as string;
        answerService.deleteQuestion(id, token).then(() => {
            this.props.onDeleteQuestion();
        }, err => {
            console.error(err);
        });
    }

    private updateComponent() {
        this.setState(this.state);
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

    }

    private getEditor() {
        if (this.displayEditor) return this.editor();
    }

    private editor() {
        let props: editorProps;

        props = {
            innterHtml: this.editorInnerHtml,
            onPost: this.post
        }

        return <InputEditor {...props} />;
    }

    public render() {
        if (this.state.isLoading) return <Loader />;
        return (
            <div id="discussion_flow">
                <Post data={this.props.questionData} onEdit={this.editQuestion.bind(this)} onDelete={this.deleteQuestion.bind(this)} />
                <h1 style={{ marginBottom: '2px' }}>উত্তর {utilityService.convertToBengaliText(this.answerData.length)} টি</h1>
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