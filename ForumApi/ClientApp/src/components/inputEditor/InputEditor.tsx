import React, { Component, RefObject } from "react";
import "./inputEditor.css";
import { Editor } from "../answer/editor";
import { postAnswer } from "./Service";
import { IAuth0Context } from "../../utils/Structures";
import { Auth0Context } from "../../utils/Contexts";
import { IAnswer } from "../../utils/Models";

interface state {
    input: string;
}

interface props {
    id: string;
    onPost(): void;
}
export class InputEditor extends Component<props, state, IAuth0Context>{


    private inputEditor = React.createRef<HTMLDivElement>();
    private editor?: Editor;
    static contextType = Auth0Context;

    constructor(props: props) {
        super(props);
        this.state = { input: "" };
    }

    componentDidMount() {
        this.editor = new Editor(this.inputEditor.current as HTMLDivElement);
    }

    public render() {
        return (
            <div className="Input_editor_pane" ref={this.inputEditor}>
                <div className="answer_editor">
                    <div className="answer_editor_topbar">
                        <span id="boldBtn" className="answer_editor_topbar_bold fa fa-bold boldBtn" title="bold text">
                        </span>
                        <span id="italicBtn" className="answer_editor_topbar_italic fa fa-italic"
                            title="italic text">
                        </span>
                        <span id="linkBtn" className="answer_editor_topbar_hyperlink fa fa-link" title="hyperlink">
                        </span>
                        <span id="tabBtn" className="fa fa-indent tabBtn" title="insert tab">
                        </span>
                        <span id="orderListBtn" className="fa fa-list-ol orderListBtn" title="order list">
                        </span>
                        <span id="unorderListBtn" className="fa fa-list-ul unorderListBtn" title="unorder list">
                        </span>
                        <span id="imageUpload" className="fa fa-photo imageUpload" title="upload image">
                            <input id="imageUploader" className="imageUploader" style={{ display: 'none' }} type="file" accept="image/*" />
                        </span>
                        <span id="headingBtn" className="fa fa-align-center headingBtn" title="heading text">
                        </span>
                        <span id="newLineBtn" className="fa fa-level-down newLineBtn" title="new line">
                        </span>
                    </div>
                    <textarea className="inputArea" name="" id="answer_editor" cols={30} rows={10} ></textarea>

                </div>
                <div className="outputArea" id="answer_display" >
                </div>

                <div onClick={this.post.bind(this)} id="post_question_btn">উত্তর প্রেরণ করুন</div>
            </div>

        );
    }

    private post() {

        let data: IAnswer;
        if (this.editor) {
            data = {
                questionId: this.props.id,
                description: this.editor.answerEditor.value,
                ratings: 0,
                datetime: new Date().getTime(),
                userId: this.context.user.sub
            };

            let token = this.context.getTokenSilently();
            postAnswer(data, token).then(data => {
                this.props.onPost();
            }, err => {
                console.log(err);
            });
        }

    }

}

//dangerouslySetInnerHTML={{ __html: this.state.input }}