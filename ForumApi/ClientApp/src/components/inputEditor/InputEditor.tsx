import React, { Component} from "react";
import "./inputEditor.css";
import { Editor } from "./editor";
import { editorProps } from "./Types";

interface state {
    input: string;
}

export class InputEditor extends Component<editorProps, state>{

    private inputEditor = React.createRef<HTMLDivElement>();
    private editor?: Editor;

    constructor(props: editorProps) {
        super(props);
        this.state = { input: "" };
    }

    componentDidMount() {
        let ref = this.inputEditor.current as HTMLDivElement;
        this.editor = new Editor(ref, this.props.innterHtml);
        if(this.props.innterHtml) this.editor.scrollToView();
    }

    componentDidUpdate() {
        if (this.editor) this.editor.updateEditor(this.props.innterHtml);
    }

    private post() {
        if (this.editor) {
            this.props.onPost(this.editor.getValue());
        }
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
                    <textarea className="inputArea" name="" id="answer_editor" cols={30} rows={10}></textarea>

                </div>
                <div className="outputArea" id="answer_display" >
                </div>

                <div onClick={this.post.bind(this)} id="post_question_btn">প্রেরণ করুন</div>
            </div>

        );
    }



}
